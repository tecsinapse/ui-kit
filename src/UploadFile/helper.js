export function isImage(fileName) {
  const suffix = fileName.substr(fileName.indexOf('.') + 1).toLowerCase();
  if (
    suffix === 'jpg' ||
    suffix === 'jpeg' ||
    suffix === 'bmp' ||
    suffix === 'png'
  ) {
    return true;
  }
  return false;
}
export function convertBytes(filesize) {
  let size = '';
  if (filesize >= 1000000) {
    size = `${Math.round(filesize / 1000000)}Mb`;
  } else if (filesize >= 1000) {
    size = `${Math.round(filesize / 1000)}Kb`;
  } else {
    size = `${Math.round(filesize)}bytes`;
  }
  return size;
}
