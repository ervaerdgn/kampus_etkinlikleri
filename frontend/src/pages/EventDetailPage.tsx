
import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventDetail from "../components/events/EventDetail";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = events.find((e) => e.id === id);

  if (!event) return <NotFoundPage />;

  return (
    <>
      <div className="ust-alan">
        
        <Header title={event.title} subtitle={`${event.category} · ${event.location}`} />
        <Navigation />
      </div>
      <div style={{ padding: "1rem" }}>
        <EventDetail event={event} />
      </div>
    </>
  );
}
export default EventDetailPage;