from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..ai_generator import generate_challenge_with_ai

import os

from ..database.db import (

    get_challenge_quota,
    create_challenge_quota,
    reset_quota_if_needed,
    create_challenge,
    get_user_challenges
)

from ..utils import authenticate_request
from ..database.models import get_db
import json
from datetime import datetime

router = APIRouter()

MAX_DAILY_CHALLENGES = int(os.getenv("CHALLENGE_DAILY_LIMIT", "5"))

class ChallengeCreateRequest(BaseModel):
   difficulty: str
   
   class Config:
       json_schema_extra = {
           "example": {
               "difficulty": "easy",}}
        

@router.post("/generate_challenge")
async def generate_challenge(request: Request, challenge_request: ChallengeCreateRequest,
                             db: Session = Depends(get_db)):
    
    try:
        user_details = authenticate_request(request)
        user_id = user_details.get("user_id")

        quota = get_challenge_quota(db, user_id)
        if not quota:
            quota = create_challenge_quota(db, user_id)
        quota = reset_quota_if_needed(db, quota)

        remaining = MAX_DAILY_CHALLENGES - quota.quota_used
        if remaining <= 0:
            raise HTTPException(status_code=403, detail="Challenge generation quota exceeded.")
        
        challenge_data = generate_challenge_with_ai(challenge_request.difficulty)
        correct_answer = challenge_data.get("correct_answer")
        if correct_answer is None:
            # Fallback: map correct_answer_id to an option if provided.
            answer_id = challenge_data.get("correct_answer_id")
            if isinstance(answer_id, str) and answer_id.isdigit():
                answer_id = int(answer_id)
            options = challenge_data.get("options", [])
            if isinstance(answer_id, int) and 0 <= answer_id < len(options):
                correct_answer = options[answer_id]
        if correct_answer is None:
            raise HTTPException(status_code=500, detail="Invalid challenge answer data.")

        new_challenge = create_challenge(
            db = db,
            difficulty= challenge_request.difficulty,
            created_by=user_id,
            title=challenge_data['title'],
            options=",".join(challenge_data['options']),
            correct_answer=correct_answer,
            explanation=challenge_data.get('explanation', "")
        )
        quota.quota_used += 1
        db.commit()
        db.refresh(quota)

        return {
            'id': new_challenge.id,
            'difficulty': new_challenge.difficulty,
            'title': new_challenge.title,
            'options': new_challenge.options.split(","),
            'correct_answer': new_challenge.correct_answer,
            'explanation': new_challenge.explanation,
            'timestamp': new_challenge.date_created.isoformat() 
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to generate challenge.") from e


@router.get("/my-history")
async def get_my_challenge_history(request: Request, db: Session = Depends(get_db)):
    user_details = authenticate_request(request)
    user_id = user_details.get("user_id")

    challenges = get_user_challenges(db, user_id)
    return {"challenges": challenges}


@router.get("/quota")
async def get_challenge_quota_endpoint(request: Request, db: Session = Depends(get_db)):

    user_details = authenticate_request(request)
    user_id = user_details.get("user_id")

    quota = get_challenge_quota(db, user_id)
    if not quota:
         return{
             'user_id': user_id,
                'quota_used': 0,
                'quota_remaining': MAX_DAILY_CHALLENGES,
                'last_reset_date': datetime.now()
         }
    quota = reset_quota_if_needed(db, quota)
    return {
        'user_id': quota.user_id,
        'quota_used': quota.quota_used,
        'quota_remaining': MAX_DAILY_CHALLENGES - quota.quota_used,
        'last_reset_date': quota.last_reset_date
    }


@router.post("/test_generate")
async def test_generate_challenge(challenge_request: ChallengeCreateRequest):
    """
    Test endpoint for challenge generation without authentication.
    WARNING: For development only! Remove in production.
    """
    try:
        challenge_data = generate_challenge_with_ai(challenge_request.difficulty)
        correct_answer = challenge_data.get("correct_answer")
        if correct_answer is None:
            # Fallback: map correct_answer_id to an option if provided.
            answer_id = challenge_data.get("correct_answer_id")
            if isinstance(answer_id, str) and answer_id.isdigit():
                answer_id = int(answer_id)
            options = challenge_data.get("options", [])
            if isinstance(answer_id, int) and 0 <= answer_id < len(options):
                correct_answer = options[answer_id]
        if correct_answer is None:
            raise HTTPException(status_code=500, detail="Invalid challenge answer data.")

        return {
            'difficulty': challenge_request.difficulty,
            'title': challenge_data['title'],
            'options': challenge_data['options'],
            'correct_answer': correct_answer,
            'correct_answer_id': challenge_data.get('correct_answer_id'),
            'explanation': challenge_data.get('explanation', "")
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate challenge: {str(e)}") from e
