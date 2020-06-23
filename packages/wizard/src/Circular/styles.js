import { makeStyles } from '@material-ui/core';
import {
  defaultGreen,
  defaultOrange,
  defaultRed,
} from '@tecsinapse/ui-kit/build/colors';

export const useStyles = makeStyles(({ spacing }) => ({
  circularStepperContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: spacing(1),
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBackground: {
    stroke: '#D3D3D3',
    fill: 'none',
  },
  circleProgress: {
    stroke: defaultGreen,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    transition: '0.6s',
    fill: 'none',
  },
  strokeOrange: {
    stroke: defaultOrange,
  },
  strokeRed: {
    stroke: defaultRed,
  },
  circleText: {
    fontSize: '1.1rem',
    fontWeight: '500',
    fontFamily: 'Roboto',
  },
  circularStepperText: {
    marginLeft: spacing(2),
    textAlign: 'right',
  },
  currentStepText: {
    fontSize: '1.3rem',
    fontWeight: 500,
    letterSpacing: '0.25px',
  },
}));
