import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PartnerProvider } from './context/PartnerContext'
import type { PartnerType } from './partner-configs/partner-json-getter'

// Configure initial partner here (can be 'partnerA' or 'partnerB')
const initialPartner: PartnerType = 'partnerA';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PartnerProvider initialPartner={initialPartner}>
      <App />
    </PartnerProvider>
  </StrictMode>
)
