import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FiXOctagon } from "react-icons/fi";

const LoginForm = ({ onToggle, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [btnValue, setBtnValue] = useState('LOGIN');

    // spinner init
    useEffect(() => {
        const showSpinner = () => {
          setBtnValue('');
          spinner.classList.remove('hidden');
        }
    
        const hideSpinner = () => {
          setBtnValue('LOGIN');
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
        e.preventDefault();

        // show spinner
        document.dispatchEvent(new CustomEvent('busy', { detail: true }));

        const data = await onLogin({ email, password });

        // hide spinner
        document.dispatchEvent(new CustomEvent('busy', { detail: false }));

        // handle error
        if (data?.error) return setMessage(data.error);

        // reset default
        setEmail('');
        setPassword('');
        setMessage('');

        window.location = '/private-area/account-details';
        
        // remove isRegistered item from sessionStorage (if exists)
        sessionStorage.removeItem('isRegistered');
    }

    return (
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
            <h1>LOGIN</h1>
            <div className='sub'>Welcome back! Please login your account.</div>
            {message && <div className='error message-container'>
                <FiXOctagon className='message-icon' />
                <div className='message'>{message}</div>
            </div>}
            <div className='textbox'>
                <label htmlFor='email'>Email</label>
                <input
                    type='text' id='email' name='email' placeholder='Enter your email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='textbox'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password' id='password' name='password' placeholder='Enter password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Link to='/reset-password/email'><div className='forgot-passwd'>Forgot password?</div></Link>
            <div className="button-container">
                <input type='submit' className='button btn-style-1' value={btnValue} />
                <div className="lds-dual-ring hidden"></div>
            </div>
            <div className='switch-auth-link'>
                New user?
                <span onClick={onToggle}> Sign up</span>
            </div>
        </form>
    );
}

export default LoginForm;