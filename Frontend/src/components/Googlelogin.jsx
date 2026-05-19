import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../authSlice'; // Adjust path to your authSlice
import { useEffect } from 'react';

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user, isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // Redirect to home or dashboard after successful login
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = async (credentialResponse) => {
    console.log('Login successful:', credentialResponse);
    
    const token = credentialResponse.credential;

    try {
      // Dispatch the googleLogin thunk
      const result = await dispatch(googleLogin(token)).unwrap();
      
      console.log('Backend response:', result);
      console.log('User data:', result);
      
      // Navigate after successful login
      // navigate('/dashboard'); // Or your home route
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  // If already logged in, show user info

  return (
    <div className="login-container">
      <h1>Login</h1>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      )}
    </div>
  );
}

export default LoginComponent;