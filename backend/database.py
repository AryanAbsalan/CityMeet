from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib

# 1. Define your connection string
# Replace 'YOUR_SERVER_NAME' with your actual SQL Server name (e.g., localhost\SQLEXPRESS)
# This string uses Windows Authentication.
params = urllib.parse.quote_plus(
    r'DRIVER={ODBC Driver 18 for SQL Server};'
    r'SERVER=F5;'
    r'DATABASE=CityMeetDB;'
    r'Trusted_Connection=yes;'
    r'Encrypt=yes;'
    r'TrustServerCertificate=yes;'
)

SQLALCHEMY_DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"

# 2. Create the SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# 3. Create a SessionLocal class (each instance is a database session)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Base class for our database models
Base = declarative_base()

# Dependency to get the DB session in our routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()