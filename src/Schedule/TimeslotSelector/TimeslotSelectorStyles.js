import { globalConst } from '../../globalStyle';

export const timeslotSelectorStyles = ({ palette, spacing }) => ({
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
    top: '180px',
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
    padding: `${spacing(1)}px`,
    spacing: `${spacing(2)}px`,
    right: '0px',
    left: '0px',
    position: 'absolute',
    bottom: '0px',
  },
  availabilityCardRoot: {
    padding: `${spacing(1)}px !important`,
    paddingBottom: `${spacing(1)}px !important`,
  },

  availabilityCardTime: {
    margin: `${spacing(1 / 4)}px`,
  },
});
