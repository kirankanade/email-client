import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getPartnerConfig, type PartnerType } from '../partner-configs/partner-json-getter';

interface PartnerContextType {
  currentPartner: PartnerType;
  setPartner: (partner: PartnerType) => void;
  partnerConfig: ReturnType<typeof getPartnerConfig>;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

interface PartnerProviderProps {
  children: ReactNode;
  initialPartner?: PartnerType;
}

export const PartnerProvider = ({ children, initialPartner = 'partnerA' }: PartnerProviderProps) => {
  const [currentPartner, setCurrentPartner] = useState<PartnerType>(initialPartner);
  const partnerConfig = getPartnerConfig(currentPartner);

  const setPartner = (partner: PartnerType) => {
    setCurrentPartner(partner);
  };

  return (
    <PartnerContext.Provider value={{ currentPartner, setPartner, partnerConfig }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};

