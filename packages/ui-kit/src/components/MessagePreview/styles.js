export const cardStyle = () => ({
  body: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    width: '400px',
    padding: '1.3vh 0px 5vh 6vh',
    filter: 'drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.55))',
    backgroundImage: `url(https://cdn.portaltecsinapse.com.br/src/chat-component/message-preview-background.jpg)`,
    backgroundSize: 'cover',
    borderRadius: '6px 6px 6px 6px',
  },
  footer: {
    marginTop: '-3px',
    width: '215px',
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
  textHeader: {
    width: '206px',
    margin: '-4px 0 -2px 0',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '13px',
    lineHeight: '13px',

    color: '#000000',
  },
  textFooter: {
    margin: '2px 0 -5px 0',
    width: '180px',
    fontSize: '10px',
    lineHeight: '11px',
    alignItems: 'center',
    textAlign: 'left',

    color: '#00000073',

    flex: 'none',
    order: 1,
    alignSelf: 'stretch',
  },
  textTime: {
    marginBottom: '-5px',
    fontSize: '9px',
    lineHeight: '11px',
    alignItems: 'center',
    textAlign: 'right',

    color: '#00000073',

    flex: 'none',
    order: 2,
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

    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',

    color: '#2CB3F2',

    '&:hover': {
      background: '#e5e5e5',
    },
  },
  image: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '6px 6px 6px 6px',
    width: '215px',
    color: '#858585',
  },
});