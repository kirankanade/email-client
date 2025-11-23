import type { Email } from '../types/email.types';

const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'John Doe',
    senderEmail: 'john.doe@example.com',
    subject: 'Welcome to Email Client!',
    body: 'Hi there! We are excited to have you onboard. This is your first email in the client. Feel free to explore all the features we have built including bulk actions, search, and more!',
    snippet: 'Hi there! We are excited to have you onboard. This is your first email...',
    date: new Date('2025-11-20T10:30:00'),
    isRead: false,
    isSpam: false,
  },
  {
    id: '2',
    sender: 'Sarah Johnson',
    senderEmail: 'sarah.j@company.com',
    subject: 'Meeting Tomorrow at 2 PM',
    body: 'Hey team! Just a reminder that we have our quarterly planning meeting tomorrow at 2 PM in the main conference room. Please come prepared with your Q4 goals and any blockers you are facing.',
    snippet: 'Hey team! Just a reminder that we have our quarterly planning meeting...',
    date: new Date('2025-11-21T14:00:00'),
    isRead: false,
    isSpam: false,
  },
  {
    id: '3',
    sender: 'Marketing Team',
    senderEmail: 'marketing@business.com',
    subject: 'New Product Launch Updates',
    body: 'Exciting news! Our new product is launching next week. Here are the key highlights and marketing materials you can use to promote it to your networks.',
    snippet: 'Exciting news! Our new product is launching next week. Here are the...',
    date: new Date('2025-11-19T09:15:00'),
    isRead: true,
    isSpam: false,
  },
  {
    id: '4',
    sender: 'Spam Bot',
    senderEmail: 'no-reply@spam.com',
    subject: 'You Won a Million Dollars!!!',
    body: 'Congratulations! You have been selected as our lucky winner. Click here to claim your prize now! Limited time offer!',
    snippet: 'Congratulations! You have been selected as our lucky winner...',
    date: new Date('2025-11-18T23:45:00'),
    isRead: false,
    isSpam: false,
  },
  {
    id: '5',
    sender: 'Alice Smith',
    senderEmail: 'alice.smith@tech.com',
    subject: 'Code Review Request',
    body: 'Hi! Could you please review my pull request #234? I have made changes to the email component styling and would love your feedback before merging.',
    snippet: 'Hi! Could you please review my pull request #234? I have made changes...',
    date: new Date('2025-11-22T11:20:00'),
    isRead: false,
    isSpam: false,
  },
  {
    id: '6',
    sender: 'HR Department',
    senderEmail: 'hr@company.com',
    subject: 'Benefits Enrollment Reminder',
    body: 'This is a friendly reminder that benefits enrollment closes on November 30th. Please log into the portal and make your selections before the deadline.',
    snippet: 'This is a friendly reminder that benefits enrollment closes on...',
    date: new Date('2025-11-17T08:00:00'),
    isRead: true,
    isSpam: false,
  },
  {
    id: '7',
    sender: 'Bob Williams',
    senderEmail: 'bob.w@email.com',
    subject: 'Weekend Plans?',
    body: 'Hey! Are you free this weekend? A group of us are planning to go hiking. Let me know if you would like to join!',
    snippet: 'Hey! Are you free this weekend? A group of us are planning to go...',
    date: new Date('2025-11-22T16:45:00'),
    isRead: false,
    isSpam: false,
  },
  {
    id: '8',
    sender: 'Newsletter',
    senderEmail: 'news@techblog.com',
    subject: 'This Week in Tech - November Edition',
    body: 'Check out the latest tech news, tutorials, and trends from this week. Featured articles include React 19 updates, AI advancements, and cloud computing innovations.',
    snippet: 'Check out the latest tech news, tutorials, and trends from this week...',
    date: new Date('2025-11-16T07:30:00'),
    isRead: true,
    isSpam: false,
  },
];

export const getEmailList = async (): Promise<Email[]> => {
  // Simulating async API response 
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmails);
    }, 500);
  });
};

