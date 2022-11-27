import { FiSun, FiMoon } from "react-icons/fi";

const SwitchMode = ({ darkMode, setDarkMode }) => {
  const switchTheme = () => {
    if (darkMode && darkMode == 'on') {
      window.localStorage.setItem('darkMode', 'off');
      setDarkMode('off');
    } else {
      window.localStorage.setItem('darkMode', 'on');
      setDarkMode('on');
    }
  }

  return (
    <div className='switch-container' onClick={() => switchTheme()}>
      <span className={`switch ${darkMode == 'on' ? 'switch--on' : ''}`}></span>
      <FiSun className='switch-icon' />
      <FiMoon className='switch-icon' style={{ left: '35px' }} />
    </div>
  );
}

export default SwitchMode;