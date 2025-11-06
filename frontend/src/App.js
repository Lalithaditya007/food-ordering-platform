import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"#222", color:"#fff" }}>
      <div style={{ width:"300px", padding:"20px", background:"#333", borderRadius:"8px" }}>
        <h2 style={{ textAlign:"center" }}>Login</h2>
        <input
          style={{ width:"100%", padding:"10px", marginTop:"10px" }}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width:"100%", padding:"10px", margin:"10px 0" }}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ width:"100%", padding:"10px", background:"#007bff", color:"#fff", border:"none", borderRadius:"4px" }}
          onClick={login}
        >
          Login
        </button>
        {response && <pre style={{ marginTop:"10px" }}>{response}</pre>}
      </div>
    </div>
  );
}

export default App;

