import { useState } from "react";
import { FiXOctagon } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';

const RegisterForm = ({ onToggle, onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        // data check
        if (!email) return setMessage('Email required');
        if (!password) return setMessage('Password required');
        if (!confirmPassword) return setMessage('Confirm password required');
        if (!/[\w.-]+@[a-z-]+\.[a-z]{2,3}/.test(email)) return setMessage('Invalid email address');
        if (password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return setMessage('Invalid password');
        if (password !== confirmPassword) return setMessage('Passwords do not match');

        const data = await onRegister({ id: uuidv4(), email, password, confirmPassword });

        if (data?.error) return setMessage(data.error);

        // reset default
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMessage('');

        if (data) {
            alert(data.message);
            onToggle();
        }
    }

    return (
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
            <h1>SIGN UP</h1>
            <div className='sub'>Welcome! Please create a new account.</div>
            {message && <div className='error message-container'>
                <FiXOctagon className='message-icon' />
                <div className='message'>{message}</div>
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
            <input type='submit' className='button btn-style-1' value='SIGN UP' />
            <div className='switch-auth-link'>
                Already sign?
                <span onClick={onToggle}> Login</span>
            </div>
        </form>
    );
}

export default RegisterForm;