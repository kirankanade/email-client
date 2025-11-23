import './Emails.css';
import { useEffect, useState } from 'react';
import { getEmailList } from '../../api/api';
import type { Email } from '../../types/email.types';
import EmailList from './EmailList/EmailList';
import EmailDetail from './EmailDetail/EmailDetail';
import SearchBar from './SearchBar/SearchBar';
import BulkActions from './BulkActions/BulkActions';
import FolderSelector, { type Folder } from './FolderSelector/FolderSelector';
import { usePartner } from '../../context/PartnerContext';

export default function Emails() {
  const [emailList, setEmailList] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<Folder>('inbox');
  const { partnerConfig } = usePartner();

  useEffect(() => {
    getEmailList().then((data) => {
      setEmailList(data);
    });
  }, []);

  // Update page title when an email is selected
  useEffect(() => {
    if (selectedEmail) {
      document.title = `${selectedEmail.subject}`;
    } else {
      document.title = 'Email Client';
    }

    // Cleanup: reset title when component unmounts
    return () => {
      document.title = 'Email Client';
    };
  }, [selectedEmail]);

  useEffect(() => {
    // Filter by folder first (inbox or spam)
    let folderFiltered = emailList.filter((email) => {
      if (activeFolder === 'inbox') {
        return !email.isSpam;
      } else {
        return email.isSpam;
      }
    });

    // Then apply search filter
    if (searchQuery.trim() === '') {
      setFilteredEmails(folderFiltered);
    } else {
      const query = searchQuery.toLowerCase();
      const searchFiltered = folderFiltered.filter(
        (email) =>
          email.sender.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.senderEmail.toLowerCase().includes(query)
      );
      setFilteredEmails(searchFiltered);
    }
  }, [searchQuery, emailList, activeFolder]);

  const handleFolderChange = (folder: Folder) => {
    setActiveFolder(folder);
    setSelectedEmail(null);
    setSelectedEmailIds(new Set());
    setSearchQuery('');
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    // Mark as read when opened
    setEmailList((prev) =>
      prev.map((e) => (e.id === email.id ? { ...e, isRead: true } : e))
    );
  };

  const handleCheckboxToggle = (emailId: string) => {
    setSelectedEmailIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmailIds(new Set(filteredEmails.map((e) => e.id)));
    } else {
      setSelectedEmailIds(new Set());
    }
  };

  const handleMarkAsRead = (read: boolean) => {
    setEmailList((prev) =>
      prev.map((email) =>
        selectedEmailIds.has(email.id) ? { ...email, isRead: read } : email
      )
    );
    setSelectedEmailIds(new Set());
  };

  const handleMarkAsSpam = () => {
    setEmailList((prev) =>
      prev.map((email) =>
        selectedEmailIds.has(email.id) ? { ...email, isSpam: true } : email
      )
    );
    setSelectedEmailIds(new Set());
    if (selectedEmail && selectedEmailIds.has(selectedEmail.id)) {
      setSelectedEmail(null);
    }
  };

  const handleMarkAsNotSpam = () => {
    setEmailList((prev) =>
      prev.map((email) =>
        selectedEmailIds.has(email.id) ? { ...email, isSpam: false } : email
      )
    );
    setSelectedEmailIds(new Set());
  };

  const handleDelete = () => {
    setEmailList((prev) => prev.filter((email) => !selectedEmailIds.has(email.id)));
    setSelectedEmailIds(new Set());
    if (selectedEmail && selectedEmailIds.has(selectedEmail.id)) {
      setSelectedEmail(null);
    }
  };

  const handleUpdateEmail = (updatedEmail: Email) => {
    setEmailList((prev) =>
      prev.map((email) => (email.id === updatedEmail.id ? updatedEmail : email))
    );
    setSelectedEmail(updatedEmail);
  };

  const spamCount = emailList.filter((email) => email.isSpam).length;

  return (
    <div className="emails-wrapper">
      <FolderSelector 
        activeFolder={activeFolder} 
        onFolderChange={handleFolderChange}
        spamCount={spamCount}
        enableSpamFilter={partnerConfig.features.enableSpamFilter}
      />
      {partnerConfig.features.enableSearch && (
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      )}
      {partnerConfig.features.enableBulkActions && selectedEmailIds.size > 0 && (
        <BulkActions
          selectedCount={selectedEmailIds.size}
          onMarkAsRead={() => handleMarkAsRead(true)}
          onMarkAsUnread={() => handleMarkAsRead(false)}
          onMarkAsSpam={handleMarkAsSpam}
          onMarkAsNotSpam={handleMarkAsNotSpam}
          onDelete={handleDelete}
          enableSpamFilter={partnerConfig.features.enableSpamFilter}
          isSpamView={activeFolder === 'spam'}
        />
      )}
      <div className="email-container">
        <EmailList
          emailList={filteredEmails}
          selectedEmail={selectedEmail}
          selectedEmailIds={selectedEmailIds}
          onEmailSelect={handleEmailSelect}
          onCheckboxToggle={handleCheckboxToggle}
          onSelectAll={handleSelectAll}
          enableBulkActions={partnerConfig.features.enableBulkActions}
          enableEmailSnippet={partnerConfig.features.enableEmailSnippet}
          folderType={activeFolder}
        />
        <EmailDetail
          selectedEmail={selectedEmail}
          onUpdateEmail={handleUpdateEmail}
          enableSpamFilter={partnerConfig.features.enableSpamFilter}
          enableReply={partnerConfig.features.enableReply}
          isSpamView={activeFolder === 'spam'}
        />
      </div>
    </div>
  );
}
