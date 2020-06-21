import { flatten } from '@tecsinapse/es-utils/build';
import { accentFold } from './StringUtils';

export function selectedTitlesTree(items) {
  if (!items) {
    return false;
  }
  const titles = [];

  for (const item of items) {
    if (item.selected) {
      titles.push(item.title);
    } else if (item.children) {
      const childFound = selectedTitlesTree(item.children);

      if (childFound.length > 0) {
        titles.push(childFound);
        titles.push(item.title);
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
          `${subtitle ? `${subtitle} > ` : ''}${item.title}`
        )
      );
    } else if (
      accentFold(item.title.toLowerCase()).indexOf(
        accentFold(searchText.toLowerCase())
      ) >= 0 &&
      subtitle
    ) {
      found.push({
        title: item.title,
        component: item.component,
        componentProps: item.componentProps,
        subtitle,
      });
    }
  }

  return flatten(found);
}

export function normalizeFunctionItems(oldItems) {
  if (!oldItems) {
    return null;
  }
  const items = [];

  for (const oldItem of oldItems) {
    const item = {
      ...oldItem,
      title:
        typeof oldItem.title === 'function' ? oldItem.title() : oldItem.title,
    };

    item.children = normalizeFunctionItems(oldItem.children);
    items.push(item);
  }

  return items;
}
