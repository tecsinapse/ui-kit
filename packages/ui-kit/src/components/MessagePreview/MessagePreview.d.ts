import { FC } from 'react';

export interface MessagePreviewProps {
  unformattedText: string
  buttons?: [object];
}

declare const MessagePreview: FC<MessagePreviewProps>

export default MessagePreview;
