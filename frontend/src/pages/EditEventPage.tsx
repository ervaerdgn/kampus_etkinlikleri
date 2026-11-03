import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";

function EditEventPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const eventToEdit = events.find((e) => e.id === id);

  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : "");
  const [category, setCategory] = useState(eventToEdit ? eventToEdit.category : "");
  const [date, setDate] = useState(eventToEdit ? eventToEdit.date : "");
  const [time, setTime] = useState(eventToEdit ? eventToEdit.time : "");
  const [location, setLocation] = useState(eventToEdit ? eventToEdit.location : "");
  const [description, setDescription] = useState(eventToEdit ? eventToEdit.description : "");
  const [capacity, setCapacity] = useState(eventToEdit ? String(eventToEdit.capacity) : "");

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setCategory(eventToEdit.category);
      setDate(eventToEdit.date);
      setTime(eventToEdit.time);
      setLocation(eventToEdit.location);
      setDescription(eventToEdit.description);
      setCapacity(String(eventToEdit.capacity));
    }
  }, [eventToEdit]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    updateEvent(id, {
      title,
      category,
      date,
      time,
      location,
      description,
      capacity,
    });

    navigate("/admin");
  }

  if (!eventToEdit) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Etkinlik bulunamadı.</div>;
  }

  return (
    <>
   
      <div className="ust-alan">
        <Header title={eventToEdit.title} subtitle={`${eventToEdit.category} · ${eventToEdit.location}`} />
        <Navigation />
      </div>

      <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Etkinlik Güncelle</h2>

        <form onSubmit={handleSubmit} className="kart">
          <div className="alan">
            <label>Etkinlik Başlığı *</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          <div className="alan">
            <label>Kategori</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              required 
            />
          </div>

          <div className="alan">
            <label>Tarih *</label>
            <input 
              type="text" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>

          <div className="alan">
            <label>Saat</label>
            <input 
              type="text" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>

          <div className="alan">
            <label>Yer *</label>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required 
            />
          </div>

          <div className="alan">
            <label>Kontenjan</label>
            <input 
              type="number" 
              value={capacity} 
              onChange={(e) => setCapacity(e.target.value)} 
            />
          </div>

          <div className="alan">
            <label>Açıklama</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={4}
            />
          </div>

          <button type="submit" style={{ marginTop: "1rem" }}>Güncelle</button>
        </form>
      </div>
    </>
  );
}

export default EditEventPage;