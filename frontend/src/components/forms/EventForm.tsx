import type { Category } from "../../types/campus-event";

// Form için: geçerli 4 kategorinin hepsi
const formCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  onSubmit: () => void;
  submitText?: string;
}

function EventForm({ onSubmit, submitText = "Kaydet" }: EventFormProps) {
  return (
    <>
      <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
      <form
        className="etkinlik-formu"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
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

        <button type="submit">{submitText}</button>
      </form>
    </>
  );
}

export default EventForm;