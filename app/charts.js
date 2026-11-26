// NusaStat charts: hand-drawn SVG bar and line charts, no libraries.
// Every chart is built from the data arrays in data.js and labels its axes.

function svgOpen(width, height, label) {
  return (
    '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' +
    label + '">'
  );
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const size = nice * mag;
  const ticks = [];
  let t = Math.ceil(min / size) * size;
  while (t <= max + 1e-9) {
    ticks.push(Math.round(t * 100) / 100);
    t += size;
  }
  return ticks;
}

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Vertical bar chart. points: [{label, value}], valueLabel formats a value.
export function barChart(points, options) {
  const width = 640;
  const height = 300;
  const padL = 56;
  const padR = 12;
  const padT = 18;
  const padB = 38;
  const values = points.map((p) => p.value);
  const min = Math.min(0, Math.min.apply(null, values));
  const max = Math.max.apply(null, values);
  const ticks = niceTicks(min, max, 4);
  // The axis must cover every data point, then leave headroom for labels.
  let top = Math.max(ticks.length ? ticks[ticks.length - 1] : max, max);
  const bottom = Math.min(ticks.length ? ticks[0] : min, min);
  top = top + (top - bottom || 1) * 0.14;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const y = (v) => padT + ((top - v) / (top - bottom || 1)) * plotH;
  const slot = plotW / points.length;
  const barW = Math.min(52, slot * 0.62);
  let out = svgOpen(width, height, options.title || "Bar chart");
  out += '<rect x="0" y="0" width="' + width + '" height="' + height + '" fill="none"/>';
  ticks.forEach((t) => {
    const yy = y(t);
    out +=
      '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (width - padR) +
      '" y2="' + yy.toFixed(1) + '" stroke="#d8ddd8" stroke-width="1"/>';
    out +=
      '<text x="' + (padL - 8) + '" y="' + (yy + 4).toFixed(1) +
      '" text-anchor="end" font-size="11" fill="#5a6b63">' +
      esc(options.tickFormat ? options.tickFormat(t) : String(t)) + "</text>";
  });
  points.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const yTop = y(Math.max(p.value, 0));
    const yBot = y(Math.min(p.value, 0));
    const fill = p.value < 0 ? "#b3402e" : options.color || "#0e6b5c";
    out +=
      '<rect x="' + (cx - barW / 2).toFixed(1) + '" y="' + yTop.toFixed(1) +
      '" width="' + barW.toFixed(1) + '" height="' + Math.max(1, yBot - yTop).toFixed(1) +
      '" rx="3" fill="' + fill + '"><title>' + esc(p.label) + ": " +
      esc(options.valueLabel ? options.valueLabel(p.value) : String(p.value)) +
      "</title></rect>";
    out +=
      '<text x="' + cx.toFixed(1) + '" y="' + (yTop - 6).toFixed(1) +
      '" text-anchor="middle" font-size="11" font-weight="600" fill="#14201e">' +
      esc(options.valueLabel ? options.valueLabel(p.value) : String(p.value)) + "</text>";
    out +=
      '<text x="' + cx.toFixed(1) + '" y="' + (height - 14) +
      '" text-anchor="middle" font-size="11" fill="#5a6b63">' + esc(p.label) + "</text>";
  });
  out +=
    '<line x1="' + padL + '" y1="' + y(0).toFixed(1) + '" x2="' + (width - padR) +
    '" y2="' + y(0).toFixed(1) + '" stroke="#14201e" stroke-width="1.2"/>';
  out += "</svg>";
  return out;
}

// Line chart with dots and value labels. points: [{label, value}].
export function lineChart(points, options) {
  const width = 640;
  const height = 300;
  const padL = 56;
  const padR = 20;
  const padT = 24;
  const padB = 38;
  const values = points.map((p) => p.value);
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const pad = (max - min || 1) * 0.18;
  const top = max + pad;
  const bottom = min - pad;
  const ticks = niceTicks(bottom, top, 4);
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const x = (i) => padL + (i / (points.length - 1)) * plotW;
  const y = (v) => padT + ((top - v) / (top - bottom)) * plotH;
  let out = svgOpen(width, height, options.title || "Line chart");
  ticks.forEach((t) => {
    const yy = y(t);
    out +=
      '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (width - padR) +
      '" y2="' + yy.toFixed(1) + '" stroke="#d8ddd8" stroke-width="1"/>';
    out +=
      '<text x="' + (padL - 8) + '" y="' + (yy + 4).toFixed(1) +
      '" text-anchor="end" font-size="11" fill="#5a6b63">' +
      esc(options.tickFormat ? options.tickFormat(t) : String(t)) + "</text>";
  });
  const path = points
    .map((p, i) => (i === 0 ? "M" : "L") + x(i).toFixed(1) + " " + y(p.value).toFixed(1))
    .join(" ");
  out += '<path d="' + path + '" fill="none" stroke="' + (options.color || "#0e6b5c") +
    '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
  points.forEach((p, i) => {
    out +=
      '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(p.value).toFixed(1) +
      '" r="4.5" fill="#ffffff" stroke="' + (options.color || "#0e6b5c") +
      '" stroke-width="2.5"><title>' + esc(p.label) + ": " +
      esc(options.valueLabel ? options.valueLabel(p.value) : String(p.value)) +
      "</title></circle>";
    out +=
      '<text x="' + x(i).toFixed(1) + '" y="' + (y(p.value) - 11).toFixed(1) +
      '" text-anchor="middle" font-size="11" font-weight="600" fill="#14201e">' +
      esc(options.valueLabel ? options.valueLabel(p.value) : String(p.value)) + "</text>";
    out +=
      '<text x="' + x(i).toFixed(1) + '" y="' + (height - 14) +
      '" text-anchor="middle" font-size="11" fill="#5a6b63">' + esc(p.label) + "</text>";
  });
  out += "</svg>";
  return out;
}

// Horizontal bar chart, used for provinces and age groups.
export function hbarChart(rows, options) {
  const rowH = 34;
  const width = 640;
  const height = rowH * rows.length + 46;
  const padL = 150;
  const padR = 70;
  const padT = 10;
  const max = Math.max.apply(null, rows.map((r) => r.value));
  let out = svgOpen(width, height, options.title || "Horizontal bar chart");
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const w = ((width - padL - padR) * r.value) / (max || 1);
    out +=
      '<text x="' + (padL - 10) + '" y="' + (y + 19) +
      '" text-anchor="end" font-size="12" fill="#14201e">' + esc(r.label) + "</text>";
    out +=
      '<rect x="' + padL + '" y="' + (y + 6) + '" width="' + w.toFixed(1) +
      '" height="18" rx="3" fill="' + (r.color || options.color || "#0e6b5c") +
      '"><title>' + esc(r.label) + ": " +
      esc(options.valueLabel ? options.valueLabel(r.value) : String(r.value)) +
      "</title></rect>";
    out +=
      '<text x="' + (padL + w + 8).toFixed(1) + '" y="' + (y + 19) +
      '" font-size="12" font-weight="600" fill="#14201e">' +
      esc(options.valueLabel ? options.valueLabel(r.value) : String(r.value)) + "</text>";
  });
  out +=
    '<text x="' + padL + '" y="' + (height - 10) +
    '" font-size="11" fill="#5a6b63">' + esc(options.note || "") + "</text>";
  out += "</svg>";
  return out;
}
