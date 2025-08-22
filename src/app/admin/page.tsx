"use client"
import React from 'react'
import globalData from '../../../assets/global.json';
import { useState } from 'react';


function AdminPage() {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean|null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsValid(null);
  };

  const handleValidate = () => {
    const valid = password === globalData.validationPasswd;
    setIsValid(valid);
    if (valid) {
      // Redirect to admin dashboard or perform other actions
      alert('Password is valid. Redirecting to admin dashboard...');

      // Redirect to the admin dashboard
      window.location.href = `/dashboard`;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter password"
        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', width: '220px' }}
      />
      <button
        onClick={handleValidate}
        style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '4px', background: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        Validate
      </button>
      {isValid === true && <div style={{ color: 'green' }}>Password is correct!</div>}
      {isValid === false && <div style={{ color: 'red' }}>Invalid password.</div>}
    </div>
  );
}

export default AdminPage;