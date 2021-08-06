import {FileType, UploaderMessagesProps} from "../../types/commons";

export interface PreviewListProps {
  value?: FileType;
  onDelete?: () => void;
  headerLabel?: string;
  noFileBottomLabel?: string;
  noFileTopLabel?: string;
  messages?: UploaderMessagesProps;
}

declare const PreviewList: FC<PreviewListProps>;

export default PreviewList;

