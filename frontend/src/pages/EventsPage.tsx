
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import EventFilter from "../components/events/EventFilter";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))] as Category[];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <div className="ust-alan">
        <Header title="Tüm Etkinlikler" subtitle="Ekim ayında kampüste düzenlenen etkinlikler." />
        <Navigation />
      </div>
      <div style={{ padding: "1rem" }}>
        <EventFilter
          searchText={searchText}
          category={category}
          categories={categories}
          onSearchChange={setSearchText}
          onCategoryChange={setCategory}
        />
        {filtered.length > 0 && <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
        <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
      </div>
    </>
  );
}
export default EventsPage;