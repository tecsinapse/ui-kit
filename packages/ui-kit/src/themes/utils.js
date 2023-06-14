import React from 'react';
import { themeColors, themes } from 'themes/definitions';
import { defaultBlack, defaultBlue, defaultYellow } from 'utils/colors';
import {
  customVariantBlueGrey,
  customVariantSecondaryAccent,
  customVariantYellow,
} from 'utils/customVariant';
import { createMuiTheme } from '@material-ui/core';

export const customDatePickerStyle = variant => {
  if (variant === themes.yellow) {
    return {
      highligthBgColor: defaultBlue,
      appBarBackgroundColor: defaultBlue,
    };
  }

  if (variant === themes.blueOcean) {
    const pallete = themeColors[variant];

    return {
      highligthBgColor: pallete.secondary.main,
      appBarBackgroundColor: pallete.secondary.main,
    };
  }

  return {};
};

export const renderStyledColor = variant =>
  variant === (themes.yellow || themes.blueGrey || themes.blueOcean)
    ? 'secondary'
    : 'primary';

export const renderStyledLabel = (label, variant) => {
  const customThemes = [themes.yellow, themes.blueGrey, themes.blueOcean];

  if (customThemes.includes(variant)) {
    const pallete = themeColors[variant];
    const customColor = { color: pallete.secondary.main };

    return <div style={customColor}>{label}</div>;
  }

  return label;
};

export const customAppBarStyle = variant => {
  const pallete = themeColors[variant];

  switch (variant) {
    case themes.yellow:
      return {
        titleColor: '#fff',
        subtitleColor: defaultYellow,
        breadcrumbBackgroundColor: defaultYellow,
        breadcrumbTextColor: '#000',
        activeBreadcrumbTextColor: defaultBlue,
        appBarBackgroundColor: defaultBlue,
      };

    case themes.blueGrey:
      return {
        activeBreadcrumbTextColor: '#fff',
      };

    case themes.blueOcean:
      return {
        appBarBackgroundColor: pallete.secondary.main,
        titleColor: pallete.primary.contrastText,
        subtitleColor: pallete.primary.main,
        breadcrumbBackgroundColor: pallete.primary.main,
        breadcrumbTextColor: pallete.secondary.main,
        activeBreadcrumbTextColor: pallete.secondary.main,
      };

    case themes.shallowBlue:
      return {
        titleColor: pallete.primary.contrastText,
        subtitleColor: defaultBlack,
        breadcrumbBackgroundColor: pallete.secondary.main,
        breadcrumbTextColor: pallete.secondary.contrastText,
        activeBreadcrumbTextColor: pallete.secondary.contrastText,
      };

    case themes.wingo:
      return {
        appBarBackgroundColor: '#0B2D44',
        breadcrumbBackgroundColor: '#EF7D14',
        breadcrumbTextColor: '#FFF',
        activeBreadcrumbTextColor: '#0B2D44',
      };

    case themes.heavyBlue:
      return {
        titleColor: '#ffffff',
        subtitleColor: '#ffffff',
        breadcrumbTextColor: '#ffffff',
        activeBreadcrumbTextColor: '#ffffff',
      };

    default:
      return {};
  }
};

const themeGlobals = variant => ({
  menuGlobal: {
    breadcrumbContrastText: variant === themes.redLight ? '#000000' : '#ffffff',
  },
});

const themeCustom = (variant, overrides) => {
  const themePallete = themeColors[variant];

  switch (variant) {
    case themes.yellow:
      return { ...customVariantYellow, ...overrides };

    case themes.blueGrey:
      return { ...customVariantBlueGrey, ...overrides };

    case themes.blueOcean:
    case themes.shallowBlue: {
      const themeAdjustments = customVariantSecondaryAccent(themePallete);

      return { ...themeAdjustments, ...overrides };
    }

    default:
      return { ...overrides };
  }
};

export const theme = (variant, overrides, spacing) => {
  const themeCompile = {
    typography: {
      useNextVariants: true,
    },
    variant,
    spacing,
    overrides: {
      MuiCollapse: {
        entered: {
          height: 'auto',
          overflow: 'visible',
        },
      },
      ...themeCustom(variant, overrides),
    },
    palette: { ...themeColors[variant] },
    ...themeGlobals(variant),
  };

  return createMuiTheme(themeCompile);
};
