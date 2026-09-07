interface GpxExportPoint {
  lat: number;
  lon: number;
  ele: number;
}

const GPX_HEADER = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Project 15/70" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">`;

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildGpxTrack(points: GpxExportPoint[], name: string) {
  const trkpts = points
    .map(
      (p) =>
        `      <trkpt lat="${p.lat.toFixed(7)}" lon="${p.lon.toFixed(7)}"><ele>${p.ele.toFixed(1)}</ele></trkpt>`
    )
    .join('\n');

  return `${GPX_HEADER}
  <metadata>
    <name>${escapeXml(name)}</name>
    <time>${new Date().toISOString()}</time>
  </metadata>
  <trk>
    <name>${escapeXml(name)}</name>
    <extensions>
      <gpxx:TrackExtension>
        <gpxx:DisplayColor>DarkGreen</gpxx:DisplayColor>
      </gpxx:TrackExtension>
    </extensions>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>
`;
}

export function downloadGpxTrack(points: GpxExportPoint[], name: string, filename: string) {
  const gpx = buildGpxTrack(points, name);
  const blob = new Blob([gpx], { type: 'application/gpx+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
