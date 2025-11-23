import './EmailListElement.css';
import type { Email } from '../../../../types/email.types';

interface EmailListElementProps {
  email: Email;
  isSelected: boolean;
  isChecked: boolean;
  onEmailSelect: (email: Email) => void;
  onCheckboxToggle: (emailId: string) => void;
  enableCheckbox: boolean;
  enableSnippet: boolean;
}

export default function EmailListElement({
  email,
  isSelected,
  isChecked,
  onEmailSelect,
  onCheckboxToggle,
  enableCheckbox,
  enableSnippet,
}: EmailListElementProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div
      className={`email-list-element ${isSelected ? 'selected' : ''} ${!email.isRead ? 'unread' : ''}`}
    >
      {enableCheckbox && (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            e.stopPropagation();
            onCheckboxToggle(email.id);
          }}
          className="email-checkbox"
          aria-label={`Select email from ${email.sender}`}
        />
      )}
      <div className="email-content" onClick={() => onEmailSelect(email)}>
        <div className="email-header">
          <span className="email-sender">{email.sender}</span>
          <span className="email-date">{formatDate(email.date)}</span>
        </div>
        <div className="email-subject">
          {!email.isRead && <span className="unread-indicator"></span>}
          {email.subject}
        </div>
        {enableSnippet && <div className="email-snippet">{email.snippet}</div>}
      </div>
    </div>
  );
}
