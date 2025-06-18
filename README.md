# MiraGames Admin Panel

**MiraGames Admin Panel** — простой административный интерфейс для управления клиентами, платежами и курсом токенов.  
Проект состоит из Backend (ASP.NET Core + SQLite) и Frontend (Vite + React).

---

## Стек технологий

### Backend
- ASP.NET Core 8 (Minimal APIs)
- SQLite (в виде файла)
- Entity Framework Core

### Frontend
- Vite
- React

---

## 🎁 Дополнительно реализовано
- История платежей на UI
- Фильтр по клиентам

---

## 🚀 Запуск проекта

### Backend

```cmd
cd MiraGames.Backend
dotnet run
```
Запустится на: http://localhost:5000

### Frontend

```cmd
cd MiraGames.Frontend
npm install
npm run dev
```
Откроется на: http://localhost:5173

### Данные для входа
- Email:    admin@mirra.dev  
- Password: admin123

---
## Тесты curl / Postman
### 1. Авторизация
POST /auth/login
```json
{
  "email": "admin@mirra.dev",
  "password": "admin123"
}
```
cURL:
```cmd
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@mirra.dev\",\"password\":\"admin123\"}"
```
### 2. Получить список клиентов
GET /clients
cURL:
```cmd
curl http://localhost:5000/clients
```

### 3. Получить историю платежей
GET /payments?take=5
| Query param | Описание                 |
| ----------- | ------------------------ |
| `take`      | (опц. def=5) Сколько платежей вернуть |
| `clientId`  | (опц.) фильтр по клиенту |

cURL:
```cmd
curl "http://localhost:5000/payments?take=5&clientId=1"
```
### 4. Обновить курс токена
POST /rate
\nJSON:
```json
{
  "id": 1,
  "value": 15
}
```

cURL:
```cmd
curl -X POST http://localhost:5000/rate \
  -H "Content-Type: application/json" \
  -d "{\"id\":1,\"value\":15}"
```
