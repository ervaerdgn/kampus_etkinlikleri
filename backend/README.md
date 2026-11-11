# Kampüs Etkinlik API

Express ile yazılmış, etkinlikleri JSON olarak veren REST API.

## Çalıştırma

```
npm install
npm run dev
```

API http://localhost:3000 adresinde çalışır.

## Ortam değişkeni

| Değişken | Açıklama |
|----------|----------|
| PORT     | Sunucunun portu (varsayılan 3000) |

`.env.example` dosyasını `.env` olarak kopyala ve değerleri doldur.

## REST sözleşmesi

| Method | Endpoint    | Amaç          | Başarılı | Hata     | Durum     |
|--------|-------------|---------------|----------|----------|-----------|
| GET    | /events     | Listeyi getir | 200      | -        | Bu sprint |
| GET    | /events/:id | Tek etkinlik  | 200      | 404      | Bu sprint |
| POST   | /events     | Yeni etkinlik | 201      | 400      | Bu sprint |
| PATCH  | /events/:id | Güncelle      | 200      | 400, 404 | Sprint 9  |
| DELETE | /events/:id | Sil           | 204      | 404      | Sprint 9  |

## Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```