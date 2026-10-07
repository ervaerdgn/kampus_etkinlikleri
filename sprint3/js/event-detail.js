import { events } from "./data.js";

function toDate(text) {
  const [gun, ay, yil] = text.split("-");
  return new Date(yil, ay - 1, gun);
}

function formatDate(text) {
  return toDate(text).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Afişi olan etkinlikler (id -> dosya adı)
const posters = {
  "event-1": "kariyer-gunleri.jpg",
};

const container = document.querySelector("#detay");
const baslik = document.querySelector("#sayfa-baslik");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <div class="hata-kutusu">
      ${id ? `"${id}" numaralı bir etkinlik yok.` : "Bir etkinlik seçilmedi."}
      Listeden bir etkinlik seçin.
    </div>
    <div class="butonlar">
      <a class="buton" href="etkinlikler.html">&larr; Listeye dön</a>
    </div>`;
} else {
  document.title = event.title;
  baslik.textContent = event.title;

  const afis = posters[event.id]
    ? `<div class="afis-alani">
         <img src="${posters[event.id]}" alt="${event.title} afişi">
         <p><em>Şekil 1: ${event.title} afişi</em></p>
       </div>`
    : "";

  container.innerHTML = `
    <div class="detay-kapsayici">
      ${afis}
      <div class="kunye-alani">
        <h2>Etkinlik Künyesi</h2>
        <dl class="etkinlik-kunyesi">
          <dt>Tarih</dt>
          <dd>${formatDate(event.date)}, ${event.time}</dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
      </div>
    </div>
    <h2>Açıklama</h2>
    <p>${event.description}</p>
    <div class="butonlar">
      <a class="buton" href="etkinlikler.html">&larr; Listeye dön</a>
      <a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </div>`;
}