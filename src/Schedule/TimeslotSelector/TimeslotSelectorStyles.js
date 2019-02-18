import { makeStyles } from '@material-ui/styles';

import { globalConst } from '../../globalStyle';

export const timeslotSelectorStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    minWidth: globalConst.minWidth,
  },
  component100Per: {
    width: '100% !important',
  },
  stepContent: {
    padding: spacing.unit,
    paddingTop: 0,
    width: '100%',
  },
  stepButtons: {
    padding: spacing.unit,
    width: '100%',
    contentAlign: 'center',
  },
  stepBody: {
    width: '100%',
    padding: spacing.unit,
    marginBottom: spacing.unit,
    paddingTop: 0,
  },
}));
