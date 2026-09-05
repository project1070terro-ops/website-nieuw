import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Chart } from 'chart.js/auto';
import type { Plugin } from 'chart.js';
import GpxParser from 'gpxparser';
import { Download } from 'lucide-react';
import type { Language } from '../types';

interface RouteDay {
  day: number;
  gpx: string;
  images: string[];
  title: string;
  text: string;
}

interface GpxPoint {
  lat: number;
  lon: number;
  ele: number;
}

interface GpxParserPoint {
  lat: number;
  lon: number;
  ele: number | null;
}

declare module 'gpxparser' {
  export default class GpxParser {
    parse(source: string): void;
    tracks: Array<{ points: GpxParserPoint[] }>;
  }
}

const verticalLinePlugin: Plugin = {
  id: 'verticalLine',
  afterDraw: (chart) => {
    const active = chart.getActiveElements();
    if (!active.length) return;
    const { ctx, chartArea } = chart;
    const x = active[0].element.x;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.restore();
  },
};
Chart.register(verticalLinePlugin);

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

function haversine(p1: GpxPoint, p2: GpxPoint) {
  const R = 6371000;
  const dLat = toRad(p2.lat - p1.lat);
  const dLon = toRad(p2.lon - p1.lon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function computeDistances(points: GpxPoint[]) {
  const distances: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    distances.push(distances[i - 1] + haversine(points[i - 1], points[i]));
  }
  return distances;
}

function gradientAt(index: number, points: GpxPoint[], distances: number[]) {
  if (points.length < 2) return 0;
  let prev = index - 1;
  let next = index + 1;
  if (prev < 0) prev = 0;
  if (next >= points.length) next = points.length - 1;
  const d = distances[next] - distances[prev];
  if (d === 0) return 0;
  return ((points[next].ele - points[prev].ele) / d) * 100;
}

function totalElevationGain(points: GpxPoint[]) {
  let gain = 0;
  for (let i = 1; i < points.length; i++) {
    const diff = points[i].ele - points[i - 1].ele;
    if (diff > 0) gain += diff;
  }
  return gain;
}

export function RouteViewer({ language }: { language: Language }) {
  const [days, setDays] = useState<RouteDay[] | null>(null);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState<GpxPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    fetch('/route-days.json')
      .then((res) => res.json())
      .then((data: Record<Language, RouteDay[]>) => {
        setDays(data[language]);
      })
      .catch((err) => {
        console.error('Failed to load route days:', err);
        setDays([]);
      });
  }, [language]);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      mapRef.current?.invalidateSize();
    });
    const initId = window.setTimeout(() => {
      if (!mapContainerRef.current || mapRef.current) return;
      mapRef.current = L.map(mapContainerRef.current).setView([38.5947, -0.0464], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
      polylineRef.current = L.polyline([], { color: '#2ecc71', weight: 4, lineJoin: 'round' }).addTo(mapRef.current);
      markerRef.current = L.circleMarker([0, 0], {
        radius: 7,
        color: '#2ecc71',
        fillColor: '#ffffff',
        fillOpacity: 1,
        weight: 3,
      }).addTo(mapRef.current);
      markerRef.current.setStyle({ opacity: 0, fillOpacity: 0 });
      observer.observe(mapContainerRef.current);
      window.setTimeout(() => mapRef.current?.invalidateSize(), 200);
    }, 150);
    return () => {
      window.clearTimeout(initId);
      observer.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!days) return;
    const day = days[selected];
    setPoints([]);
    setLoading(true);
    fetch(day.gpx)
      .then((res) => res.text())
      .then((xml) => {
        const parser = new GpxParser();
        parser.parse(xml);
        const track = parser.tracks?.[0];
        if (track && track.points) {
          const pts: GpxPoint[] = track.points.map((p) => ({
            lat: p.lat,
            lon: p.lon,
            ele: p.ele ?? 0,
          }));
          setPoints(pts);
        } else {
          setPoints([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load GPX:', err);
        setPoints([]);
      })
      .finally(() => setLoading(false));
  }, [days, selected]);

  useEffect(() => {
    if (!points.length || !polylineRef.current || !mapRef.current) return;
    const latLngs: [number, number][] = points.map((p) => [p.lat, p.lon]);
    polylineRef.current.setLatLngs(latLngs);
    mapRef.current.invalidateSize();
    mapRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [50, 180], maxZoom: 14 });
  }, [points]);

  useEffect(() => {
    if (!markerRef.current) return;
    if (hoverIndex !== null && points[hoverIndex]) {
      markerRef.current.setLatLng([points[hoverIndex].lat, points[hoverIndex].lon]);
      markerRef.current.setStyle({ opacity: 1, fillOpacity: 1 });
    } else {
      markerRef.current.setStyle({ opacity: 0, fillOpacity: 0 });
    }
  }, [hoverIndex, points]);

  const distances = computeDistances(points);
  const totalDistance = points.length ? distances[distances.length - 1] / 1000 : 0;
  const totalGain = points.length ? totalElevationGain(points) : 0;

  useEffect(() => {
    if (!canvasRef.current || !points.length) {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      return;
    }
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const labels = distances.map((d) => d.toFixed(0));
    const data = points.map((p) => p.ele);
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.15)',
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 0,
            tension: 0.35,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        resizeDelay: 0,
        interaction: { mode: 'index', intersect: false },
        hover: { mode: 'index', intersect: false },
        elements: { point: { radius: 0, hoverRadius: 0, hitRadius: 28 }, line: { tension: 0.35 } },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
          verticalLine: true,
        },
        scales: {
          x: {
            display: true,
            grid: { display: false, drawBorder: false },
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            title: { display: true, text: 'Afstand (km)', color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
          },
          y: {
            display: true,
            grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            title: { display: true, text: 'Hoogte (m)', color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
          },
        },
        onHover: (_event, elements) => {
          const idx = elements.length ? elements[0].index : null;
          setHoverIndex((prev) => (idx === prev ? prev : idx));
        },
      },
    });
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [points, distances]);

  if (!days) return <p className="route-loading">Route data laden...</p>;
  if (days.length === 0) return <p className="route-loading">Geen routedata gevonden.</p>;

  const day = days[selected];

  return (
    <section className="route-viewer">
      <div className="route-tabs" role="tablist" aria-label="Dagen">
        {days.map((d, i) => (
          <button
            key={d.day}
            role="tab"
            aria-selected={i === selected}
            className={`route-tab ${i === selected ? 'active' : ''}`}
            onClick={() => setSelected(i)}
          >
            Dag {d.day}
          </button>
        ))}
      </div>

      <div className="route-map-wrap">
        <div className="route-map" ref={mapContainerRef} />

        <aside className="route-sidebar">
          <h2 className="route-sidebar-title">{day.title}</h2>
          <a className="route-download-btn" href={day.gpx} download={`dag-${day.day}.gpx`}>
            <Download size={18} /> Download GPX
          </a>
          <div className="route-sidebar-stats">
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">Totale afstand</span>
              <span className="route-sidebar-stat-value">{totalDistance.toFixed(1)} km</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">Hoogtemeters</span>
              <span className="route-sidebar-stat-value">{Math.round(totalGain)} m</span>
            </div>
          </div>
        </aside>

        <div className="route-chart-panel">
          <div className="route-chart-info">
            {hoverIndex !== null && points[hoverIndex] ? (
              <>
                <span>Afstand: <strong>{(distances[hoverIndex] / 1000).toFixed(1)} km</strong></span>
                <span>Hoogte: <strong>{Math.round(points[hoverIndex].ele)} m</strong></span>
                <span>Stijging: <strong>{gradientAt(hoverIndex, points, distances).toFixed(1)}%</strong></span>
              </>
            ) : (
              <span className="route-chart-hint">Beweeg over de grafiek voor live hoogte-informatie</span>
            )}
          </div>
          <div className="route-chart-canvas-wrap">
            {loading ? (
              <p className="route-chart-placeholder">GPX-profiel laden...</p>
            ) : points.length === 0 ? (
              <p className="route-chart-placeholder">Geen GPX-data gevonden.</p>
            ) : (
              <canvas ref={canvasRef} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
