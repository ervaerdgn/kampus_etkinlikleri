import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

const ALANLAR = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

const mode = form.dataset.mode; // güncelleme sayfasında "guncelle"
const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

// Bir alanın altına hata yaz (boşsa temizle) ve kırmızı yap
function alanHatasiYaz(ad, metin) {
  const alan = form.elements[ad];
  document.querySelector(`#${ad}-hata`).textContent = metin;
  if (metin) {
    alan.setAttribute("aria-invalid", "true");
  } else {
    alan.removeAttribute("aria-invalid");
  }
}

// Nesneyi kurallarla kontrol et, hataları topla
function dogrula(data) {
  const errors = {};

  if (data.title.length < 3) {
    errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  }
  if (!data.category) {
    errors.kategori = "Bir kategori seçin.";
  }
  if (!data.date) {
    errors.tarih = "Tarih seçin.";
  }
  if (!data.time) {
    errors.saat = "Saat seçin.";
  }
  if (!data.location) {
    errors.yer = "Yer bilgisini yazın.";
  }
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }

  return errors;
}

// Etkinliğin bilgileriyle formu doldur
function doldur(e) {
  const [gun, ay, yil] = e.date.split("-"); // "12-10-2026"
  form.elements.ad.value = e.title;
  form.elements.kategori.value = e.category;
  form.elements.tarih.value = `${yil}-${ay}-${gun}`; // date alanı "2026-10-12" ister
  form.elements.saat.value = e.time;
  form.elements.yer.value = e.location;
  form.elements.kontenjan.value = e.capacity ?? "";
  form.elements.aciklama.value = e.description;
}

function formuBagla() {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // sayfa yenilenmesin

    const fd = new FormData(form);
    const kontenjan = fd.get("kontenjan").trim();

    // Formdaki Türkçe name'ler -> data.js'teki İngilizce alan adları
    const data = {
      id: mode === "guncelle" ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: kontenjan === "" ? null : Number(kontenjan),
      description: fd.get("aciklama").trim(),
    };

    const errors = dogrula(data);

    // Her alan için: hata varsa yaz, düzeltilmişse eski hatayı temizle
    ALANLAR.forEach((ad) => alanHatasiYaz(ad, errors[ad] || ""));

    if (Object.keys(errors).length > 0) {
      mesaj.className = "form-mesaj hata-kutusu";
      mesaj.textContent = "Formda hatalı alanlar var.";
      form.elements[Object.keys(errors)[0]].focus(); // ilk hatalı alana git
      return;
    }

    const durum = mode === "guncelle" ? "güncellendi" : "oluşturuldu";
    mesaj.className = "form-mesaj basari-kutusu";
    mesaj.innerHTML = `<p>Etkinlik ${durum} (bu sprintte kaydedilmez):</p><pre></pre>`;
    mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
  });
}

if (mode === "guncelle" && !etkinlik) {
  // id yok ya da yanlış: boş form yerine uyarı göster
  form.outerHTML = `
    <div class="hata-kutusu">
      Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin,
      detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
    </div>
    <div class="butonlar">
      <a class="buton" href="etkinlikler.html">Etkinliklere git</a>
    </div>`;
  mesaj.remove();
} else {
  if (mode === "guncelle") {
    doldur(etkinlik);
  }
  formuBagla();
}