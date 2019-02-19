import { makeStyles } from '@material-ui/styles';

import { globalConst } from '../../globalStyle';

export const timeslotSelectorStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    minWidth: globalConst.minWidth,
  },
  stepContent: {
    padding: spacing.unit * 2,
    paddingTop: 0,
  },
  stepButtons: {
    paddingTop: spacing.unit,
    spacing: spacing.unit * 2,
  },
  availiabilityCardRoot: {
    padding: `${spacing.unit}px !important`,
    paddingBottom: `${spacing.unit}px !important`,
  },

  availiabilityCardTime: {
    margin: spacing.unit / 4,
  },
}));
