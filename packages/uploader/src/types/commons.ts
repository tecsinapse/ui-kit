export type FileType = {
  [key: string]: {
    file: File;
    completed: number;
    data: string;
    error: string;
    noShowSnack: boolean;
  }
}

export type RejectedType = {
  file: File;
  error: string;
}

export interface UploaderMessagesProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  filetypeNotSupportedMessage?: string;
  maximumFileLimitMessage?: (limit: string | number) => string;
  filenameFailedMessage: (message: string) => string;
  sizeLimitErrorMessage?: (message: string | number) => string;
  fileRemovedMessage?: string;
  fileUploadedSucessfullyMessage?: (message: string) => string;
  fileErroedMessage?: (filename: string, error: string) => string;
  maximumFileNumberMessage?: string;
  undefinedErrorMessage?: string;
}
