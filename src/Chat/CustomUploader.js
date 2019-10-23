import React, { forwardRef } from 'react';
import uniqid from 'uniqid';

import { Uploader } from '../UploadFile/Uploader';

export const CustomUploader = forwardRef(
  ({ files, setFiles, mediaType, focusRef, maxFileUploadSize }, ref) => {
    const onAccept = newFiles => {
      if (focusRef) {
        focusRef.focus();
      }

      const copyFiles = { ...files };
      newFiles.forEach(file => {
        const reader = new FileReader();
        const uid = uniqid();

        // convert all no image, no video and no application to application unknown mime type
        const mediaTypeFile =
          file.type.startsWith('image') ||
          file.type.startsWith('video') ||
          file.type.startsWith('application')
            ? file.type
            : 'application/octet-stream';

        // Create preview tag
        reader.onload = event => {
          copyFiles[uid] = {
            file,
            mediaType: mediaTypeFile,
            data: event.target.result,
            name: file.name,
            size: Math.round(file.size / 1024),
          };

          setFiles(copyFiles);
        };
        reader.readAsDataURL(file);
      });
    };

    // TODO: export as a chat props
    const maxFilesPerMessage = 3;
    const messages = {
      maximumFileLimitMessage: limit =>
        `Apenas ${limit} arquivos podem ser carregados por mensagem.`,
      maximumFileNumberMessage: 'Número máximo de arquivos',
      filenameFailedMessage: name => `${name} falhou. `,
      filetypeNotSupportedMessage: 'Arquivo não suportado. ',
      sizeLimitErrorMessage: size =>
        `Arquivo deve ter tamanho menor que ${size / 1024} KB.`,
      undefinedErrorMessage: 'Erro interno',
    };

    return (
      <React.Fragment>
        <Uploader
          value={files}
          onAccept={onAccept}
          filesLimit={maxFilesPerMessage}
          silent
          messages={messages}
          ref={ref}
          acceptedFormat={mediaType ? [mediaType] : undefined}
          maxFileSize={maxFileUploadSize}
        />
      </React.Fragment>
    );
  }
);
