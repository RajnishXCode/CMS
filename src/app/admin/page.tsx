"use client"
import React, { use, useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/context/AppContext";
import globalData from "@/assets/global.json";


function AdminPage() {
  const router = useRouter();
  const { isAdmin,setIsAdmin, isAuthLoading } = useAppContext();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [registerMode, setRegisterMode] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<string | null>(null);
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading && isAdmin) {
      router.push("/admin/dashboard");
    }
  }, [isAdmin, isAuthLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    setIsValid(null);
    setRegisterStatus(null);
  };

  const handleValidate = async () => {
    try {
      const res = await fetch("/api/validate-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, domain, project: globalData.projectType }),
      });
      const result = await res.json();
      setIsValid(result.success);
      if (result.success) {
        setIsAdmin(true);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setIsValid(false);
    }
  };

  const handleRegister = async () => {
    setRegisterStatus(null);
    try {
      const res = await fetch("/api/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, domain, project: globalData.projectType }),
      });
      const result = await res.json();
      if (result.success) {
        setRegisterStatus("Admin record created successfully!");
      } else {
        setRegisterStatus(result.message || "Failed to create admin record.");
      }
    } catch (err) {
      setRegisterStatus("Server error.");
    }
  };

  if (isAuthLoading || isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
            <rect x="10" y="10" width="40" height="40" rx="8" fill="#0070f3" />
            <circle cx="20" cy="20" r="4" fill="#fff" />
            <circle cx="40" cy="20" r="4" fill="#fff" />
            <circle cx="20" cy="40" r="4" fill="#fff" />
            <circle cx="40" cy="40" r="4" fill="#fff" />
            <circle cx="30" cy="30" r="4" fill="#fff" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginTop: "40px" }}>
      <h2>Admin Login</h2>
      <div style={{ marginBottom: "8px", color: "#555" }}>Current domain: <b>{domain}</b></div>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        placeholder="Enter username or email"
        style={{ padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc", width: "220px" }}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Enter password"
        style={{ padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc", width: "220px" }}
      />
      {!registerMode ? (
        <>
          <button
            onClick={handleValidate}
            style={{ padding: "8px 16px", fontSize: "16px", borderRadius: "4px", background: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}
          >
            Validate
          </button>
          <button
            onClick={() => setRegisterMode(true)}
            style={{ padding: "8px 16px", fontSize: "16px", borderRadius: "4px", background: "#888", color: "#fff", border: "none", cursor: "pointer", marginLeft: "8px" }}
          >
            Register Admin
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleRegister}
            style={{ padding: "8px 16px", fontSize: "16px", borderRadius: "4px", background: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}
          >
            Create Admin Record
          </button>
          <button
            onClick={() => setRegisterMode(false)}
            style={{ padding: "8px 16px", fontSize: "16px", borderRadius: "4px", background: "#888", color: "#fff", border: "none", cursor: "pointer", marginLeft: "8px" }}
          >
            Cancel
          </button>
        </>
      )}
      {isValid === true && <div style={{ color: "green" }}>Password is correct!</div>}
      {isValid === false && <div style={{ color: "red" }}>Invalid password.</div>}
      {registerStatus && <div style={{ color: registerStatus.includes("success") ? "green" : "red" }}>{registerStatus}</div>}
    </div>
  );
}

export default AdminPage;