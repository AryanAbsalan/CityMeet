This tutorial provides a comprehensive, step-by-step guide to building **City-Meet**, a full-stack event management application. We will build this project in three distinct phases, moving from a static frontend to a persistent, database-backed system.

---

# 🏙️ City-Meet: Full-Stack Project Tutorial

| Layer | Technology Stack |
| --- | --- |
| **Frontend** | React, Vite, TypeScript, Tailwind CSS |
| **Backend** | Python, FastAPI, Pydantic, Uvicorn |
| **Database** | Microsoft SQL Server (MSSQL), SQLAlchemy ORM |

---

## 📂 Phase 1: The Frontend (React + TypeScript)

In this phase, we build the "face" of the application. We will use mock data to ensure the UI logic works before connecting it to a server.

### 1. Project Initialization

Open your terminal and create the project structure:

```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

### 2. Define the Data Model (`types.ts`)

Create `src/types.ts` to define what an "Event" looks like. This ensures type safety across the app.

```typescript
export interface Event {
  id: number;
  title: string;
  description: string;
  city: string;
  date_time: string;
  image_url?: string;
  category?: string;
}

```

### 3. Build Reusable Components

* **EventCard.tsx:** Displays individual event details.
* **EventList.tsx:** Maps through the event array.
* **EventForm.tsx:** A modal/form to handle both **Create** and **Update** logic.
* **SearchBar.tsx:** Handles filtering by city and title.

### 4. State Management in `App.tsx`

Use `useState` to store the list of events. Implement functions to add, edit, and delete events from this local array. Use `useMemo` for dynamic search filtering to keep the UI snappy.

---

## 🐍 Phase 2: The Backend API (FastAPI)

Now we create a Python server to handle requests. This replaces our local array with a centralized API.

### 1. Environment Setup

```bash
mkdir backend && cd backend
python -m venv venv
# Activate: .\venv\Scripts\activate (Windows) or source venv/bin/activate (Mac)
pip install fastapi uvicorn pydantic

```

### 2. Create the API (`main.py`)

FastAPI uses **Pydantic** models to validate data coming from the frontend.

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# IMPORTANT: Allow the React dev server to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

```

### 3. Implement REST Endpoints

Create routes for:

* `GET /events`: Returns all events.
* `POST /events`: Receives a JSON body and adds a new event.
* `DELETE /events/{id}`: Removes an event by ID.

---

## 🗄️ Phase 3: The Database (MSSQL + SQLAlchemy)

The final step is persistence. We connect our API to Microsoft SQL Server so that data is saved permanently.

### 1. Database Configuration (`database.py`)

We use **SQLAlchemy** to map Python objects to SQL tables.
**Note:** Driver 18 requires encryption flags for local development.

```python
import urllib
from sqlalchemy import create_engine

params = urllib.parse.quote_plus(
    r'DRIVER={ODBC Driver 18 for SQL Server};'
    r'SERVER=YOUR_SERVER_NAME;'
    r'DATABASE=CityMeetDB;'
    r'Trusted_Connection=yes;'
    r'Encrypt=yes;'
    r'TrustServerCertificate=yes;'
)
SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

```

### 2. Models vs. Schemas

* **`models.py` (SQLAlchemy):** Defines the table structure in SQL Server (Primary Keys, Column types).
* **`schemas.py` (Pydantic):** Defines the data structure for API requests/responses.

### 3. The "Repository" Pattern in `main.py`

Rewrite your FastAPI routes to use a database session.

1. **Open Session:** Every request opens a connection via a dependency (`get_db`).
2. **Execute Query:** Use SQLAlchemy's `db.query()` to fetch or `db.add()` to save.
3. **Commit:** Finalize the transaction to SQL Server.

---

## 🛠️ Best Practices & Common Mistakes

* **CORS Errors:** If your frontend can't see the backend, check your `CORSMiddleware` settings in `main.py`.
* **Raw Strings (`r''`):** Always use raw strings for Windows file paths or server names (e.g., `r'LAPTOP\SQLEXPRESS'`) to avoid backslash escape errors.
* **Async/Await:** Ensure your frontend `fetch` calls use `await` to handle the asynchronous nature of network requests.
* **Environment Variables:** As you progress, move your sensitive connection strings into a `.env` file.

---

## 🏁 Final Execution

To run the complete system, you need two terminals:

1. **Backend:**
```bash
cd backend
python -m uvicorn main:app --reload

```


2. **Frontend:**
```bash
cd frontend
npm run dev

```



Visit `http://localhost:5173` to manage your events, and use **SQL Server Management Studio (SSMS)** to watch the `events` table grow!
