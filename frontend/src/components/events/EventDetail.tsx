import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <>
      <div className="detay-kapsayici">
        {event.image && (
          <figure className="afis-alani">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>
              <em>{event.title} afişi</em>
            </figcaption>
          </figure>
        )}
        <div className="kunye-alani">
          <h2>Etkinlik Künyesi</h2>
          <dl className="etkinlik-kunyesi">
            <dt>Tarih</dt>
            <dd>
              {formatDate(event.date)}, {event.time}
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </div>
      </div>
      <h2>Açıklama</h2>
      <p>{event.description}</p>
      <div className="butonlar">
        <a
          className="buton"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          &larr; Listeye dön
        </a>
        <a
          className="buton"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onEdit(event.id);
          }}
        >
          Bu etkinliği güncelle
        </a>
      </div>
    </>
  );
}

export default EventDetail;