import React from 'react';
import 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce-i18n/langs/pt_BR';
import { Editor } from '@tinymce/tinymce-react';
import { makeStyles } from '@material-ui/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

const useStyle = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  editorError: {
    borderColor: 'red',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
}));

export const EditText = ({
  onChange,
  initialValue,
  uploadURL,
  disabled,
  error,
  name,
  language,
  showMenu,
}) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <div className={error ? classes.editorError : null}>
        <Editor
          disabled={disabled}
          initialValue={initialValue}
          init={{
            plugins: 'link image code paste',
            toolbar:
              'paste | undo redo | bold italic | alignleft aligncenter alignright | code | image',
            paste_data_images: true,
            images_upload_url: uploadURL,
            automatic_uploads: true,
            skin_url: '/',
            language: language === 'pt' ? 'pt_BR' : language,
            menubar: showMenu,
          }}
          onChange={onChange}
          textareaName={name}
        />
      </div>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </div>
  );
};

EditText.defaultProps = {
  onChange: null,
  initialValue: '',
  uploadURL: 'http://127.0.0.1',
  disabled: false,
  error: '',
  language: 'pt',
  showMenu: false,
};

EditText.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
  uploadURL: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  language: PropTypes.oneOf(['pt', 'en', 'es']),
  showMenu: PropTypes.bool,
};
export default EditText;
