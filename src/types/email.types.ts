export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  body: string;
  snippet: string;
  date: Date;
  isRead: boolean;
  isSpam: boolean;
}

export interface PartnerFeatures {
  enableBulkActions: boolean;
  enableSpamFilter: boolean;
  enableSearch: boolean;
  enableReply: boolean;
  enableEmailSnippet: boolean;
}

