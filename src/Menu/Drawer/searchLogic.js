import { flatten } from '@tecsinapse/es-utils/core/object/index';

export function searchLogic(items, searchText, subtitle = null) {
  const found = [];
  for (const item of items) {
    if (
      item.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 &&
      subtitle
    ) {
      found.push({
        title: item.title,
        subtitle,
      });
    } else if (item.children) {
      found.push(
        searchLogic(item.children, searchText, subtitle || item.title)
      );
    }
  }
  return flatten(found);
}
