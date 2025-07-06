# 🎓 CEE Rank Predictor (AI-Powered)

This project predicts a student's possible rank range in the Common Entrance Examination (CEE) based on their obtained score using a machine learning model built with LightGBM quantile regression.

---

## 🧠 How the AI Rank Prediction Model Works

This application uses **Machine Learning (ML)** to estimate a student’s **CEE rank range** based on their **score**. It predicts:

- 🔻 **Lower Bound Rank**: Best-case rank estimate for the score  
- 🔺 **Upper Bound Rank**: Worst-case rank estimate for the score  
- 🎯 **Median Rank**: Most likely rank

The core ML technique is **quantile regression** using the **LightGBM** framework, which models the distribution of ranks rather than a single value, providing a more informative prediction interval.

### Data

- Training data was sourced from CEE UG 2021 results, containing actual ranks and scores.
- Data preprocessing involved scaling scores for better model training.

### Model Details

- Three LightGBM models were trained, each predicting a different quantile:
  - α=0.1 (lower bound)
  - α=0.5 (median)
  - α=0.9 (upper bound)

- The model predicts a range of ranks to reflect uncertainty and distribution spread in rank at a given score.

### Performance

- Evaluated using Mean Absolute Error (MAE).
- Achieved MAE around 61.87 ranks, which is reasonable for an approximate rank predictor.

---

