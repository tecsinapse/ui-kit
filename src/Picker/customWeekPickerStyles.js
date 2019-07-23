import { makeStyles } from '@material-ui/styles';
import { defaultOrange } from '../colors';

export const useStylesWeek = makeStyles(() => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontFamily: 'Roboto',
    fontSize: '0.875rem',
    margin: '0 2px',
    color: 'inherit',
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${defaultOrange}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: 'grey',
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: defaultOrange,
    color: '#ffff',
  },
  firstHighlight: {
    extend: 'highlight',
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    extend: 'highlight',
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
}));
