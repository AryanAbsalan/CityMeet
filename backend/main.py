from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session
import models, schemas, database


app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite dev server address
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],
)

# Create the database tables
database.Base.metadata.create_all(bind=database.engine)

# This is a temporary in-memory database (Phase 2)
# In Phase 3, we will replace this with MSSQL
#region

# This is our Data Model
# class Event(BaseModel):
#     id: int
#     title: str
#     description: str
#     city: str
#     date_time: str
#     image_url: Optional[str] = None
#     category: Optional[str] = None

# events_db = [
#     {
#         "id": 1,
#         "title": "React & TypeScript Workshop",
#         "description": "Hands-on session learning advanced React patterns.",
#         "city": "Berlin",
#         "date_time": "2026-03-15T18:00:00Z",
#         "image_url": "https://picsum.photos/seed/react/300/200",
#         "category": "Tech",
#     }
# ]

# # GET all events (with optional filtering)
# @app.get("/events", response_model=List[Event])
# def get_events(city: Optional[str] = None, title: Optional[str] = None):
#     results = events_db
#     if city:
#         results = [e for e in results if city.lower() in e['city'].lower()]
#     if title:
#         results = [e for e in results if title.lower() in e['title'].lower()]
#     return results

# # POST a new event
# @app.post("/events", response_model=Event)
# def create_event(event: Event):
#     # Check if ID already exists
#     if any(e['id'] == event.id for e in events_db):
#         raise HTTPException(status_code=400, detail="Event ID already exists")
    
#     events_db.append(event.model_dump())
#     return event

# # PUT (update) an existing event
# @app.put("/events/{event_id}", response_model=Event)
# def update_event(event_id: int, updated_event: Event):
#     for index, event in enumerate(events_db):
#         if event['id'] == event_id:
#             events_db[index] = updated_event.model_dump()
#             return updated_event
#     raise HTTPException(status_code=404, detail="Event not found")

# # DELETE an event
# @app.delete("/events/{event_id}")
# def delete_event(event_id: int):
#     for index, event in enumerate(events_db):
#         if event['id'] == event_id:
#             events_db.pop(index)
#             return {"message": "Event deleted successfully"}
#     raise HTTPException(status_code=404, detail="Event not found")
#endregion

# GET all events from Database
@app.get("/events", response_model=List[schemas.Event])
def get_events(city: Optional[str] = None, title: Optional[str] = None, db: Session = Depends(database.get_db)):
    query = db.query(models.EventModel)
    if city:
        query = query.filter(models.EventModel.city.contains(city))
    if title:
        query = query.filter(models.EventModel.title.contains(title))
    return query.all()

# POST a new event to Database
@app.post("/events", response_model=schemas.Event)
def create_event(event: schemas.EventCreate, db: Session = Depends(database.get_db)):
    db_event = models.EventModel(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event) # Get the latest state from the DB (including any auto-gen fields)
    return db_event

# PUT (update) an existing event in Database
@app.put("/events/{event_id}", response_model=schemas.Event)
def update_event(event_id: int, updated_data: schemas.EventCreate, db: Session = Depends(database.get_db)):
    # 1. Fetch the existing event from the database
    db_event = db.query(models.EventModel).filter(models.EventModel.id == event_id).first()

    # 2. Check if it exists
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")

    # 3. Update the attributes dynamically
    # We loop through the dictionary of the new data and update the database object
    update_dict = updated_data.model_dump()
    for key, value in update_dict.items():
        setattr(db_event, key, value)

    # 4. Save changes
    db.commit()
    db.refresh(db_event) # Get the latest state from the DB (including any auto-gen fields)
    
    return db_event

# DELETE an event from Database
@app.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(database.get_db)):
    event = db.query(models.EventModel).filter(models.EventModel.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
    return {"message": "Deleted successfully"}