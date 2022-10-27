import ColorHash from 'color-hash';

// Note: Some helpers are from https://gist.github.com/mjackson/5311256

const ranges = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hsl2rgba(rawH: number, rawS: number, rawL: number, alpha = 1): string {
  const h = rawH / 360;
  const s = rawS / 110;
  const l = rawL / 85;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1.0 / 3.0);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1.0 / 3.0);
  }

  return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
}

export function randomColor(text: string, alpha = 0.5) {
  const options = {
    hue: { min: 0, max: 360 },
    saturation: ranges(55, 90),
    lightness: ranges(40, 60)
  };

  const colorHash = new ColorHash(options);
  const [h, s, l] = colorHash.hsl(text);

  return {
    foreground: hsl2rgba(h, s, l * 0.75, 1),
    background: hsl2rgba(h, s, l * 1.1, alpha)
  };
}
