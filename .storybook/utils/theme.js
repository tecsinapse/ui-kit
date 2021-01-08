import { create } from '@storybook/theming/create';
import { themeColors } from '@tecsinapse/ui-kit/build/themes';
import { defaultBadgeColor } from '@tecsinapse/ui-kit/src/utils/colors';

export const theme = create({
  base: 'light',
  brandTitle: 'TecSinapse UI-KIT',
  brandUrl: 'https://github.com/tecsinapse/ui-kit',
  fontBase: 'Roboto',
  colorPrimary: themeColors.orange.primary.main,
  colorSecondary: themeColors.orange.secondary.main,
});

export const overrides = {
  MuiBadge: {
    badge: {
      backgroundColor: defaultBadgeColor,
    },
  },
};
