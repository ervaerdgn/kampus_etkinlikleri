import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function NotFoundPage() {
  return (
    <>
      <div className="ust-alan">
        <Header title="Sayfa Bulunamadı" subtitle="Aradığınız sayfa mevcut değil veya taşınmış olabilir." />
        <Navigation />
      </div>

      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--renk-ana)" }}>404</h2>
        <p style={{ marginBottom: "1.5rem", color: "var(--renk-metin)" }}>
          Ulaşmaya çalıştığınız adres sistemde bulunamadı.
        </p>
        <Link className="buton" to="/" style={{ textDecoration: "none" }}>
          Ana Sayfaya Dön
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;