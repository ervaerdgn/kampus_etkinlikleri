import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const titles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

const subtitles: Partial<Record<PageName, string>> = {
  home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  events: "Ekim ayında kampüste düzenlenen etkinlikler.",
};

// Filtre için: veride geçen kategoriler (her biri bir kez)
const categories: Category[] = [...new Set(events.map((e) => e.category))];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Ana sayfa: tarihi en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfası: filtreli liste
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Detay sayfası: seçili etkinlik
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sayfa başlığı
  const title =
    page === "detail"
      ? selected
        ? selected.title
        : "Etkinlik bulunamadı"
      : titles[page];

  // Sekme adı başlıkla birlikte değişsin
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <div className="ust-alan">
        <Header title={title} text={subtitles[page]} />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList
              events={upcoming}
              onShowDetail={(id) => go("detail", id)}
            />
            <div className="butonlar">
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </div>
            <div className="butonlar">
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                &larr; Listeye dön
              </a>
            </div>
          </>
        )}

        {(page === "add" || page === "update") && (
          <EventForm
            onSubmit={() => window.scrollTo(0, 0)}
            submitText={page === "add" ? "Kaydet" : "Güncelle"}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;