import { RefObject } from "react";
import {FileType, RejectedType, UploaderMessagesProps} from "../types/commons";

export interface UploaderProps<T> {
  value?: FileType;
  acceptedFormat?: string[],
  filesLimit?: number;
  maxFileSize?: number;
  onAccept?: (files: File[]) => void;
  onReject?: (files: RejectedType[]) => void;
  silent?: boolean;
  messages?: UploaderMessagesProps;
  ref?: RefObject<T>;
}

declare const Uploader: <T>(props: UploaderProps<T>) => JSX.Element;

export default Uploader;

