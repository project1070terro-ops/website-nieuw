const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'gpx');
fs.mkdirSync(outDir, { recursive: true });

const days = [
  { title: 'Dag 1: De start', nl: 'De start', en: 'The start', es: 'El inicio' },
  { title: 'Dag 2: Coll de Rates', nl: 'Coll de Rates', en: 'Coll de Rates', es: 'Coll de Rates' },
  { title: 'Dag 3: Guadalest', nl: 'Guadalest', en: 'Guadalest', es: 'Guadalest' },
  { title: 'Dag 4: Cumbre del Sol', nl: 'Cumbre del Sol', en: 'Cumbre del Sol', es: 'Cumbre del Sol' },
  { title: 'Dag 5: Vall de Gallinera', nl: 'Vall de Gallinera', en: 'Vall de Gallinera', es: 'Vall de Gallinera' },
  { title: 'Dag 6: Bernia — Xaló', nl: 'Bernia — Xaló', en: 'Bernia — Xaló', es: 'Bernia — Xaló' },
  { title: 'Dag 7: Sierra de Aitana', nl: 'Sierra de Aitana', en: 'Sierra de Aitana', es: 'Sierra de Aitana' },
  { title: 'Dag 8: Parcent — Tarbena', nl: 'Parcent — Tarbena', en: 'Parcent — Tarbena', es: 'Parcent — Tarbena' },
  { title: 'Dag 9: De laatste klim', nl: 'De laatste klim', en: 'The last climb', es: 'La última subida' },
  { title: 'Dag 10: De finishrit', nl: 'De finishrit', en: 'The final ride', es: 'La etapa final' },
];

const base = { lat: 38.5947, lon: -0.0464 };

function toRad(d) { return (d * Math.PI) / 180; }
function toDeg(r) { return (r * 180) / Math.PI; }
function offset(lat, lon, dx, dy) {
  const R = 6371000;
  const newLat = lat + toDeg(dy / R);
  const newLon = lon + toDeg(dx / (R * Math.cos(toRad(lat))));
  return { lat: newLat, lon: newLon };
}

days.forEach((day, i) => {
  const points = [];
  const count = 80;
  const seed = i + 1;
  for (let j = 0; j < count; j++) {
    const t = j / (count - 1);
    const angle = t * Math.PI * 2 * (1 + i * 0.15) + i;
    const radius = 5000 * t;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    const pos = offset(base.lat, base.lon, dx, dy);
    const ele = 20 + 900 * Math.sin(t * Math.PI + i * 0.4) + 150 * Math.sin(t * Math.PI * 5);
    points.push({ lat: pos.lat, lon: pos.lon, ele: Math.max(10, ele) });
  }
  const trkpts = points
    .map((p) => `      <trkpt lat="${p.lat.toFixed(6)}" lon="${p.lon.toFixed(6)}"><ele>${p.ele.toFixed(1)}</ele></trkpt>`)
    .join('\n');
  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Project 15/70" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${day.title}</name>
  </metadata>
  <trk>
    <name>${day.title}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>`;
  fs.writeFileSync(path.join(outDir, `dag-${i + 1}.gpx`), gpx, 'utf8');
});

console.log(`Generated ${days.length} GPX files in ${outDir}`);
