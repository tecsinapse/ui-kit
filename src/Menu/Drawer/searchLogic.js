import { flatten } from '@tecsinapse/es-utils/core/object/index';

export function searchLogic(items, searchText, subtitle = null) {
  const found = [];
  for (const item of items) {
    if (item.children) {
      found.push(
        searchLogic(item.children, searchText, subtitle || item.title)
      );
    } else if (
      item.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 &&
      subtitle
    ) {
      found.push({
        title: item.title,
        subtitle,
      });
    }
  }
  return flatten(found);
}
