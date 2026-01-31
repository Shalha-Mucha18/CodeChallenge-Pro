from sqlalchemy.orm import session
from datetime import datetime,timedelta

from .import models


def get_challenge_quota(db: session.Session, user_id: str):
    return db.query(models.ChallengeQuota)\
        .filter(models.ChallengeQuota.user_id == user_id).first()

def create_challenge_quota(db: session.Session, user_id: str):
    new_quota = models.ChallengeQuota(
        user_id=user_id,
        quota_used=0,
        last_reset_date=datetime.utcnow()
    )   
    db.add(new_quota)
    db.commit()
    db.refresh(new_quota)
    return new_quota

def reset_quota_if_needed(db: session.Session, quota: models.ChallengeQuota):

    now = datetime.now()
    if now - quota.last_reset_date >= timedelta(hours=24):
        quota.quota_used = 0
        quota.last_reset_date = now
        db.commit()
        db.refresh(quota)
    return quota

def create_challenge(db: session.Session, difficulty: str, created_by: str,
                     title: str, options: str, correct_answer: str,
                     explanation: str):
    new_challenge = models.Challenge(
        difficulty=difficulty,
        created_by=created_by,
        title=title,
        options=options,
        correct_answer=correct_answer,
        explanation=explanation
    )
    db.add(new_challenge)
    db.commit()
    db.refresh(new_challenge)
    return new_challenge

def get_user_challenges(db: session.Session, user_id: str):
    return db.query(models.Challenge)\
        .filter(models.Challenge.created_by == user_id).all()