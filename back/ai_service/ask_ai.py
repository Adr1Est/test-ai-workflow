import os
from dotenv import load_dotenv
from openai import OpenAI


def ask_ai(payload):
    load_dotenv()
    openai_key = os.getenv("OPENAI_API_KEY")
    
    client = OpenAI(api_key=openai_key)
    
    response = client.responses.create(
        model="gpt-3.5-turbo",
        input=payload
    )
    
    return response.output_text