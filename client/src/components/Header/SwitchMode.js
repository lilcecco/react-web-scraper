import { FiSun, FiMoon } from "react-icons/fi";

const SwitchMode = ({ darkMode, setDarkMode }) => {
  return (
    <div className='switch-container' onClick={() => setDarkMode(!darkMode)}>
      <span className={`switch ${darkMode ? 'switch--on' : ''}`}></span>
      <FiSun className='switch-icon' />
      <FiMoon className='switch-icon' style={{ left: '35px' }} />
    </div>
  );
}

export default SwitchMode;