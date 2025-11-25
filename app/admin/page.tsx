"use client";
import { useEffect, useState } from "react";
export default function AdminPage() {
  const [stats, setStats] = useState(null);
  useEffect(()=> {
    // fetch basic data
    fetch("/api/users").then(r=>r.json()).then(setStats);
  }, []);
  return (
    <div style={{ padding: 20, color: "white", background: "#05050a", minHeight: "100vh" }}>
      <h1>Admin Dashboard</h1>
      <p>用户列表:</p>
      <pre style={{ background: "#0b0b12", padding: 12, borderRadius: 8 }}>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
