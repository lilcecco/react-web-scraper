import { useState } from 'react';
import './CookiesBanner.css';

const CookiesBanner = () => {
  const [isCookiesEnabled, setIsCookiesEnabled] = useState(window.sessionStorage.getItem('isCookiesEnabled'));

  const enableCookies = () => {
    if (!isCookiesEnabled) {
      window.sessionStorage.setItem('isCookiesEnabled', 'true');
      setIsCookiesEnabled('true');
    }
  }

  return (
    <>
      {!isCookiesEnabled && <div className="cookies-banner">
        <img className="cookies-icon" src="/img/cookies.png" alt="" />
        {/* <p>Bot-Tino uses cookies to enhance your browsing experience, analyze traffic and serve targeted ads. By continuing to use our site and application, you agree to our Privacy policy and use of cookies.</p> */}
        <p>The page uses technical cookies to allow yourself to use the software accurately. It doesn't use third-party cookies for matketing purposes, analyze traffic or serve targeted ads.</p>
        <div className="button btn-style-2" onClick={() => enableCookies()}>ACCEPT</div>
      </div>}
    </>
  );
}

export default CookiesBanner;