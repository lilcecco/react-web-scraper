import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordToken = ({ token }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch('/api/auth/verify-reset-password-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });
      const data = await res.json();

      if (data?.error) return;

      setIsVerified(true);
      setUserId(data.userId);
    }

    verifyToken();
  }, [token]);

  return (
    <>
      {isVerified ? (
        <ResetPasswordForm userId={userId} />
      ) : (
        <div className='invalid-token'>
          <FiAlertTriangle className='icon' />
          <p>Access forbidden! Make sure that the link from the email is still valid or <Link to='/reset-password/email' style={{ textDecoration: 'underline' }}>send a new email.</Link></p>
        </div>
      )}
    </>
  );
}

export default ResetPasswordToken;