import { useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useAddButtonStyles = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const buttonStyle = { maxHeight: !matches ? '56px' : '40px' };
  const color = theme.palette.primary.contrastText;
  const marginZeroStyle = { margin: 0 };
  const buttonNovoCampo = {
    height: '100%',
    marginLeft: theme.spacing(1),
  };

  return { color, buttonNovoCampo, buttonStyle, marginZeroStyle };
};
