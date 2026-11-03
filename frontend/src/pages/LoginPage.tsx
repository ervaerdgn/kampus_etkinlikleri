import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    let isValid = true;

    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Geçerli bir e-posta girin.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Şifre en az 6 karakter olmalı.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      navigate("/admin");
    }
  }

  return (
    <>
      <div className="ust-alan">
        <Header title="Giriş Yap" subtitle="Yönetim paneline erişmek için giriş yapın." />
        <Navigation />
      </div>

      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
        <form onSubmit={handleLogin} className="kart" noValidate>
          
          <div className="alan">
            <label>E-posta</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={emailError ? "hata" : ""}
            />
            {emailError && <span className="alan-hata">{emailError}</span>}
          </div>

          <div className="alan">
            <label>Şifre</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={passwordError ? "hata" : ""}
            />
            {passwordError && <span className="alan-hata">{passwordError}</span>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <Link to="/forgot-password" style={{ fontSize: "0.9rem", color: "var(--renk-ana)", textDecoration: "none" }}>
              Şifremi unuttum?
            </Link>
          </div>

          <button type="submit" style={{ width: "100%" }}>Giriş yap</button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
          Hesabın yok mu? <Link to="/register" style={{ color: "var(--renk-ana)", fontWeight: "bold", textDecoration: "none" }}>Kayıt ol</Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;