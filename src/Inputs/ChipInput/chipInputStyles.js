export const chipInputStyles = theme => {
  const light = theme.palette.type === 'light';
  const bottomLineColor = light
    ? 'rgba(0, 0, 0, 0.42)'
    : 'rgba(255, 255, 255, 0.7)';

  return {
    root: {},
    inputRoot: {
      display: 'inline-block',
      flex: '1 0 auto',
      marginTop: 0,
      '&$outlined,&$filled': {
        boxSizing: 'border-box',
      },
      '&$outlined': {
        paddingTop: 14,
      },
      '&$filled': {
        paddingTop: 28,
      },
    },
    input: {
      display: 'inline-block',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      appearance: 'none', // Remove border in Safari, doesn't seem to break anything in other browsers
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
      float: 'left',
      '&:not($standard)': {
        paddingTop: 0,
      },
    },
    chipContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      cursor: 'text',
      marginBottom: -2,
      minHeight: 40,
      '&$labeled&$standard': {
        marginTop: 18,
      },
    },
    outlined: {},
    standard: {},
    filled: {},
    labeled: {},
    label: {
      top: 4,
      '&$outlined&:not($labelShrink)': {
        top: -4,
      },
      '&$filled&:not($labelShrink)': {
        top: 0,
      },
    },
    labelShrink: {
      top: 0,
    },
    helperText: {
      marginBottom: -20,
    },
    inkbar: {
      '&:after': {
        backgroundColor: theme.palette.primary[light ? 'dark' : 'light'],
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 2,
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      '&$focused:after': {
        transform: 'scaleX(1)',
      },
    },
    focused: {},
    disabled: {},
    underline: {
      '&:before': {
        backgroundColor: bottomLineColor,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        height: 1,
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeIn,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
      '&:hover:not($disabled):before': {
        backgroundColor: theme.palette.text.primary,
        height: 2,
      },
      '&$disabled:before': {
        background: 'transparent',
        backgroundImage: `linear-gradient(to right, ${bottomLineColor} 33%, transparent 0%)`,
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        backgroundSize: '5px 1px',
      },
    },
    error: {
      '&:after': {
        backgroundColor: theme.palette.error.main,
        transform: 'scaleX(1)', // error is always underlined in red
      },
    },
    chip: {
      margin: '0 8px 8px 0',
      float: 'left',
    },
  };
};
