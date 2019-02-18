import { flatten } from '@tecsinapse/es-utils/core/object/index';

export function selectedTitlesTree(items) {
  if (!items) {
    return false;
  }
  const titles = [];
  for (const item of items) {
    if (item.selected) {
      titles.push(typeof item.title === 'function' ? item.title() : item.title);
    } else if (item.children) {
      const childFound = selectedTitlesTree(item.children);
      if (childFound.length > 0) {
        titles.push(childFound);
        titles.push(
          typeof item.title === 'function' ? item.title() : item.title
        );
      }
    }
  }
  return flatten(titles);
}

export function searchLogic(items, searchText, subtitle = '') {
  const found = [];
  for (const item of items) {
    if (item.children) {
      found.push(
        searchLogic(
          item.children,
          searchText,
          `${subtitle ? `${subtitle} > ` : ''}${
            typeof item.title === 'function' ? item.title() : item.title
          }`
        )
      );
    } else if (
      (typeof item.title === 'function' ? item.title() : item.title)
        .toLowerCase()
        .indexOf(searchText.toLowerCase()) >= 0 &&
      subtitle
    ) {
      found.push({
        title: typeof item.title === 'function' ? item.title() : item.title,
        component: item.component,
        componentProps: item.componentProps,
        subtitle,
      });
    }
  }
  return flatten(found);
}
