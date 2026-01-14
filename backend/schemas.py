from pydantic import BaseModel
from typing import Optional
# We need to separate the Database Model (how data is stored) from 
# the Pydantic Schema (how data is sent over the API).

class EventBase(BaseModel):
    title: str
    description: str
    city: str
    date_time: str
    image_url: Optional[str] = None
    category: Optional[str] = None

class EventCreate(EventBase):
    pass # Used when creating a new event

class Event(EventBase):
    id: int # The database will provide this

    class Config:
        from_attributes = True # Allows Pydantic to read SQLAlchemy models