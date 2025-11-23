import partnerA from './partnerA.json';
import partnerB from './partnerB.json';
import partnerC from './partnerC.json';
import type { ThemeColor } from '../context/ThemeContext';
import type { PartnerFeatures } from '../types/email.types';

export type PartnerType = 'partnerA' | 'partnerB' | 'partnerC';
export type PartnerConfig = {
    colorTheme: ThemeColor;
    features: PartnerFeatures;
}

export const getPartnerConfig = (partner: PartnerType): PartnerConfig => {
    if (partner === 'partnerA') {
        return partnerA as PartnerConfig;
    } else if (partner === 'partnerB') {
        return partnerB as PartnerConfig;
    } else if (partner === 'partnerC') {
        return partnerC as PartnerConfig;
    }

    // default config would be partnerA
    return partnerA as PartnerConfig;
};