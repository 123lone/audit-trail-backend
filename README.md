# Audit Trail Backend (Node + Express)

This is the backend API for the Mini Audit Trail Generator web app.  
It compares old vs new text, detects added & removed words, and stores version history.

---

## 🚀 Live Backend API

Base URL (Render Deployment) 👇  
🔗 https://audit-trail-backend-zwg6.onrender.com

### API Endpoints

| Method | Route | Description |
|-------|--------|-------------|
| GET    | `/versions`     | Returns all saved version logs |
| POST   | `/save-version` | Saves new version + detects added/removed words |

---

### 📌 POST Body Example

```json
{
  "previous": "hello world",
  "current": "hello audit world"
}
