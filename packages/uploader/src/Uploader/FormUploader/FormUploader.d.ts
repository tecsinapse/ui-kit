import { FC } from "react";
import { RejectedType, UploaderMessagesProps } from "../../types/commons";

export interface FormUploaderProps {
  acceptedFormat?: string[];
  filesLimit?: number;
  maxFileSize?: number;
  value?: FileType;
  onAccept?: (files: File[]) => void;
  onReject?: (files: RejectedType[]) => void;
  onDelete?: (fileUID: number | string) => void;
  variant?: "auto" | "mobile" | "web";
  headerLabel?: string;
  noFileBottomLabel?: string;
  NoFileTopLabel?: string;
  messages?: UploaderMessagesProps;
}

declare const FormUploader: FC<FormUploaderProps>;

export default FormUploader;
