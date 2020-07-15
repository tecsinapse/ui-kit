import React from 'react';
import { makeStyles, styled } from '@material-ui/styles';
import { AppBar } from '../../components/Menu/AppBar/AppBar';

export const StyledAppBar = styled(AppBar)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
});

export const appBarStyles = makeStyles(() => ({
  div: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    display: 'flex',
  },
  flex: {
    alignItems: 'center',
    display: 'flex',
    padding: '12px',
  },
  image: {
    maxWidth: '72px',
    marginRight: '24px',
  },
}));

const style = { display: 'flex' };

export const SearchBarMobileStory = () => {
  const classes = appBarStyles();

  return (
    <StyledAppBar
      leftIcons={
        <div style={style}>
          <img
            src="https://www.tecsinapse.com.br/wp-content/themes/TecSinapse/assets/images/tecsinapse.svg"
            className={classes.image}
            alt="logo"
          />
        </div>
      }
      menuBar={false}
      searchBar
      disableBreadcrumb
    />
  );
};
