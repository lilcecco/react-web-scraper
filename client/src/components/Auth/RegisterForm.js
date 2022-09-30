import { useState, useEffect } from "react";
import { FiXOctagon, FiCheckCircle } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';

const RegisterForm = ({ onToggle, onRegister, setProgress }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [btnValue, setBtnValue] = useState('SIGN UP');

    // spinner init
    useEffect(() => {
        const showSpinner = () => {
            setBtnValue('');
            spinner.classList.remove('hidden');
        }

        const hideSpinner = () => {
            setBtnValue('SIGN UP');
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

        // data check
        if (!email) return setErrorMessage('Email required');
        if (!password) return setErrorMessage('Password required');
        if (!confirmPassword) return setErrorMessage('Confirm password required');
        if (!/[\w.-]+@[a-z-]+\.[a-z]{2,3}/.test(email)) return setErrorMessage('Invalid email address');
        if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return setErrorMessage('Invalid password');
        if (password !== confirmPassword) return setErrorMessage('Passwords do not match');

        // show spinner
        document.dispatchEvent(new CustomEvent('busy', { detail: true }));

        const data = await onRegister({ id: uuidv4(), email, password, confirmPassword });

        // hide spinner
        document.dispatchEvent(new CustomEvent('busy', { detail: false }));

        // handle error
        if (data?.error) return setErrorMessage(data.error);

        // reset default
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');

        // set isRegistered as true
        sessionStorage.setItem('isRegistered', 'true');

        // move to login page
        window.location = '/auth/login';
    }

    return (
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
            <h1>SIGN UP</h1>
            <div className='sub'>Welcome! Please create a new account.</div>
            {errorMessage && <div className='error message-container'>
                <FiXOctagon className='message-icon' />
                <div className='message'>{errorMessage}</div>
            </div>}
            <div className='textbox'>
                <label htmlFor='email'>Email</label>
                <input
                    type='text' id='email' name='email' placeholder='Insert email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='textbox'>
                <label htmlFor='password'>Password</label>
                <input
                    type='password' id='password' name='password' placeholder='Insert password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='textbox'>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input
                    type='password' id='confirm-password' name='confirmPassword' placeholder='Confirm password'
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="button-container">
                <input type='submit' className='button btn-style-1' value={btnValue} />
                <div className="lds-dual-ring hidden"></div>
            </div>
            <div className='switch-auth-link'>
                Already sign?
                <span onClick={onToggle}> Login</span>
            </div>
        </form>
    );
}

export default RegisterForm;