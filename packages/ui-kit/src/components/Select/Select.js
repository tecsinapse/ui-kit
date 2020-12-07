import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { styles } from './utils/styles';
import { default as SelectUnstyled } from './SelectUnstyled';
import { propTypes1, defaultProps1 } from './utils/propTypes';

const useSelectStyles = makeStyles(styles);

const Select = props => {
  const classes = useSelectStyles();

  return <SelectUnstyled {...props} classes={classes} />;
};

Select.propTypes = propTypes1;
Select.defaultProps = defaultProps1;

export { Select };
export default Select;
