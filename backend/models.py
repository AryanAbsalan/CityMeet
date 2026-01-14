from sqlalchemy import Column, Integer, String, DateTime
from database import Base
import datetime

class EventModel(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000))
    city = Column(String(100))
    date_time = Column(String(100)) # Storing as string for now to match Phase 2 logic
    image_url = Column(String(500))
    category = Column(String(100))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc)) # explicit UTC timezone