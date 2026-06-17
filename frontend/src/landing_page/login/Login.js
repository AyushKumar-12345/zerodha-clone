import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username.trim()) {
      // FIX: Pass the username securely through a URL query parameter 
      // to cross the browser's port isolation boundary!
      const cleanUser = encodeURIComponent(username.trim());
      window.location.assign(`http://localhost:3001/?loginUser=${cleanUser}`);
    } else {
      window.location.assign("http://localhost:3001");
    }
  };

  return (
    <div className="container my-5 py-5 d-flex justify-content-center">
      <div className="card p-5 shadow-sm border rounded-3" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="fs-3 text-dark fw-normal mb-4 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label text-secondary small fw-medium">Username</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted border-end-0 rounded-0">
                <i className="fa fa-user-o" aria-hidden="true"></i>
              </span>
              <input 
                type="text" 
                className="form-control rounded-0 px-3 py-2 border-start-0"
                style={{ boxShadow: "none" }}
                placeholder="Enter your username"
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-medium">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light text-muted border-end-0 rounded-0">
                <i className="fa fa-key" aria-hidden="true"></i>
              </span>
              <input 
                type="password" 
                className="form-control rounded-0 px-3 py-2 border-start-0"
                style={{ boxShadow: "none" }}
                placeholder="Enter your password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fs-6 fw-medium text-white rounded-1" 
            style={{ backgroundColor: "#387ed1", border: "none" }}
          >
            Login
          </button>

        </form>
        
        <p className="mt-4 text-center text-muted small mb-0">
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-decoration-none fw-medium" style={{ color: "#387ed1" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;