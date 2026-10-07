
const etkinlikler = [
    { ad: "Kariyer Günleri", kategori: "Seminer", tarih: "12 Ekim" },
    { ad: "Robotik Atölyesi", kategori: "Atölye", tarih: "20 Ekim" },
    { ad: "Siber Güvenlik", kategori: "Söyleşi", tarih: "27 Ekim" }
];
const listeKutusu = document.getElementById("etkinlikListesi");

etkinlikler.forEach(function(etkinlik) {
    listeKutusu.innerHTML += `
        <article class="kart">
            <h3>${etkinlik.ad}</h3>
            <p>${etkinlik.kategori} · ${etkinlik.tarih}</p>
            <a href="etkinlik-detay.html">Detayları gör &rarr;</a>
        </article>
    `;
});