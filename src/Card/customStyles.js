import { makeStyles } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';

export const defaultGreen = '#4caf50';
export const defaultRed = '#e6433f';
export const defaultOrange = '#ff9d0d';
export const defaultGrey = grey[700];
export const defaultGreyDisabled = grey[400];

export const globalCustomCardStyle = {
  sticky: {
    position: 'sticky',
    top: 0,
  },
  form: {
    margin: '20px',
  },
  card: {
    margin: 10,
    padding: 0,
    marginBottom: 0,
  },
  circularSize: {
    width: '85px',
  },
  circularTinySize: {
    width: '75px',
  },
  cardBasis: {
    padding: 0,
    marginBottom: 0,
  },
  flexColumnCenter: {
    display: 'flex',
    direction: 'column',
    alignItems: 'center',
    padding: 8,
  },
  cardContent: { padding: '8px 16px' },
  overflow: { overflow: 'visible' },
  // Margens
  marginBottom20: {
    marginBottom: '20px',
  },
  marginBottom10: {
    marginBottom: '10px',
  },
  marginBottom15: {
    marginBottom: '15px',
  },
  marginRight10: {
    marginRight: '10px',
  },
  marginTop10: {
    marginTop: '10px',
  },
  marginTop15: {
    marginTop: '15px',
  },
  marginZero: {
    margin: '0',
    border: 'none',
  },
  margin5: {
    margin: '5px',
  },
  marginTopZero: {
    marginTop: '0',
  },
  marginLeft5: {
    marginLeft: '5px',
  },
  marginTop5: {
    marginTop: '5px',
  },

  // paddings
  padding20: {
    padding: '20px',
  },
  paddingZero: {
    // Teste antes de colocar - cards não obedecem essa classe
    padding: '0',
  },
  paddingBottomZero: {
    paddingBottom: 0,
  },
  paddingCard: {
    paddingBottom: 0,
    paddingTop: '8px',
  },
  paddingTopZero: {
    paddingTop: 0,
  },
  paddingTopBottomZero: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonCardPrimary: {
    color: defaultGrey,
  },
  buttonCardSecundary: {
    color: defaultOrange,
  },
  buttonCardThird: {
    color: 'rgba(108, 104, 98, .85 )',
    position: 'initial',
  },

  buttonColorSuccess: {
    backgroundColor: defaultGreen,
    color: 'white',
    '&$disabled': {
      backgroundColor: defaultGrey,
    },
  },
  buttonColorSecundary: {
    backgroundColor: defaultOrange,
    color: 'white',
    '&$disabled': {
      backgroundColor: defaultGrey,
    },
  },
  buttonColorThird: {
    backgroundColor: defaultRed,
    color: 'white',
    '&$disabled': {
      backgroundColor: defaultGrey,
    },
  },
  buttonColorPrimaryWithMarginTop: {
    backgroundColor: defaultGreen,
    color: 'white',
    marginTop: '5px',
    '&$disabled': {
      backgroundColor: defaultGrey,
    },
  },

  snackbarFragment: {
    display: 'flex',
    alignContent: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  tittle: {
    marginBottom: '20px',
    marginTop: '20px',
  },
  disabled: {
    backgroundColor: defaultGreyDisabled,
  },
  iconBackButton: {
    marginLeft: '-12px',
    marginRight: '20px',
  },
  gridFlex: {
    display: 'flex',
    alignItems: 'center',
  },
};

const customCardUiKitStyles = () => ({
  gridContainer: {
    padding: '0',
  },
  grid: {
    padding: '0px 8px 0px 0px',
  },
  title: {
    fontSize: '12px',
    float: 'left',
    fontWeight: 500,
  },
  subTitle: {
    fontSize: '16px',
    lineHeight: '18px',
    fontWeight: 500,
    textTransform: 'capitalize',
    margin: '5px 0',
  },
  content: {
    color: '#616161',
  },
  actions: {
    display: 'block',
    padding: '0px',
  },
  ...globalCustomCardStyle,
});

export const useCardUiKitStyles = makeStyles(customCardUiKitStyles);
