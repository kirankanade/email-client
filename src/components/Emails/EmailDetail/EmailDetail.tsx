import './EmailDetail.css';
import type { Email } from '../../../types/email.types';
import { useState } from 'react';

interface EmailDetailProps {
  selectedEmail: Email | null;
  onUpdateEmail: (email: Email) => void;
  enableSpamFilter: boolean;
  enableReply: boolean;
  isSpamView: boolean;
}

export default function EmailDetail({
  selectedEmail,
  onUpdateEmail,
  enableSpamFilter,
  enableReply,
  isSpamView,
}: EmailDetailProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  if (!selectedEmail) {
    return (
      <div className="email-detail">
        <div className="email-detail-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <h3>No email selected</h3>
          <p>Select an email from the list to read it</p>
        </div>
      </div>
    );
  }

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleMarkAsUnread = () => {
    onUpdateEmail({ ...selectedEmail, isRead: false });
  };

  const handleMarkAsSpam = () => {
    onUpdateEmail({ ...selectedEmail, isSpam: true });
  };

  const handleMarkAsNotSpam = () => {
    onUpdateEmail({ ...selectedEmail, isSpam: false });
  };

  const handleReply = () => {
    setIsReplying(true);
  };

  const handleSendReply = () => {
    // No-op as per requirements
    console.log('Reply sent:', replyText);
    setReplyText('');
    setIsReplying(false);
  };

  const handleCancelReply = () => {
    setReplyText('');
    setIsReplying(false);
  };

  return (
    <div className="email-detail">
      <div className="email-detail-header">
        <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
        <div className="email-detail-actions">
          <button
            onClick={handleMarkAsUnread}
            className="email-action-btn"
            title="Mark as unread"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Unread
          </button>
          {enableSpamFilter && (
            <>
              {isSpamView ? (
                <button
                  onClick={handleMarkAsNotSpam}
                  className="email-action-btn email-action-not-spam"
                  title="Mark as not spam"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Not Spam
                </button>
              ) : (
                <button
                  onClick={handleMarkAsSpam}
                  className="email-action-btn email-action-spam"
                  title="Mark as spam"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Spam
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="email-detail-meta">
        <div className="email-sender-info">
          <div className="email-sender-avatar">
            {selectedEmail.sender.charAt(0).toUpperCase()}
          </div>
          <div className="email-sender-details">
            <div className="email-sender-name">{selectedEmail.sender}</div>
            <div className="email-sender-email">{selectedEmail.senderEmail}</div>
          </div>
        </div>
        <div className="email-detail-date">{formatFullDate(selectedEmail.date)}</div>
      </div>

      <div className="email-detail-body">
        <p>{selectedEmail.body}</p>
      </div>

      {enableReply && !isReplying && !isSpamView && (
        <div className="email-detail-footer">
          <button onClick={handleReply} className="reply-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 14 4 9 9 4"></polyline>
              <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
            </svg>
            Reply
          </button>
        </div>
      )}

      {isReplying && (
        <div className="reply-container">
          <div className="reply-header">
            <span className="reply-title">Reply to {selectedEmail.sender}</span>
          </div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="reply-textarea"
            rows={6}
            autoFocus
          />
          <div className="reply-actions">
            <button onClick={handleSendReply} className="reply-send-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Send
            </button>
            <button onClick={handleCancelReply} className="reply-cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
