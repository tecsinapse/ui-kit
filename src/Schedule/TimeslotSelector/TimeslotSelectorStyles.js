import { makeStyles } from '@material-ui/styles';

import { globalConst } from '../../globalStyle';

export const timeslotSelectorStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    minWidth: globalConst.minWidth,
    width: '100%',
    height: 'calc(100% - 8px)',
    minHeight: '450px',
    position: 'relative',
  },
  paperScrollPaper: {
    height: '100%',
  },
  stepHeader: {
    padding: '12px',
  },
  stepContent: {
    left: '0px',
    right: '0px',
    position: 'absolute',
    bottom: '73px',
    top: '168px',
  },
  stepContentScrolling: {
    overflowY: 'scroll',
    height: '100%',
    width: `calc(100% - 20px)`,
    top: '0px',
    position: 'absolute',
    padding: '8px',
  },
  stepButtons: {
    padding: spacing.unit,
    spacing: spacing.unit * 2,
    right: '0px',
    left: '0px',
    position: 'absolute',
    bottom: '0px',
  },
  availabilityCardRoot: {
    padding: `${spacing.unit}px !important`,
    paddingBottom: `${spacing.unit}px !important`,
  },

  availabilityCardTime: {
    margin: spacing.unit / 4,
  },
}));
