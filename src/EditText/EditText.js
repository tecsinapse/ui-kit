import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

export const EditText = ({ onChange, initialValue }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <Editor
        initialValue={initialValue}
        init={{
          plugins: 'link image code paste',
          toolbar:
            'paste | undo redo | bold italic | alignleft aligncenter alignright | code',
          paste_data_images: true,
          images_upload_url: 'http://127.0.0.1/',
          automatic_uploads: true,
        }}
        onChange={onChange}
      />
    </div>
  );
};

EditText.defaultProps = {
  onChange: null,
  initialValue: '',
};

EditText.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
};
export default EditText;
