export const lineBreak = str => {
  if (!str) {
    return;
  }
  const br = /\n/g;

  return str.replace(br, `<br />`);
};

export const monospace = str => {
  const code = /```([_~*0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-\[\] \s]+)```/g;

  return str.replace(code, (match, value) =>
    typeof value != 'undefined' ? `<code>${value}</code>` : match
  );
};

export const italic = str => {
  const italic = /_([~*`0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-\[\] \s]+)_/g;

  return str.replace(italic, (match, value) =>
    typeof value != 'undefined' ? `<i>${value}</i>` : match
  );
};

export const strikethrough = str => {
  const strike = /~([_*`0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-\[\] \s]+)~/g;

  return str.replace(strike, (match, value) =>
    typeof value != 'undefined' ? `<s>${value}</s>` : match
  );
};

export const bold = str => {
  const bold = /\*([_~`0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-\[\] \s]+)\*/g;

  return str.replace(bold, (match, value) =>
    typeof value != 'undefined' ? `<strong>${value}</strong>` : match
  );
};

export const normalizeInHtml = str => {
  if (!str) {
    return;
  }

  return bold(strikethrough(italic(monospace(str))));
};
