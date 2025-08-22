"use client"
import React from 'react'
import globalData from '../../../assets/global.json';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/context/AppContext";


function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState<boolean|null>(null);

  const {setIsAdmin } = useAppContext();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsValid(null);
  };

  const handleValidate = async () => {
    try {
      const res = await fetch("/api/validate-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      setIsValid(result.success);
      if (result.success) {
        setIsAdmin(true);
        router.push("/dashboard");
      }
    } catch (err) {
      setIsValid(false);
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