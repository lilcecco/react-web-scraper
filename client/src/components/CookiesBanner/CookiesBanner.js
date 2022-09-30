import './CookiesBanner.css';

const CookiesBanner = ({ acceptsCookies }) => {
  return (
    <div className="cookies-banner">
        <img className="cookies-icon" src="/img/cookies.png" alt="" />
        <p>Bot-Tino uses cookies to enhance your browsing experience, analyze traffic and serve targeted ads. By continuing to use our site and application, you agree to our Privacy policy and use of cookies.</p>
        <div className="button btn-style-2" onClick={acceptsCookies} >ACCEPT</div>
    </div>
  );
}

export default CookiesBanner;