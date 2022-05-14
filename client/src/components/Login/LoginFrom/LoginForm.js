import './LoginForm.css';

const LoginForm = () => {
    return (
        <form className='login-form'>
            <h1>LOGIN</h1>
            <div className='sub'>Welcome back! Please login your account.</div>
            <div className='textbox'>
                <label htmlFor='email'>EMAIL</label>
                <input type='text' id='email' name='email' placeholder='Insert email'></input>
            </div>
            <div className='textbox'>
                <label htmlFor='password'>PASSWORD</label>
                <input type='password' id='password' name='password' placeholder='Insert password'></input>
            </div>
            <div className='forgot-passwd'>Forgot password?</div>
            <input type='submit' className='button btn-style-1' value='LOGIN'></input>
            <div className='sign-up-link'>
                New user?
                <span> Sign up</span>
            </div>
        </form>
    );
}

export default LoginForm;