import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Geçerli bir e-posta girin.");
      return;
    }
    setEmailError("");
    setSent(true);
  }

  return (
    <>
      <div className="ust-alan">
        <Header title="Şifremi Unuttum" subtitle="Şifrenizi güvenle sıfırlayın." />
        <Navigation />
      </div>

      <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
        <div className="kart">
          <p style={{ marginBottom: "1.5rem", color: "var(--renk-metin)" }}>
            Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
          </p>

          {sent ? (
            <div className="basari-kutusu">
              Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
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

              <button type="submit" style={{ width: "100%", marginTop: "1rem" }}>Bağlantı gönder</button>
            </form>
          )}

          <div style={{ marginTop: "1.5rem", textAlign: "left" }}>
            <Link to="/login" style={{ color: "var(--renk-ana)", fontWeight: "bold", textDecoration: "none" }}>
              &larr; Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;