from fastapi import HTTPException
from clerk_backend_api import Clerk, AuthenticateRequestOptions

import os
from dotenv import load_dotenv

load_dotenv()

clerk_sdk = Clerk(bearer_auth=os.getenv("CLERK_SECRET_KEY"))

def authenticate_request(request):

    try:
        request_state = clerk_sdk.authenticate_request(
            request,
            AuthenticateRequestOptions(
                authorized_parties=["http://localhost:5173", "http://localhost:5174"],
                jwt_key=os.getenv("JWT_KEY")
            )
        )

        if not request_state.is_signed_in:
            raise HTTPException(status_code=401, detail="User is not signed in.")
        
        user_id = request_state.payload.get("sub")

        return {"user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=401, detail="Authentication failed.") from e
    
def get_prompt(diifficulty: str) -> str:
    system_prompt = """You are an expert coding challenge creator. 
    Your task is to generate a coding question with multiple choice answers.
    The question should be appropriate for the specified difficulty level.

    For easy questions: Focus on basic syntax, simple operations, or common programming concepts.
    For medium questions: Cover intermediate concepts like data structures, algorithms, or language features.
    For hard questions: Include advanced topics, design patterns, optimization techniques, or complex algorithms.

    Return the challenge in the following JSON structure:
    {
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0, // Index of the correct answer (0-3)
        "explanation": "Detailed explanation of why the correct answer is right"
    }

    Make sure the options are plausible but with only one clearly correct answer.
    """
      
    return system_prompt  
