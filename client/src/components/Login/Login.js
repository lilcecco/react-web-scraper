import LoginForm from './LoginFrom';
import './Login.css';

const Login = () => {
    return (
        <main className='login-container'>
            <div className='login-bg'>
                <img className='img-res' src='/img/blue-waves.jpg' alt=''></img>
            </div>
            <div className='login-form-container'>
                <LoginForm />
            </div>
        </main>
    );
}

export default Login;