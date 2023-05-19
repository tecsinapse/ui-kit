import { FC } from 'react';

export interface MessagePreviewProps {
  unformattedText: string
  buttons?: [object];
  media?: string | undefined | null,
  header?: string | undefined | null,
  footer?: string | undefined | null,
}

declare const MessagePreview: FC<MessagePreviewProps>

export default MessagePreview;
