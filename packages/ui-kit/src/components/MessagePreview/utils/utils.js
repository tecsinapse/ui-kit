export const IMAGE = ['MEDIA_IMAGE', 'IMAGE'];

export const VIDEO = ['MEDIA_VIDEO', 'VIDEO'];

export const DOCUMENT = ['MEDIA_DOCUMENT', 'DOCUMENT'];

export const isMedia = header =>
  DOCUMENT.concat(VIDEO).concat(IMAGE).includes(header);

export const lineBreak = str => {
  if (!str) {
    return str;
  }
  const br = /\n/g;

  return str.replace(br, `<br />`);
};

export const monospace = str => {
  const rgx = /```([_~*0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-[\] \s]+)```/g;

  return str.replace(rgx, (match, value) =>
    typeof value != 'undefined' ? `<code>${value}</code>` : match
  );
};

export const italic = str => {
  const rgx = /_([~*`0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-[\] \s]+)_/g;

  return str.replace(rgx, (match, value) =>
    typeof value != 'undefined' ? `<i>${value}</i>` : match
  );
};

export const strikethrough = str => {
  const rgx = /~([_*`0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-[\] \s]+)~/g;

  return str.replace(rgx, (match, value) =>
    typeof value != 'undefined' ? `<s>${value}</s>` : match
  );
};

export const bold = str => {
  const rgx = /\*([_~`0-9A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ^{}()!@#$%&=/+<>"'?;:,.\-[\] \s]+)\*/g;

  return str.replace(rgx, (match, value) =>
    typeof value != 'undefined' ? `<strong>${value}</strong>` : match
  );
};

export const normalizeInHtml = str => {
  if (!str) {
    return str;
  }

  return bold(strikethrough(italic(monospace(str))));
};
