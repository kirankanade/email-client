import './BulkActions.css';

interface BulkActionsProps {
  selectedCount: number;
  onMarkAsRead: () => void;
  onMarkAsUnread: () => void;
  onMarkAsSpam: () => void;
  onMarkAsNotSpam: () => void;
  onDelete: () => void;
  enableSpamFilter: boolean;
  isSpamView: boolean;
}

export default function BulkActions({
  selectedCount,
  onMarkAsRead,
  onMarkAsUnread,
  onMarkAsSpam,
  onMarkAsNotSpam,
  onDelete,
  enableSpamFilter,
  isSpamView,
}: BulkActionsProps) {
  return (
    <div className="bulk-actions">
      <span className="bulk-actions-count">
        {selectedCount} {selectedCount === 1 ? 'email' : 'emails'} selected
      </span>
      <div className="bulk-actions-buttons">
        <button onClick={onMarkAsRead} className="bulk-action-btn" title="Mark as read">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
          </svg>
          Read
        </button>
        <button onClick={onMarkAsUnread} className="bulk-action-btn" title="Mark as unread">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          Unread
        </button>
        {enableSpamFilter && (
          <>
            {isSpamView ? (
              <button onClick={onMarkAsNotSpam} className="bulk-action-btn bulk-action-not-spam" title="Not spam">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Not Spam
              </button>
            ) : (
              <button onClick={onMarkAsSpam} className="bulk-action-btn bulk-action-spam" title="Mark as spam">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Spam
              </button>
            )}
          </>
        )}
        <button onClick={onDelete} className="bulk-action-btn bulk-action-delete" title="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

