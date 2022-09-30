import { useEffect, useState } from 'react';
import { FiXOctagon, FiCheckCircle } from "react-icons/fi";

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [btnValue, setBtnValue] = useState('SEND');

  // spinner init
  useEffect(() => {
    const showSpinner = () => {
      setBtnValue('');
      spinner.classList.remove('hidden');
    }

    const hideSpinner = () => {
      setBtnValue('SEND');
      spinner.classList.add('hidden');
    }

    const spinner = document.querySelector('.lds-dual-ring');

    document.addEventListener('busy', (e) => {
      if (e.detail) {
        showSpinner();
      } else {
        hideSpinner();
      }
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault(e);

    // reset default
    setSuccessMessage('');
    setErrorMessage('');
    setEmail('');

    // show spinner
    document.dispatchEvent(new CustomEvent('busy', { detail: true }));

    // send email
    const res = await fetch('/api/auth/reset-password-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    // hide spinner
    document.dispatchEvent(new CustomEvent('busy', { detail: false }));

    // handle error
    if (data?.error) return setErrorMessage(data.error);

    setSuccessMessage(data.message);
  }

  return (
    <div className='reset-password-email'>
      <h1>RESET PASSWORD</h1>
      <div className='sub'>Write your email address here, you're going to receive an email to change your password.</div>
      {errorMessage && <div className='error message-container'>
        <FiXOctagon className='message-icon' />
        <div className='message'>{errorMessage}</div>
      </div>}
      {successMessage && <div className='message-container'>
        <FiCheckCircle className='message-icon' />
        <div className='message'>{successMessage}</div>
      </div>}
      <form className='reset-password-email-form' onSubmit={(e) => onSubmit(e)}>
        <div className='textbox'>
          <input
            type='text' id='email' name='email' placeholder='Insert email'
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='button-container'>
          <input type='submit' className='button btn-style-1' value={btnValue} />
          <div className="lds-dual-ring hidden"></div>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordEmail;