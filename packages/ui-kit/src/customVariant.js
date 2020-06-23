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

export const customVariantBlueGrey = {
  MuiPickersToolbarText: {
    toolbarBtnSelected: {
      color: '#fff',
    },
    toolbarTxt: {
      color: '#fff',
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: '#0f3399',
    },
  },
  MuiStepIcon: {
    text: {
      fill: '#fff',
    },
  },
};
