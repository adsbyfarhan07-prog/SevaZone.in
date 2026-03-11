import { useState } from "react";

export default function SevaZone() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (mobile === "8307950410" && password === "seva123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif" }}>
      {!isLoggedIn ? (
        <div style={{ width: "100%", maxWidth: "400px", background: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>SevaZone</h1>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555" }}>Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="8307950410"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px"
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="seva123"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px"
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              background: "#00C9A7",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Login
          </button>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "800px", background: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <h1 style={{ color: "#333", marginBottom: "20px" }}>Welcome to SevaZone Dashboard</h1>
          <p style={{ color: "#666", marginBottom: "20px" }}>User Mobile: {mobile}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px", color: "#333" }}>Wallet Balance</h3>
              <p style={{ margin: "0", fontSize: "24px", color: "#00C9A7", fontWeight: "bold" }}>₹2,450</p>
            </div>
            <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px", color: "#333" }}>Total Transactions</h3>
              <p style={{ margin: "0", fontSize: "24px", color: "#00C9A7", fontWeight: "bold" }}>84</p>
            </div>
            <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px", color: "#333" }}>Monthly Revenue</h3>
              <p style={{ margin: "0", fontSize: "24px", color: "#00C9A7", fontWeight: "bold" }}>₹18,320</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: "12px 24px",
              background: "#ff6b6b",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
