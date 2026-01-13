# City-Meet: Social Media Event Management App

**City-Meet** is a full-stack event management platform inspired by Meetup. It allows users to browse, search, and manage local events. The project is built using a modern decoupled architecture with a React frontend and a Python FastAPI backend.

---

## 📂 Project Structure

```text
City-Meet/
├── frontend/                # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/      # EventCard, EventList, EventForm, SearchBar
│   │   ├── App.tsx          # Main state & API logic
│   │   └── types.ts         # TypeScript interfaces
│   └── package.json
│
├── backend/                 # Python FastAPI
│   ├── main.py              # API routes & business logic
│   └── requirements.txt     # Python dependencies
│
└── README.md                # Project documentation

```

---

## 🛠 Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
* **Backend:** Python 3.9+, FastAPI, Pydantic, Uvicorn
* **Database:** In-memory (Phase 2), MSSQL (Phase 3)

---

## 🚀 Getting Started

To run this project locally, you will need to open **two terminals**: one for the frontend and one for the backend.

### 1. Backend Setup (FastAPI)

1. Navigate to the backend folder:
```bash
cd backend

```


2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

```


3. Install dependencies:
```bash
pip install -r requirements.txt

```


4. Start the server:
```bash
uvicorn main:app --reload

```


*API is now running at: `http://127.0.0.1:8000*`
*Interactive Docs: `http://127.0.0.1:8000/docs*`

### 2. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend folder:
```bash
cd frontend

```


2. Install dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```


*Frontend is now running at: `http://localhost:5173*`

---

## 📑 Project Roadmap

* [x] **Phase 1: Frontend Development**
* [x] Scaffold with Vite and Tailwind.
* [x] Create reusable components (Event Cards, Forms).
* [x] Implement frontend-only CRUD with mock data.


* [x] **Phase 2: Backend Development**
* [x] Build REST API with FastAPI.
* [x] Implement CORS to allow frontend communication.
* [x] Connect React `fetch` calls to Python endpoints.


* [ ] **Phase 3: Database Integration**
* [ ] Set up Microsoft SQL Server (MSSQL).
* [ ] Integrate SQLAlchemy ORM.
* [ ] Persist event data permanently.



---

## 📝 Key Features

* **Dynamic Search:** Filter events by title or city in real-time.
* **Full CRUD:** Create, Read, Update, and Delete events via the UI.
* **Type Safety:** Shared data structures via TypeScript (frontend) and Pydantic (backend).
* **Responsive UI:** Fully functional on mobile and desktop devices.

