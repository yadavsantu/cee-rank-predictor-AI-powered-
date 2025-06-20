from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # or pickle if you used that
import numpy as np

# Load model
model = joblib.load('rank_predictor_model.pkl')

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    score = data.get('score')

    try:
        input_score = np.array([[float(score)]])
        prediction = model.predict(input_score)[0]
        return jsonify({'predicted_rank': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)