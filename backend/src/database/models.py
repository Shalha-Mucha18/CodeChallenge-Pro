from sqlalchemy import Column, Integer, String, DateTime,create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

engine = create_engine('sqlite:///./database.db', connect_args={"check_same_thread": False})
Base = declarative_base()



class Challenge(Base):
    __tablename__ = 'challenges'

    id = Column(Integer, primary_key=True, index=True)
    difficulty = Column(String, nullable=False)
    date_created = Column(DateTime, default=datetime.datetime.now)
    created_by = Column(String, nullable=False)
    title = Column(String, nullable=False)
    options = Column(String, nullable=False)  # Comma-separated options
    correct_answer = Column(String, nullable=False)
    explanation = Column(String, nullable=True)


class ChallengeQuota(Base):
    __tablename__ = 'challenge_quotas'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False, unique=True)
    quota_used = Column(Integer, default=0)
    last_reset_date = Column(DateTime, default=datetime.datetime.now)

Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()