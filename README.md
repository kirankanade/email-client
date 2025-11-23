# Email Client

A modern, feature-rich email client application built with React, TypeScript, and Vite. This application demonstrates partner-specific configurations, theme management, and comprehensive email management features.

## Features

### Core Functionality
- **Inbox Management** - View and manage your emails with a clean, intuitive interface
- **Folder Navigation** - Switch between Inbox and Spam folders
- **Search & Filter** - Search emails by sender, subject, or email address
- **Bulk Actions** - Select multiple emails and perform actions (mark as read/unread, spam, delete)
- **Email Detail View** - Read full email content with sender information
- **Reply Functionality** - Compose replies to emails (UI only)
- **Spam Management** - Mark emails as spam or move them back to inbox

### Theme System
- **Multi-Color Themes** - Three beautiful color themes (Red, Blue, Green)
- **Light/Dark Mode** - Toggle between light and dark modes
- **Persistent Preferences** - Theme choices saved to localStorage
- **System Preference Detection** - Automatically detects OS color scheme

### Partner Configuration
The application supports three partner configurations with different feature sets:

**Partner A (Blue Theme) :**
- ✅ Bulk Actions
- ❌ Spam Filter (no spam folder)
- ✅ Search
- ✅ Reply
- ✅ Email Snippets

**Partner B (Red Theme) :**
- ✅ Bulk Actions
- ✅ Spam Filter
- ✅ Search
- ❌ Reply
- ❌ Email Snippets

**Partner C (Green Theme) :**
- ❌ Bulk Actions (no checkboxes)
- ✅ Spam Filter
- ❌ Search
- ✅ Reply
- ✅ Email Snippets

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** (version 9 or higher) or **yarn** (version 1.22 or higher)

Check your versions:
```bash
node --version
npm --version
```

## Setup Process

### 1. Clone the Repository

```bash
git clone <repository-url>
cd email-client
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Start Development Server

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is occupied).

### 4. Open in Browser

Navigate to the URL shown in your terminal (typically `http://localhost:5173`)

## Available Scripts

### Development

```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).

### Build

```bash
npm run build
```
Compiles TypeScript and builds the production-ready application to the `dist` folder.

### Preview

```bash
npm run preview
```
Previews the production build locally before deployment.
Note: You must run build before preview. Preview will typically start at `https://localhost:4173`

## Configuration
```

### Partner Configuration Files

Partner configurations are stored in `src/partner-configs/`:
- `partnerA.json` - Blue theme with mentioned features
- `partnerB.json` - Red theme with mentioned features  
- `partnerC.json` - Green theme with mentioned features

Each configuration includes:
```json
{
  "colorTheme": "blue|red|green",
  "features": {
    "enableBulkActions": true|false,
    "enableSpamFilter": true|false,
    "enableSearch": true|false,
    "enableReply": true|false,
    "enableEmailSnippet": true|false
  }
}
```

## Project Structure

```
email-client/
├── public/
│   ├── email-icon.svg
│   ├── moon-icon.svg
│   └── sun-icon.svg
├── src/
│   ├── api/
│   │   └── api.ts                    # Mock email data
│   ├── assets/
│   ├── components/
│   │   ├── Emails/
│   │   │   ├── BulkActions/         # Bulk action toolbar
│   │   │   ├── EmailDetail/         # Email detail view
│   │   │   ├── EmailList/           # Email list component
│   │   │   ├── FolderSelector/      # Inbox/Spam navigation
│   │   │   ├── SearchBar/           # Search functionality
│   │   │   └── Emails.tsx           # Main email container
│   │   ├── ModeToggle/              # Light/Dark mode toggle
│   │   └── PartnerSelector/         # Partner switcher
│   ├── context/
│   │   ├── PartnerContext.tsx       # Partner configuration state
│   │   └── ThemeContext.tsx         # Theme management state
│   ├── partner-configs/
│   │   ├── partnerA.json
│   │   ├── partnerB.json
│   │   ├── partnerC.json
│   │   └── partner-json-getter.ts
│   ├── types/
│   │   └── email.types.ts           # TypeScript interfaces
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```
---

