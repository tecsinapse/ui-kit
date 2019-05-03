import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

export const EditText = ({ bla }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <CKEditor
        editor={ClassicEditor}
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          // console.log( 'Editor is ready to use!', editor );
        }}
        onChange={(event, editor) => {
          // const data = editor.getData();
          // console.log( { event, editor, data } );
        }}
        onBlur={editor => {
          // console.log( 'Blur.', editor );
        }}
        onFocus={editor => {
          // console.log( 'Focus.', editor );
        }}
      />
    </div>
  );
};

EditText.defaultProps = {
  bla: null,
};

EditText.propTypes = {
  bla: PropTypes.object,
};
