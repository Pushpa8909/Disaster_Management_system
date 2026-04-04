import React, { useState } from "react";
import "./Login.css";

function Login({ setRole }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      selectedRole === "admin" &&
      username === "Pushpa" &&
      password === "AMSD"
    ) {
      setRole("admin");
    } else if (
      selectedRole === "user" &&
      username === "Pravallika" &&
      password === "Aditya"
    ) {
      setRole("user");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-wrapper">

      <div className="overlay"></div>

      <div className="login-center">
        <div className="login-card">

          <h1 className="title">🌍 Disaster Management Portal</h1>

          {!selectedRole ? (
            <>
              <p className="subtitle">Select your role to continue</p>

              <button
                className="role-btn user"
                onClick={() => setSelectedRole("user")}
              >
                Continue as User
              </button>

              <button
                className="role-btn admin"
                onClick={() => setSelectedRole("admin")}
              >
                Continue as Admin
              </button>
            </>
          ) : (
            <>
              <h2>
                {selectedRole === "admin"
                  ? "Admin Login"
                  : "User Login"}
              </h2>

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="login-btn" onClick={handleLogin}>
                Login
              </button>

              <p
                className="back-link"
                onClick={() => setSelectedRole(null)}
              >
                ← Change Role
              </p>
            </>
          )}

        </div>
      </div>

    </div>
  );
}

export default Login;