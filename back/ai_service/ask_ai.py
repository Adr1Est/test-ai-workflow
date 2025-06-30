import os, json
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
# response = ask_ai("Responde con una palabra a esta pregunta: ¿Cual es la capital de España?")

# if response and "choices" in response:
#     print(response["choices"][0]["message"])
# else:
#     print("No se puedo obtener una respuesta válida.")