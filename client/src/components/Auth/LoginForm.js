import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onToggle, setToken }) => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        // reset default
        setEmail('');
        setPassword('');

        if (data?.error) {
            alert(data.error);
            return;
        }

        setToken(data);

        navigate('/');
    }

    return (
        <form className='auth-form' onSubmit={(e) => onSubmit(e)}>
            <h1>LOGIN</h1>
            <div className='sub'>Welcome back! Please login your account.</div>
            <div className='textbox'>
                <label htmlFor='email'>EMAIL</label>
                <input
                    type='text' id='email' name='email' placeholder='Insert email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='textbox'>
                <label htmlFor='password'>PASSWORD</label>
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