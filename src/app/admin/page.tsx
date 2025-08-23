"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/context/AppContext";
import globalData from "@/assets/global.json";


function AdminPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [registerMode, setRegisterMode] = useState(false);
  const [registerStatus, setRegisterStatus] = useState<string | null>(null);
  const { setIsAdmin } = useAppContext();
  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

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
        router.push("/dashboard");
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