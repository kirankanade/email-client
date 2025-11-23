import './FolderSelector.css';

export type Folder = 'inbox' | 'spam';

interface FolderSelectorProps {
  activeFolder: Folder;
  onFolderChange: (folder: Folder) => void;
  spamCount: number;
  enableSpamFilter: boolean;
}

export default function FolderSelector({ activeFolder, onFolderChange, spamCount, enableSpamFilter }: FolderSelectorProps) {
  return (
    <div className="folder-selector">
      <button
        className={`folder-btn ${activeFolder === 'inbox' ? 'active' : ''}`}
        onClick={() => onFolderChange('inbox')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
        </svg>
        <span>Inbox</span>
      </button>
      {enableSpamFilter && (
        <button
          className={`folder-btn ${activeFolder === 'spam' ? 'active' : ''}`}
          onClick={() => onFolderChange('spam')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Spam</span>
          {spamCount > 0 && <span className="spam-badge">{spamCount}</span>}
        </button>
      )}
    </div>
  );
}

