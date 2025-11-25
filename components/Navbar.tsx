"use client";
export default function Navbar({title}:{title?:string}) {
  return (
    <div style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent" }}>
      <div style={{ fontWeight: 700 }}>{title || "Nexus Music"}</div>
      <div>
        <button onClick={()=>{ localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href="/login"; }} style={{ padding: "6px 10px", borderRadius: 6 }}>退出登录</button>
      </div>
    </div>
  );
}
