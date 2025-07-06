from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

# Load models and scaler
model_lower = joblib.load('model_lower.pkl')
model_upper = joblib.load('model_upper.pkl')
model_median = joblib.load('model_median.pkl')
scaler = joblib.load('scaler.pkl')

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests (React frontend)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        score = data.get('score')

        if score is None:
            return jsonify({'error': 'Score is missing'}), 400

        # 🧠 Wrap input score in DataFrame to match training column names
        input_df = pd.DataFrame({'score': [float(score)]})
        input_scaled = scaler.transform(input_df)

        # 🔮 Predict rank bounds
        lower = model_lower.predict(input_scaled)[0]
        upper = model_upper.predict(input_scaled)[0]
        median = model_median.predict(input_scaled)[0]

        return jsonify({
            'lower_rank': int(lower),
            'upper_rank': int(upper),
            'median_rank': int(median)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)