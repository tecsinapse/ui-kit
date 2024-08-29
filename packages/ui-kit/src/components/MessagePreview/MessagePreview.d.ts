import { FC } from 'react';

export interface MessagePreviewProps {
  unformattedText: string
  buttons?: [object];
  media?: string | undefined | null,
  headerText?: string | undefined | null,
  headerType?: string | undefined | null,
  footer?: string | undefined | null,
}

declare const MessagePreview: FC<MessagePreviewProps>

export default MessagePreview;
