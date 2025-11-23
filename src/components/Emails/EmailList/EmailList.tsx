import './EmailList.css';
import type { Email } from '../../../types/email.types';
import type { Folder } from '../FolderSelector/FolderSelector';
import EmailListElement from './EmailListElement/EmailListElement';

interface EmailListProps {
  emailList: Email[];
  selectedEmail: Email | null;
  selectedEmailIds: Set<string>;
  onEmailSelect: (email: Email) => void;
  onCheckboxToggle: (emailId: string) => void;
  onSelectAll: (checked: boolean) => void;
  enableBulkActions: boolean;
  enableEmailSnippet: boolean;
  folderType: Folder;
}

export default function EmailList({
  emailList,
  selectedEmail,
  selectedEmailIds,
  onEmailSelect,
  onCheckboxToggle,
  onSelectAll,
  enableBulkActions,
  enableEmailSnippet,
  folderType,
}: EmailListProps) {
  const allSelected = emailList.length > 0 && selectedEmailIds.size === emailList.length;
  const someSelected = selectedEmailIds.size > 0 && selectedEmailIds.size < emailList.length;

  return (
    <div className="email-list">
      <div className="email-list-header">
        {enableBulkActions && (
          <div className="select-all-container">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="email-checkbox"
              aria-label="Select all emails"
            />
            <span className="select-all-label">
              {allSelected ? 'Deselect All' : someSelected ? 'Select All' : 'Select All'}
            </span>
          </div>
        )}
        <span className="email-count">
          {emailList.length} {folderType === 'spam' ? 'spam' : ''} {emailList.length === 1 ? 'email' : 'emails'}
        </span>
      </div>
      <div className="email-list-content">
        {emailList.length === 0 ? (
          <div className="email-list-empty">
            <p>{folderType === 'spam' ? 'No spam emails' : 'No emails found'}</p>
          </div>
        ) : (
          emailList.map((email) => (
            <EmailListElement
              key={email.id}
              email={email}
              isSelected={selectedEmail?.id === email.id}
              isChecked={selectedEmailIds.has(email.id)}
              onEmailSelect={onEmailSelect}
              onCheckboxToggle={onCheckboxToggle}
              enableCheckbox={enableBulkActions}
              enableSnippet={enableEmailSnippet}
            />
          ))
        )}
      </div>
    </div>
  );
}
