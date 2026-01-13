from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite dev server address
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],
)

# This is our Data Model
class Event(BaseModel):
    id: int
    title: str
    description: str
    city: str
    date_time: str
    image_url: Optional[str] = None
    category: Optional[str] = None

# This is a temporary in-memory database (Phase 2)
# In Phase 3, we will replace this with MSSQL
events_db = [
    {
        "id": 1,
        "title": "React & TypeScript Workshop",
        "description": "Hands-on session learning advanced React patterns.",
        "city": "Berlin",
        "date_time": "2026-03-15T18:00:00Z",
        "image_url": "https://picsum.photos/seed/react/300/200",
        "category": "Tech",
    }
]

# GET all events (with optional filtering)
@app.get("/events", response_model=List[Event])
def get_events(city: Optional[str] = None, title: Optional[str] = None):
    results = events_db
    if city:
        results = [e for e in results if city.lower() in e['city'].lower()]
    if title:
        results = [e for e in results if title.lower() in e['title'].lower()]
    return results

# POST a new event
@app.post("/events", response_model=Event)
def create_event(event: Event):
    # Check if ID already exists
    if any(e['id'] == event.id for e in events_db):
        raise HTTPException(status_code=400, detail="Event ID already exists")
    
    events_db.append(event.model_dump())
    return event

# PUT (update) an existing event
@app.put("/events/{event_id}", response_model=Event)
def update_event(event_id: int, updated_event: Event):
    for index, event in enumerate(events_db):
        if event['id'] == event_id:
            events_db[index] = updated_event.model_dump()
            return updated_event
    raise HTTPException(status_code=404, detail="Event not found")

# DELETE an event
@app.delete("/events/{event_id}")
def delete_event(event_id: int):
    for index, event in enumerate(events_db):
        if event['id'] == event_id:
            events_db.pop(index)
            return {"message": "Event deleted successfully"}
    raise HTTPException(status_code=404, detail="Event not found")