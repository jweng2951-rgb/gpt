"use client";
import { useState } from "react";

export default function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [msg, setMsg] = useState("");

  async function login() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: u, password: p })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setMsg("登录成功，跳转...");
      // naive redirect based on role
      if (data.user.role === "ADMIN") window.location.href = "/admin";
      else window.location.href = "/sub";
    } else {
      setMsg("登录失败: " + (data.error || "unknown"));
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#081229,#1b0b3a)" }}>
      <div style={{ padding: 32, width: 420, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.6)", background: "linear-gradient(180deg, rgba(10,8,20,0.6), rgba(6,4,14,0.6))", color: "white" }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Nexus Music</h1>
        <input placeholder="用户名" onChange={e=>setU(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 8 }} />
        <input placeholder="密码" type="password" onChange={e=>setP(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 12 }} />
        <button onClick={login} style={{ width: "100%", padding: 10, borderRadius: 6, background: "linear-gradient(90deg,#6b21a8,#0ea5e9)", color: "white", border: "none" }}>登录</button>
        <p style={{ marginTop: 8 }}>{msg}</p>
        <p style={{ fontSize: 12, opacity: 0.8 }}>测试账号：admin/123456  test1/123456  test2/123456</p>
      </div>
    </div>
  );
}
