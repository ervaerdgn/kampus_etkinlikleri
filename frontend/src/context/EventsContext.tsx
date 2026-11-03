import React, { createContext, useContext, useState } from 'react';
import { events as initialEvents } from '../data/events';
import type { CampusEvent } from '../types/campus-event';

export interface EventFormData {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
}

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    const newEvent = {
      id: "event-" + Date.now(),
      title: data.title,
      category: data.category,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
      capacity: Number(data.capacity) || 0,
    } as CampusEvent;

    setEvents((prev) => [newEvent, ...prev]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? ({
              ...e,
              title: data.title,
              category: data.category,
              date: data.date,
              time: data.time,
              location: data.location,
              description: data.description,
              capacity: Number(data.capacity) || 0,
            } as CampusEvent)
          : e
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("Provider yok");
  return value;
}