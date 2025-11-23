import { useTheme } from '../../context/ThemeContext';
import './ModeToggle.css';

const ModeToggle = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <button 
      className="mode-toggle" 
      onClick={toggleMode}
      aria-label="Toggle mode"
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <img 
        src={mode === 'light' ? '/moon-icon.svg' : '/sun-icon.svg'}
        alt={mode === 'light' ? 'Dark mode' : 'Light mode'}
        className="mode-icon"
      />
    </button>
  );
};

export default ModeToggle;

