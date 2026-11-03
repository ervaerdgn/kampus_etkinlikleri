import React from "react";
import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface Props {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText = "Etkinlik bulunamadı." }: Props) {
  if (events.length === 0) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="etkinlik-kapsayici">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;