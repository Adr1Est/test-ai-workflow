import os
import requests
from dotenv import load_dotenv

def ask_ai(payload):
    load_dotenv()
    HF_API_TOKEN = os.getenv("HF_TOKEN")
    API_URL = os.getenv('HF_API_URL')
    
    headers = {
        "Authorization": f"Bearer {HF_API_TOKEN}",
    }

    response = requests.post(API_URL, headers=headers, json={
        "messages": [
            {
                "role": "user",
                "content": payload
            }
        ],
        "model": "microsoft/Phi-3-mini-4k-instruct" # Cambiar modelo LLM al cambiar HF_API_URL
    })
    return response.json()

# response = ask_ai("Responde con una palabra a esta pregunta: ¿Cual es la capital de España?")

# if response and "choices" in response:
#     print(response["choices"][0]["message"])
# else:
#     print("No se puedo obtener una respuesta válida.")