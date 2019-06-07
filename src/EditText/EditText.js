import React from 'react';
import 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
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
  uploadFunc,
  hasImage,
  skinUrl,
  toolbarDrawer,
  variant,
}) => {
  const classes = useStyle();

  const plugins = ['link', 'code', 'paste', 'lists'];

  if (hasImage) {
    plugins.push('image');
  }

  const toolbar = {
    simple: [
      'paste',
      'undo redo',
      'fontselect fontsizeselect forecolor',
      'bold italic',
      'alignleft aligncenter alignright alignjustify',
      'image',
    ],
    advanced: [
      'copy cut paste',
      'undo redo',
      'fontselect fontsizeselect forecolor',
      'bold italic underline strikethrough subscript superscript',
      'alignleft aligncenter alignright alignjustify',
      'link unlink image',
      'bullist numlist',
      'outdent indent',
      'code',
    ],
  };

  return (
    <div className={classes.root}>
      <div className={error ? classes.editorError : null}>
        <Editor
          disabled={disabled}
          initialValue={initialValue}
          init={{
            plugins: plugins.join(' '),
            toolbar_drawer: toolbarDrawer,
            toolbar: toolbar[variant].join('|'),
            paste_data_images: hasImage,
            images_upload_url: uploadURL,
            automatic_uploads: true,
            skin_url: skinUrl || '/',
            language: language === 'pt' ? 'pt_BR' : language,
            menubar: showMenu,
            images_upload_handler: uploadFunc,
            branding: false,
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
  uploadURL: undefined,
  disabled: false,
  error: '',
  language: 'pt',
  showMenu: false,
  uploadFunc: undefined,
  hasImage: false,
  skinUrl: '',
  toolbarDrawer: '',
  variant: 'simple',
};

EditText.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.string,
  uploadURL: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  language: PropTypes.oneOf(['pt', 'en', 'es']),
  showMenu: PropTypes.bool,
  uploadFunc: PropTypes.func,
  hasImage: PropTypes.bool,
  skinUrl: PropTypes.string,
  toolbarDrawer: PropTypes.oneOf(['', 'floating', 'sliding']),
  variant: PropTypes.oneOf(['simple', 'advanced']),
};

export default EditText;
