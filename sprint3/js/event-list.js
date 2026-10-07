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

function createCard(event) {
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p>${event.category} · ${formatDate(event.date)}</p>
    <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
  </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  
  const yaklasan = [...events]
    .sort((a, b) => toDate(a.date) - toDate(b.date))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  
  const form = document.querySelector("#filtre-formu");
  const arama = document.querySelector("#arama");
  const kategoriFiltre = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriler.forEach((kategori) => {
    kategoriFiltre.innerHTML += `<option value="${kategori}">${kategori}</option>`;
  });

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriFiltre.value;

    const sonuc = events.filter((e) => {
      const metinUyuyor =
        e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
        e.category.toLocaleLowerCase("tr-TR").includes(aranan) ||
        e.description.toLocaleLowerCase("tr-TR").includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriFiltre.addEventListener("change", filtrele);
  form.addEventListener("submit", (e) => e.preventDefault());

  filtrele(); 
}