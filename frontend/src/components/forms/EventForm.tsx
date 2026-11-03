import React, { useState } from "react";
import type { EventFormData } from "../../context/EventsContext";

interface Props {
  initialValues?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  submitText: string;
}

const defaultValues: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  description: "",
  capacity: "",
};

function EventForm({ initialValues = defaultValues, onSubmit, submitText }: Props) {
  const [formData, setFormData] = useState<EventFormData>(initialValues);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }
    setError("");
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="kart">
      {error && <div className="hata-kutusu">{error}</div>}
      
      <div className="alan">
        <label>Etkinlik Başlığı *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="alan">
        <label>Kategori</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} />
      </div>

      <div className="alan">
        <label>Tarih *</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>

      <div className="alan">
        <label>Saat</label>
        <input type="text" name="time" value={formData.time} onChange={handleChange} />
      </div>

      <div className="alan">
        <label>Yer *</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </div>

      <div className="alan">
        <label>Kontenjan</label>
        <input type="text" name="capacity" value={formData.capacity} onChange={handleChange} />
      </div>

      <div className="alan">
        <label>Açıklama</label>
        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} />
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;