import React from "react";
import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

function EventDetail({ event }: Props) {
  return (
    <article className="detay">
  
      <div className={event.image ? "detay-kapsayici" : ""}>
        {event.image && (
          <figure className="afis-alani">
            <img src={event.image} alt={`${event.title} Afişi`} />
          </figure>
        )}
        <div className="kunye-alani">
          <dl>
            <dt>Tarih:</dt>
            <dd>{formatDate(event.date)}</dd>
            <dt>Saat:</dt>
            <dd>{event.time}</dd>
            <dt>Yer:</dt>
            <dd>{event.location}</dd>
            <dt>Kategori:</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan:</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
          <div className="butonlar">
            <Link className="buton" to="/events">&larr; Listeye dön</Link>
            <Link className="buton" to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
          </div>
        </div>
      </div>
      
     
      <div id="detay" style={{ marginTop: "2rem" }}>
        <h2 style={{ textAlign: "left" }}>Açıklama</h2>
        <p style={{ textAlign: "left" }}>{event.description}</p>
      </div>
    </article>
  );
}

export default EventDetail;