const enc = (s: string) => s.replace(/#/g, "%23");

export function svgGradientImage(
  from: string,
  to: string,
  width = 480,
  height = 360,
): string {
  const gid = "g";
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>` +
    `<defs><linearGradient id='${gid}' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0%' stop-color='${enc(from)}' stop-opacity='0.35'/>` +
    `<stop offset='55%' stop-color='${enc(from)}' stop-opacity='0.10'/>` +
    `<stop offset='100%' stop-color='${enc(to)}' stop-opacity='0.04'/>` +
    `</linearGradient></defs>` +
    `<rect width='${width}' height='${height}' fill='url(%23${gid})'/>` +
    `<circle cx='${Math.round(width * 0.82)}' cy='${Math.round(height * 0.18)}' r='${Math.round(width * 0.28)}' fill='${enc(to)}' opacity='0.10'/>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}
