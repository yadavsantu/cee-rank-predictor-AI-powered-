# 🎓 CEE Rank Predictor (AI-Powered)

Welcome to the **CEE Rank Predictor**, a modern web app that uses **machine learning** to predict your rank based on CEE exam marks. Built with **Next.js**, **Tailwind CSS**, and a **Flask backend** running an AI model trained on **CEE UG 2021 result data**.

> ⚠️ This AI model works only for scores **100 or above**, since it's trained on 2021 data where such cutoffs existed.

---

## 🚀 Getting Started

### 🧑‍💻 Prerequisites

- Node.js (v18+ recommended)
- Python 3.10 or later
- `pip` or `venv`
- Flask installed
- Backend model already trained (`model.pkl` etc.)

---

### 🔧 Frontend Setup

```bash
# Clone the repo
git clone https://github.com/your-username/cee-rank-predictor.git
cd cee-rank-predictor

# Install dependencies
npm install

# Run the development server
npm run dev
cd backend
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py