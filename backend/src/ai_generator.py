import os
import json

from groq import Groq
from dotenv import load_dotenv
from src.utils import get_prompt



load_dotenv()


client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_challenge_with_ai(difficulty: str) -> dict:

    try:
        prompt =get_prompt(difficulty)

        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": f"Generate a {difficulty} difficulty coding challenge."
                }
            ],
            response_format={
                "type": "json_object",
            }
        )
        content = response.choices[0].message.content
        challenge_data = json.loads(content)

        required_fields = ["title", "options", "correct_answer_id", "explanation"]

        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f"Missing required field: {field}")

        # Normalize correct answer to the actual option text.
        if "correct_answer" not in challenge_data:
            options = challenge_data.get("options", [])
            answer_id = challenge_data.get("correct_answer_id")
            if isinstance(answer_id, str) and answer_id.isdigit():
                answer_id = int(answer_id)
            if isinstance(answer_id, int) and 0 <= answer_id < len(options):
                challenge_data["correct_answer"] = options[answer_id]
            else:
                raise ValueError("Invalid correct_answer_id in challenge data")
        return challenge_data

    except Exception as e:
        print(f"Error generating challenge: {e}")
        return {
            "title": "Error generating challenge",
            "options": [
                'my_list.append(5)',
                'my_list.add(5)',
                'my_list.insert(5)',
                'my_list.push(5)'
            ],
            "correct_answer_id": None,
            "correct_answer": None,
            "explanation": "An error occurred while generating the challenge."
        }    
  
