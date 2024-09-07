import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import { signup } from '../api/auth';  // Import the signup API call

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('team member');  // Default role is team member
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const userData = { name, email, password, role };
      const data = await signup(userData);

      if (data.message === 'User registered') {
        setSuccessMessage('Signup successful! Please login.');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/login');  // Redirect to login after successful signup
        }, 2000);
      } else {
        setErrorMessage(data.error || 'Signup failed, please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Signup failed, please check your details.');
      setSuccessMessage('');
      console.log("hello")
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="team member">Team Member</option>
            <option value="team leader">Team Leader</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
