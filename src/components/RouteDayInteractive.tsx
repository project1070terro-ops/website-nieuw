import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Chart } from 'chart.js/auto';
import type { Plugin, TooltipItem } from 'chart.js';
import { Download } from 'lucide-react';
import type { RouteDay } from './RouteViewer';
import type { TranslationContent } from '../types';

type RouteLabels = TranslationContent['routeViewer'];

interface GpxPoint {
  lat: number;
  lon: number;
  ele: number;
}

const GRADIENT_BANDS = [
  { max: 2, color: '#2ecc71', label: '< 2%' },
  { max: 5, color: '#f1c40f', label: '2 – 5%' },
  { max: 8, color: '#e67e22', label: '5 – 8%' },
  { max: Infinity, color: '#e74c3c', label: '> 8%' },
];

// Vaste waarde — pas deze later gerust aan
const AVG_SPEED_KMH = 16.5;

function colorForGradient(gradient: number) {
  const abs = Math.abs(gradient);
  return GRADIENT_BANDS.find((b) => abs < b.max)!.color;
}

function colorForGradientAlpha(gradient: number, alpha: number) {
  const abs = Math.abs(gradient);
  const hex = GRADIENT_BANDS.find((b) => abs < b.max)!.color;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatDuration(hours: number, hourAbbr: string) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}${hourAbbr} ${m}m`;
}

const verticalLineInteractive: Plugin = {
  id: 'verticalLineInteractive',
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
Chart.register(verticalLineInteractive);

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

// Smoothed gradient per point: looks ~30 m back and ~30 m ahead
function computeGradients(points: GpxPoint[], distances: number[]) {
  const gradients = new Array<number>(points.length).fill(0);
  const WINDOW = 30;
  for (let i = 0; i < points.length; i++) {
    let a = i;
    let b = i;
    while (a > 0 && distances[i] - distances[a - 1] < WINDOW) a--;
    while (b < points.length - 1 && distances[b + 1] - distances[i] < WINDOW) b++;
    const d = distances[b] - distances[a];
    gradients[i] = d > 0 ? ((points[b].ele - points[a].ele) / d) * 100 : 0;
  }
  return gradients;
}

export function RouteDayInteractive({ day, r }: { day: RouteDay; r: RouteLabels }) {
  const [points, setPoints] = useState<GpxPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const markerRef = useRef<L.CircleMarker | null>(null);
  const startRef = useRef<L.CircleMarker | null>(null);
  const endRef = useRef<L.CircleMarker | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // Map aanmaken (eenmalig)
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || mapRef.current) return;
    try {
      mapRef.current = L.map(container).setView([38.5947, -0.0464], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
      routeLayerRef.current = L.layerGroup().addTo(mapRef.current);
      markerRef.current = L.circleMarker([0, 0], {
        radius: 7,
        color: '#ffffff',
        fillColor: '#3b82f6',
        fillOpacity: 1,
        weight: 3,
      }).addTo(mapRef.current);
      markerRef.current.setStyle({ opacity: 0, fillOpacity: 0 });
      startRef.current = L.circleMarker([0, 0], {
        radius: 6,
        color: '#ffffff',
        fillColor: '#2ecc71',
        fillOpacity: 1,
        weight: 2,
      }).addTo(mapRef.current);
      endRef.current = L.circleMarker([0, 0], {
        radius: 6,
        color: '#ffffff',
        fillColor: '#e74c3c',
        fillOpacity: 1,
        weight: 2,
      }).addTo(mapRef.current);
      window.setTimeout(() => mapRef.current?.invalidateSize(), 200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Map could not be loaded');
    }
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // GPX laden en parsen met DOMParser
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        let xml = '';
        for (const url of [`/gpx/dag${day.day}.gpx`, day.gpx]) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              xml = await res.text();
              break;
            }
          } catch {
            // volgende URL proberen
          }
        }
        if (!xml) throw new Error('GPX not found');
        const doc = new DOMParser().parseFromString(xml, 'application/xml');
        let els = Array.from(doc.getElementsByTagName('trkpt'));
        if (!els.length) els = Array.from(doc.getElementsByTagName('rtept'));
        const pts: GpxPoint[] = els
          .map((el) => ({
            lat: parseFloat(el.getAttribute('lat') || ''),
            lon: parseFloat(el.getAttribute('lon') || ''),
            ele: parseFloat(el.getElementsByTagName('ele')[0]?.textContent || '0'),
          }))
          .filter((p) => isFinite(p.lat) && isFinite(p.lon) && isFinite(p.ele));
        if (!cancelled) setPoints(pts);
      } catch (err) {
        if (!cancelled) {
          setPoints([]);
          setError(err instanceof Error ? err.message : 'GPX could not be loaded');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [day]);

  const distances = useMemo(() => computeDistances(points), [points]);
  const gradients = useMemo(() => computeGradients(points, distances), [points, distances]);

  const stats = useMemo(() => {
    if (!points.length) return null;
    let gain = 0;
    let loss = 0;
    let minEle = points[0].ele;
    let maxEle = points[0].ele;
    for (let i = 0; i < points.length; i++) {
      if (i > 0) {
        const diff = points[i].ele - points[i - 1].ele;
        if (diff > 0) gain += diff;
        else loss -= diff;
      }
      if (points[i].ele < minEle) minEle = points[i].ele;
      if (points[i].ele > maxEle) maxEle = points[i].ele;
    }
    const distance = distances[distances.length - 1] / 1000;
    return {
      distance,
      gain,
      loss,
      maxGrade: Math.max(...gradients),
      minEle,
      maxEle,
      avgSpeed: AVG_SPEED_KMH,
      estTime: formatDuration(distance / AVG_SPEED_KMH, r.hourAbbr),
    };
  }, [points, distances, gradients, r]);

  // Route op de kaart tekenen, segment per segment gekleurd op helling
  useEffect(() => {
    if (!routeLayerRef.current || !mapRef.current) return;
    routeLayerRef.current.clearLayers();
    if (!points.length) return;
    for (let i = 1; i < points.length; i++) {
      L.polyline(
        [
          [points[i - 1].lat, points[i - 1].lon],
          [points[i].lat, points[i].lon],
        ],
        { color: colorForGradient(gradients[i]), weight: 5, lineJoin: 'round' }
      ).addTo(routeLayerRef.current);
    }
    startRef.current?.setLatLng([points[0].lat, points[0].lon]);
    endRef.current?.setLatLng([points[points.length - 1].lat, points[points.length - 1].lon]);
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon] as [number, number]));
    mapRef.current.invalidateSize();
    if (window.innerWidth < 640) {
      mapRef.current.fitBounds(bounds, { padding: [24, 24] });
    } else {
      mapRef.current.fitBounds(bounds, { paddingTopLeft: [300, 60], paddingBottomRight: [40, 230] });
    }
  }, [points, gradients]);

  // Blauwe marker synchroniseren met hover op het profiel
  useEffect(() => {
    if (!markerRef.current) return;
    if (hoverIndex !== null && points[hoverIndex]) {
      markerRef.current.setLatLng([points[hoverIndex].lat, points[hoverIndex].lon]);
      markerRef.current.setStyle({ opacity: 1, fillOpacity: 1 });
    } else {
      markerRef.current.setStyle({ opacity: 0, fillOpacity: 0 });
    }
  }, [hoverIndex, points]);

  // Hoogteprofiel (Chart.js)
  useEffect(() => {
    if (!canvasRef.current || !points.length) {
      chartRef.current?.destroy();
      chartRef.current = null;
      return;
    }
    // X-as: indices waar een veelvoud van 10 km bereikt wordt
    const tickIndices = new Set<number>();
    let nextMark = 0;
    distances.forEach((d, i) => {
      if (d / 1000 >= nextMark) {
        tickIndices.add(i);
        nextMark += 10;
      }
    });
    const minEle = Math.min(...points.map((p) => p.ele));
    const maxEle = Math.max(...points.map((p) => p.ele));

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: distances.map((d) => (d / 1000).toFixed(1)),
        datasets: [
          {
            data: points.map((p) => p.ele),
            segment: {
              borderColor: (ctx) => colorForGradient(gradients[ctx.p0DataIndex] ?? 0),
              backgroundColor: (ctx) => colorForGradientAlpha(gradients[ctx.p0DataIndex] ?? 0, 0.3),
            },
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
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
          verticalLineInteractive: true,
          tooltip: {
            enabled: window.innerWidth > 1024,
            displayColors: false,
            position: 'nearest',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            titleColor: '#1a1a1a',
            bodyColor: '#333333',
            borderColor: 'rgba(0, 0, 0, 0.12)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 8,
            caretSize: 5,
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11 },
            callbacks: {
              title: (items: TooltipItem<'line'>[]) =>
                items.length ? `📍 ${r.distance}: ${(distances[items[0].dataIndex] / 1000).toFixed(1)} km` : '',
              label: (item: TooltipItem<'line'>) => {
                const lines = [
                  `🏔️ ${r.elevation}: ${Math.round(item.parsed.y as number)} m`,
                  `📈 ${r.gradient}: ${gradients[item.dataIndex].toFixed(1)}%`,
                ];
                if (window.innerWidth >= 640) {
                  lines.push(
                    `🏷️ ${r.location}: km ${(distances[item.dataIndex] / 1000).toFixed(1)}`,
                    `🛣️ ${r.wayType}: ${r.wayTypeValue}`,
                    `🛤️ ${r.surface}: ${r.surfaceValue}`
                  );
                }
                return lines;
              },
            },
          },
        } as any,
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: {
              color: 'rgba(255,255,255,0.5)',
              font: { size: 10 },
              maxRotation: 0,
              autoSkip: false,
              callback: (_value, index) => {
                if (!tickIndices.has(index)) return '';
                return `${Math.round(distances[index] / 1000)}`;
              },
            },
            title: { display: true, text: r.axisDistance, color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
          },
          y: {
            display: true,
            min: Math.min(0, Math.floor(minEle / 50) * 50),
            max: Math.ceil(maxEle / 50) * 50,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 } },
            title: { display: true, text: r.axisElevation, color: 'rgba(255,255,255,0.4)', font: { size: 10 } },
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
  }, [points, distances, gradients, r]);

  return (
    <div className="route-map-wrap">
      {error && <p className="route-map-error">{error}</p>}
      <div className="route-map" ref={mapContainerRef} />

      <aside className="route-sidebar">
        <h2 className="route-sidebar-title">{day.title}</h2>
        <a className="route-download-btn" href={day.gpx} download={`dag-${day.day}.gpx`}>
          <Download size={18} /> {r.downloadGpx}
        </a>
        <div className="route-legend">
          {GRADIENT_BANDS.map((b) => (
            <span key={b.label} className="route-legend-item">
              <span className="route-legend-swatch" style={{ background: b.color }} />
              {b.label}
            </span>
          ))}
        </div>
        {stats && (
          <div className="route-stats-grid">
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.distance}</span>
              <span className="route-sidebar-stat-value">{stats.distance.toFixed(1)} km</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.elevationGain}</span>
              <span className="route-sidebar-stat-value">+{Math.round(stats.gain)} m</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.elevationLoss}</span>
              <span className="route-sidebar-stat-value">-{Math.round(stats.loss)} m</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.maxGradient}</span>
              <span className="route-sidebar-stat-value">{stats.maxGrade.toFixed(1)}%</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.lowestPoint}</span>
              <span className="route-sidebar-stat-value">{Math.round(stats.minEle)} m</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.highestPoint}</span>
              <span className="route-sidebar-stat-value">{Math.round(stats.maxEle)} m</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.avgSpeed}</span>
              <span className="route-sidebar-stat-value">{stats.avgSpeed.toFixed(1)} km/h</span>
            </div>
            <div className="route-sidebar-stat">
              <span className="route-sidebar-stat-label">{r.estTime}</span>
              <span className="route-sidebar-stat-value">{stats.estTime}</span>
            </div>
          </div>
        )}
      </aside>

      <div className="route-chart-panel route-chart-panel-tall">
        {stats && (
          <div className="route-chart-stats">
            <div className="route-chart-stat">
              <span className="route-chart-stat-value">
                {stats.distance.toFixed(1)}
                <small>km</small>
              </span>
              <span className="route-chart-stat-label">{r.distance}</span>
            </div>
            <div className="route-chart-stat">
              <span className="route-chart-stat-value">{stats.estTime}</span>
              <span className="route-chart-stat-label">{r.estTime}</span>
            </div>
            <div className="route-chart-stat">
              <span className="route-chart-stat-value">
                {Math.round(stats.gain)}
                <small>m</small>
              </span>
              <span className="route-chart-stat-label">{r.ascent}</span>
            </div>
            <div className="route-chart-stat">
              <span className="route-chart-stat-value">
                {Math.round(stats.loss)}
                <small>m</small>
              </span>
              <span className="route-chart-stat-label">{r.descent}</span>
            </div>
            <div className="route-chart-stat">
              <span className="route-badge">
                {stats.gain / stats.distance > 20
                  ? r.hard
                  : stats.gain / stats.distance > 10
                    ? r.moderate
                    : r.easy}
              </span>
              <span className="route-chart-stat-label">{r.difficulty}</span>
            </div>
            <div className="route-chart-stat">
              <span className="route-chart-stat-value">
                {r.avgLabel} {stats.avgSpeed.toFixed(1)}
                <small>km/h</small>
              </span>
              <span className="route-chart-stat-label">{r.speed}</span>
            </div>
          </div>
        )}
        <div className="route-hover-info">
          {hoverIndex !== null && points[hoverIndex] ? (
            <>
              <span>
                📍 <strong>{(distances[hoverIndex] / 1000).toFixed(1)} km</strong>
              </span>
              <span>
                🏔️ <strong>{Math.round(points[hoverIndex].ele)} m</strong>
              </span>
              <span>
                📈 <strong>{gradients[hoverIndex].toFixed(1)}%</strong>
              </span>
              <span>
                🛣️ <strong>{r.wayTypeValue}</strong>
              </span>
              <span>
                🛤️ <strong>{r.surfaceValue}</strong>
              </span>
            </>
          ) : (
            <span className="route-chart-hint">{r.hoverHint}</span>
          )}
        </div>
        <div className="route-chart-canvas-wrap">
          {loading ? (
            <p className="route-chart-placeholder">{r.loadingGpx}</p>
          ) : points.length === 0 ? (
            <p className="route-chart-placeholder">{r.noGpx}</p>
          ) : (
            <canvas ref={canvasRef} />
          )}
        </div>
      </div>
    </div>
  );
}
