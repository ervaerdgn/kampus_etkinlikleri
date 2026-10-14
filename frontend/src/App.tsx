import { useEffect, useState, type MouseEvent } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const titles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

function formatDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categories: Category[] = [...new Set(events.map((e) => e.category))];

const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function link(next: PageName, id: string | null = null) {
    return (e: MouseEvent) => {
      e.preventDefault();
      go(next, id);
    };
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const title =
    page === "detail"
      ? selected
        ? selected.title
        : "Etkinlik bulunamadı"
      : titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.category}</p>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href="#" onClick={link("detail", event.id)}>
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={link(item.page)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-kapsayici">
              {upcoming.map(renderCard)}
            </section>
            <div className="butonlar">
              <a className="buton" href="#" onClick={link("events")}>
                Tüm etkinlikleri gör
              </a>
            </div>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-kapsayici">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </div>
            <div className="butonlar">
              <a className="buton" href="#" onClick={link("events")}>
                &larr; Listeye dön
              </a>
            </div>
          </>
        )}

        {page === "detail" && selected && (
          <>
            <div className="detay-kapsayici">
              {selected.image && (
                <figure className="afis-alani">
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>
                    <em>{selected.title} afişi</em>
                  </figcaption>
                </figure>
              )}
              <div className="kunye-alani">
                <h2>Etkinlik Künyesi</h2>
                <dl className="etkinlik-kunyesi">
                  <dt>Tarih</dt>
                  <dd>
                    {formatDate(selected.date)}, {selected.time}
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </div>
            </div>
            <h2>Açıklama</h2>
            <p>{selected.description}</p>
            <div className="butonlar">
              <a className="buton" href="#" onClick={link("events")}>
                &larr; Listeye dön
              </a>
              <a
                className="buton"
                href="#"
                onClick={link("update", selected.id)}
              >
                Bu etkinliği güncelle
              </a>
            </div>
          </>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <form
              className="etkinlik-formu"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="alan">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </div>

              <div className="alan">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {formCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="alan">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>

              <div className="alan">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>

              <div className="alan">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>

              <div className="alan">
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" min={1} max={1000} />
              </div>

              <div className="alan">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>

              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer>Erva Erdoğan - 2026</footer>
    </>
  );
}

export default App;