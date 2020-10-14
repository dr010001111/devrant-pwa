export function hexToRGB(hex) {

  // Convert hex to RGB first
  let r: any = 0, g: any = 0, b: any = 0;
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;

  return {
    r, g, b
  }
}

export function hexToHSL(hex) {
  const { r, g, b } = hexToRGB(hex);

  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return {
    h,
    s,
    l
  }
}

export function renderHex(hsl: { h: any, s: any, l: any }) {
  return "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)";
}

export function renderContrast(hex) {
  const { r, g, b } = hexToRGB(hex);
  var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

export function makeShades(hexBase?: string) {
  if (!hexBase) {
    return {
      base: '',
      tint: '',
      shade: '',
      contrast: '',
    }
  }

  const hex = hexBase.startsWith('#') ? hexBase : `#${hexBase}`;
  const hsl = hexToHSL(hex);

  const lightChange = 12
  const saturationChange = 6

  const hslTint = { ...hsl }
  hslTint.l += lightChange
  hslTint.s += saturationChange

  const hslShade = { ...hsl }
  hslShade.l -= lightChange
  hslShade.s += saturationChange

  return {
    base: renderHex(hsl),
    tint: renderHex(hslTint),
    shade: renderHex(hslShade),
    contrast: renderContrast(hexBase)
  }
}

export function applyShadesTo(target: HTMLElement, shades) {
  target.style.setProperty('--theme', shades.base)
  target.style.setProperty('--theme-tint', shades.tint)
  target.style.setProperty('--theme-shade', shades.shade)
  target.style.setProperty('--theme-contrast', shades.contrast)
}