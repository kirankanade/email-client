import { usePartner } from '../../context/PartnerContext';
import { useTheme } from '../../context/ThemeContext';
import { getPartnerConfig } from '../../partner-configs/partner-json-getter';
import type { PartnerType } from '../../partner-configs/partner-json-getter';
import './PartnerSelector.css';

const PartnerSelector = () => {
  const { currentPartner, setPartner } = usePartner();
  const { setThemeColor } = useTheme();

  const partners: { id: PartnerType; label: string }[] = [
    { id: 'partnerA', label: 'Partner A' },
    { id: 'partnerB', label: 'Partner B' },
    { id: 'partnerC', label: 'Partner C' },
  ];

  const handlePartnerChange = (partnerId: PartnerType) => {
    setPartner(partnerId);
    // Update theme color based on partner config
    const config = getPartnerConfig(partnerId as PartnerType);
    setThemeColor(config.colorTheme);
  };

  return (
    <div className="partner-selector">
      <label htmlFor="partner-select" className="selector-label">
        Partner:
      </label>
      <select
        id="partner-select"
        value={currentPartner}
        onChange={(e) => handlePartnerChange(e.target.value as PartnerType)}
        className="partner-dropdown"
      >
        {partners.map((partner) => (
          <option key={partner.id} value={partner.id}>
            {partner.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PartnerSelector;

