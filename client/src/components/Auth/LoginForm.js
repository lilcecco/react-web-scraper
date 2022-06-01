import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onToggle, onLogin }) => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = await onLogin({ email, password });

        // reset default
        setEmail('');
        setPassword('');

        if (data) navigate('/processes-history');
    }

    return (
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
            <h1>LOGIN</h1>
            <div className='sub'>Welcome back! Please login your account.</div>
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
            <div className='forgot-passwd'>Forgot password?</div>
            <input type='submit' className='button btn-style-1' value='LOGIN' />
            <div className='switch-auth-link'>
                New user?
                <span onClick={onToggle}> Sign up</span>
            </div>
        </form>
    );
}

export default LoginForm;