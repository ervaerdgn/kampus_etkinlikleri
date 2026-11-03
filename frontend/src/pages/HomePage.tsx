import React from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <>
      <div className="ust-alan">
        <Header title="Kampüs Etkinlikleri" subtitle="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." />
        <Navigation />
      </div>
      <div style={{ padding: "1rem" }}>
        <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
        <EventList events={upcoming} />
        <div className="butonlar">
          <Link className="buton" to="/events">Tüm etkinlikleri gör</Link>
        </div>
      </div>
    </>
  );
}
export default HomePage;