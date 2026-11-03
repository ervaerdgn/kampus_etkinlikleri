import React from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  return (
    <>
      <div className="ust-alan">
        <Header title="Etkinlik Yönetimi" subtitle="Mevcut etkinlikleri düzenleyin veya yeni etkinlik ekleyin." />
        <Navigation />
      </div>

      <div style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Link className="buton" to="/admin/new">+ Yeni etkinlik</Link>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", border: "1px solid var(--renk-kenar)", borderRadius: "var(--kose)" }}>
          <thead>
            <tr style={{ background: "var(--renk-ana)", color: "white", textAlign: "left" }}>
              <th style={{ padding: "0.75rem" }}>Etkinlik</th>
              <th style={{ padding: "0.75rem" }}>Tarih</th>
              <th style={{ padding: "0.75rem" }}>Kategori</th>
              <th style={{ padding: "0.75rem" }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} style={{ borderBottom: "1px solid var(--renk-kenar)" }}>
                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>{event.title}</td>
                <td style={{ padding: "0.75rem" }}>{event.date}</td>
                <td style={{ padding: "0.75rem" }}>{event.category}</td>
                <td style={{ padding: "0.75rem", display: "flex", gap: "0.5rem" }}>
                  <Link 
                    to={`/admin/${event.id}/edit`} 
                    className="buton" 
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem", textDecoration: "none" }}
                  >
                    Düzenle
                  </Link>
                  <button 
                    onClick={() => deleteEvent(event.id)} 
                    style={{ background: "crimson", padding: "0.4rem 0.8rem", fontSize: "0.9rem", border: "0", color: "white", borderRadius: "var(--kose)", cursor: "pointer" }}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPage;