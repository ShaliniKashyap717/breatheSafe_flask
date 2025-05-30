import streamlit as st
import pandas as pd
import numpy as np
import joblib

# Load models
xgb_model = joblib.load('xgboost_health_model (1).pkl')
iso_model = joblib.load('isolation_forest_model.pkl')
feature_columns = joblib.load('feature_columns (1).pkl')

# 🎯 Streamlit app
st.set_page_config(page_title="BreatheSafe", layout="centered")

# 🧠 Main Heading
st.title("🩺 Health Risk Score Prediction by BreatheSafe")
st.markdown("Get personalized health risk score & detect pollution anomalies based on environmental & personal data.")

# User Inputs
st.header("📥 Enter Your Details")

age = st.number_input("Age", min_value=1, max_value=120, value=25)
smoker = st.selectbox("Do you smoke?", ["No", "Yes"])
physically_active = st.selectbox("Are you physically active?", ["No", "Yes"])
pre_conditions = st.multiselect(
    "Select any pre-existing conditions",
    ['asthma', 'COPD', 'bronchitis', 'lung cancer', 'heart disease', 'diabetes', 'allergies']
)

exposure_duration_hr = st.slider("Average Exposure Time to Outdoors (hours/day)", 0.0, 24.0, 1.0)

st.markdown("---")

# Pollutant Inputs (ideally fetched via API in backend)
st.header("🌫️ Pollution Data at Your Location")

pollutants = {}
pollutant_cols = ['PM2.5 (ug/m3)', 'PM10 (ug/m3)', 'NO (ug/m3)', 'NO2 (ug/m3)', 'NOx (ppb)',
                  'NH3 (ug/m3)', 'SO2 (ug/m3)', 'CO (mg/m3)', 'Ozone (ug/m3)', 'Benzene (ug/m3)', 'Toluene (ug/m3)']

for col in pollutant_cols:
    pollutants[col] = st.number_input(f"{col}", min_value=0.0, value=50.0)

aqi = st.slider("Current AQI", 0, 500, 100)
season = st.selectbox("Current Season", ["summer", "winter", "spring", "autumn"])

# Predict button
if st.button("🔍 Predict Health Risk & Check Anomaly"):
    # Prepare data
    input_data = {
        'age': age,
        'smoker': 1 if smoker == "Yes" else 0,
        'physically_active': 1 if physically_active == "Yes" else 0,
        'exposure_duration_hr': exposure_duration_hr,
        'aqi_avg': aqi,
        'aqi_max': aqi + 10,
        'aqi_std': 5,
        **pollutants
    }

    # Add pre-condition flags
    for cond in ['asthma', 'COPD', 'bronchitis', 'lung cancer', 'heart disease', 'diabetes', 'allergies']:
        input_data[cond] = 1 if cond in pre_conditions else 0

    # Add season encoding
    for s in ["summer", "winter", "spring", "autumn"]:
        input_data[f"season_{s}"] = 1 if season == s else 0

    # Fill missing columns
    for col in feature_columns:
        if col not in input_data:
            input_data[col] = 0

    # Reorder to match model input
    X_input = pd.DataFrame([input_data])[feature_columns]

    # Prediction
    prediction = xgb_model.predict(X_input)[0]
    st.success(f"🩺 Your personalized health risk score suggests: **{prediction}**.\n"
           "Stay informed and proactive about your well-being!")

    # Anomaly Detection
    iso_input = pd.DataFrame([{**pollutants, 'aqi_avg': aqi, f"season_{season}": 1}])
    for s in ["summer", "winter", "spring", "autumn"]:
        if f"season_{s}" not in iso_input.columns:
            iso_input[f"season_{s}"] = 0

    iso_input = iso_input.reindex(columns=iso_model.feature_names_in_, fill_value=0)
    anomaly = iso_model.predict(iso_input)[0]
    if anomaly == -1:
        st.error("🚨 Unusual Alert: Pollution levels are **significantly higher** than normal for this season.\n"
         "Please consider limiting outdoor activities and wearing a mask if going out.")

    else:
       st.info("✅ Good news! Pollution levels are **within normal range** for this season.\n"
        "Continue maintaining a healthy lifestyle and stay aware of environmental updates.")


