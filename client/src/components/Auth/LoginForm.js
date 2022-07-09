import { Link } from 'react-router-dom';
import { useState } from "react";
import { FiXOctagon } from "react-icons/fi";

const LoginForm = ({ onToggle, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await onLogin({ email, password });

        if (data?.error) return setMessage(data.error);

        // reset default
        setEmail('');
        setPassword('');
        setMessage('');

        if (data) window.location = '/private-area/account-details';
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
            <Link to='/reset-password/email'><div className='forgot-passwd'>Forgot password?</div></Link>
            <input type='submit' className='button btn-style-1' value='LOGIN' />
            <div className='switch-auth-link'>
                New user?
                <span onClick={onToggle}> Sign up</span>
            </div>
        </form>
    );
}

export default LoginForm;