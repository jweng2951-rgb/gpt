"use client";
import { useEffect, useState } from "react";
export default function SubPage() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);
  return (
    <div style={{ padding: 20, color: "white", background: "#020316", minHeight: "100vh" }}>
      <h1>子账户仪表盘</h1>
      <pre style={{ background: "#071028", padding: 12, borderRadius: 8 }}>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
