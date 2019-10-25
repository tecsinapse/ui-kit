import { defaultBlue } from './colors';

export const customVariantYellow = {
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: defaultBlue,
    },
  },
  MuiPickersYear: {
    yearSelected: {
      color: defaultBlue,
    },
  },
  MuiPickersClockPointer: {
    pointer: {
      backgroundColor: defaultBlue,
    },
    thumb: {
      backgroundColor: defaultBlue,
      borderColor: defaultBlue,
    },
    noPoint: {
      backgroundColor: defaultBlue,
    },
  },
  MuiPickersClock: {
    pin: {
      backgroundColor: defaultBlue,
    },
  },
  MuiOutlinedInput: {
    root: {
      '&$focused $notchedOutline': {
        borderColor: defaultBlue,
      },
    },
  },
  MuiFormLabel: {
    root: {
      '&$focused': {
        color: defaultBlue,
      },
    },
  },
};
