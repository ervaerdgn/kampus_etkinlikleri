import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const navigate = useNavigate();

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    let isValid = true;

    if (name.trim().length < 3) {
      setNameError("Ad soyad en az 3 karakter olmalı.");
      isValid = false;
    } else {
      setNameError("");
    }

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

    if (password !== confirmPassword) {
      setConfirmError("Şifreler birbiriyle eşleşmiyor.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    if (isValid) {
      navigate("/admin");
    }
  }

  return (
    <>
      <div className="ust-alan">
        <Header title="Kayıt Ol" subtitle="Yeni bir hesap oluşturun." />
        <Navigation />
      </div>

      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
        <form onSubmit={handleRegister} className="kart" noValidate>
          
          <div className="alan">
            <label>Ad Soyad</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={nameError ? "hata" : ""}
            />
            {nameError && <span className="alan-hata">{nameError}</span>}
          </div>

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

          <div className="alan">
            <label>Şifre (tekrar)</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className={confirmError ? "hata" : ""}
            />
            {confirmError && <span className="alan-hata">{confirmError}</span>}
          </div>

          <button type="submit" style={{ width: "100%", marginTop: "1rem" }}>Kayıt ol</button>
        </form>
        
        <p style={{ marginTop: "1.5rem", textAlign: "center" }}>
          Zaten hesabın var mı? <Link to="/login" style={{ color: "var(--renk-ana)", fontWeight: "bold", textDecoration: "none" }}>Giriş yap</Link>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;