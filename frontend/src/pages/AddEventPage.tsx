import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../context/EventsContext";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventFormData) {
    addEvent(data);
    navigate("/admin"); 
  }

  return (
    <>
      <h2 className="bolum-baslik">Yeni Etkinlik Ekle</h2>
      <EventForm onSubmit={handleSubmit} submitText="Kaydet" />
    </>
  );
}

export default AddEventPage;