export function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');

  context.font = font;
  const metrics = context.measureText(text);

  return metrics.width;
}

export function getLabelSliced(label) {
  const maxLengthOption = 20;

  return label.length > maxLengthOption
    ? `${label.slice(0, maxLengthOption)}...`
    : label;
}

export function calculateValuesSizes(values) {
  const map = {};

  for (const value of values) {
    const { label: optionValue } = value;
    const label = getLabelSliced(optionValue);
    const textWidth = getTextWidth(label, '0.8125rem Roboto');

    map[optionValue] = textWidth + 24 + 24;
  }

  return map;
}
