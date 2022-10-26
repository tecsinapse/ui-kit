import image from './images/backgroundImage.jpg';

export const cardStyle = () => ({
  body: {
    width: '400px',
    padding: '1.3vh 0px 5vh 6vh',
    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.55))',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    borderRadius: '6px 6px 6px 6px',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'flex-end',
    padding: '0px',
    gap: '2px',

    position: 'relative',
    width: '232px',

    '&:before': {
      content: '""',
      position: 'absolute',
      filter: 'drop-shadow(-2px 1px 2px rgba(0, 0, 0, 0.25))',
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '20px solid #ffffff',
      borderBottom: '20px solid transparent',
      left: '-10px',
    },
  },
  card: {
    padding: '0px',
    filter: 'drop-shadow(5px 5px 6px rgba(0, 0, 0, 0.25))',

    flex: 'none',
    order: 0,
    flexGrow: 0,
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px',
    gap: '10px',

    background: '#ffffff',
    borderRadius: '0px 6px 6px 6px',

    flex: 'none',
    order: 1,
    flexGrow: 0,
  },
  text: {
    width: '206px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '11px',
    lineHeight: '13px',

    color: '#000000',

    flex: 'none',
    order: 0,
    alignSelf: 'stretch',
    flexGrou: 0,
  },
  textTime: {
    height: '11px',
    fontSize: '9px',
    lineHeight: '11px',
    alignItems: 'center',
    textAlign: 'right',

    color: '#858585',

    flex: 'none',
    order: 1,
    alignSelf: 'stretch',
  },
  cardButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0px',
    filter: 'drop-shadow(5px 5px 6px rgba(0, 0, 0, 0.25))',

    gap: '2px',
    width: '232px',

    /* Inside auto layout */

    flex: 'none',
    order: 1,
    flexGrow: 0,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: '0px',
    gap: '2px',

    width: '232px',
  },
  button: {
    width: '100%',

    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '13px',
    fontSize: '11px',
    background: '#FFFFFF',

    /* identical to box height */

    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',

    color: '#2CB3F2',

    '&:hover': {
      background: '#e5e5e5',
    },
  },
});
