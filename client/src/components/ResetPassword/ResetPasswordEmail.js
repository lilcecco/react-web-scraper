import { useState } from 'react';
import { FiXOctagon, FiCheckCircle } from "react-icons/fi";

const ResetPasswordEmail = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault(e);

    // reset default
    setSuccessMessage('');
    setErrorMessage('');
    setEmail('')

    // send email
    const res = await fetch('/api/auth/reset-password-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

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
        <input type='submit' className='button btn-style-1' value='SEND' />
      </form>
    </div>
  );
}

export default ResetPasswordEmail;