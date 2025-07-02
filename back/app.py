import os, requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from ai_service.ask_ai import ask_ai

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/aiprompt', methods=['POST'])
def get_response_from_ai():
    payload = request.json.get("payload", None)
    response = ask_ai(payload)
    if response:
        print(response)
        return jsonify(response), 200
    else:
        return jsonify({"message": "Sin respuesta..."}), 404

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3002))
    app.run(host='0.0.0.0', port=PORT, debug=True)