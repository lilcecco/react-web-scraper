import { useState } from 'react';
import { FiChrome, FiMail, FiPhone, FiChevronDown } from 'react-icons/fi';
import Pricing from './Pricing';
import './Home.css';

const Home = ({ user, subscribed, darkMode }) => {
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    // data check
    if (!email) return alert('Email required');
    if (!/[\w.-]+@[a-z-]+\.[a-z]{2,3}/.test(email)) return alert('Invalid email address');

    window.location = `/auth/register?email=${email}`;
  }

  return (
    <main className='home-container'>
      <section>
        <div className="home-hero-bg"></div>
        <h1 style={{ color: 'var(--color-3)' }}>Make your</h1>
        <h1>business better</h1>
        <div className='sub'>STOP WASTE YOUR TIME, GET RID OF BORING TASKS AND MAKE THEM EASY</div>
        {!user &&
          <div className={`home-subscribe-cta-container ${darkMode == 'on' ? 'dark-theme' : ''}`}>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="button btn-style-1" onClick={() => onSubmit()}>START FREE TRIAL</div>
          </div>}
      </section>
      <section>
        <div className="home-subsection">
          <h3>GET DATA FOR YOUR BUSINESS</h3>
          <p>Scrape data from the web is as tedious and repetitive task as useful and essential for the growth of your business.<br></br>Using data extraction software allows you to optimize times and make your work more productive.</p>
        </div>
        <div className="home-subsection">
          <div className="home-banner">
            <div className="home-banner-icon-container">
              <FiChrome className="home-banner-icon" />
            </div>
            <div className="home-banner-text">
              <div className="home-banner-title">Websites</div>
              <p>Scrape useful websites urls from any google maps page</p>
            </div>
          </div>
          <div className="home-banner-line"></div>
          <div className="home-banner">
            <div className="home-banner-icon-container">
              <FiMail className="home-banner-icon" />
            </div>
            <div className="home-banner-text">
              <div className="home-banner-title">Email addresses</div>
              <p>You can get email addresses using the bot to extract informations from websites</p>
            </div>
          </div>
          <div className="home-banner-line"></div>
          <div className="home-banner">
            <div className="home-banner-icon-container">
              <FiPhone className="home-banner-icon" />
            </div>
            <div className="home-banner-text">
              <div className="home-banner-title">Phone numbers</div>
              <p>Don't forget that you can also extract phone numbers!</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="home-sec-section-bg"></div>
        <div className="home-sec-subsection" style={{ width: '600px' }}>
          <div className="home-interface-img">
            <img className="img-res" src="/img/interface.jpg" alt="" />
          </div>
        </div>
        <div className="home-sec-subsection" style={{ width: '540px' }}>
          <h3 className="home-sec-subsection-title">SIMPLE INTERFACE</h3>
          <p>The interface, simple and intuitive, has been designed to improve the user experience, from entering data to returning results, from creating processes to their elimination.</p>
        </div>
      </section>
      <section>
        <Pricing user={user} subscribed={subscribed} />
      </section>
    </main>
  );
}

export default Home;