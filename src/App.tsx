import './App.css'
import ModeToggle from './components/ModeToggle/ModeToggle'
import PartnerSelector from './components/PartnerSelector/PartnerSelector'
import { ThemeProvider } from './context/ThemeContext'
import { usePartner } from './context/PartnerContext'
import Emails from './components/Emails/Emails'

function App() {
  const { partnerConfig } = usePartner();

  return (
    <ThemeProvider themeColor={partnerConfig.colorTheme}>
      <div className="app">
        <div className="app-header">
          <ModeToggle />
          <PartnerSelector />
        </div>
        <Emails />
      </div>
    </ThemeProvider>
  )
}

export default App
