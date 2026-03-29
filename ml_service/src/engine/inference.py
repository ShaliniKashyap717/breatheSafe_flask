import pandas as pd
import numpy as np
import joblib
import os

class Predictor:
    def __init__(self):
        current_dir = os.path.dirname(__file__)
        model_path = os.path.join(current_dir, "../../models/breathesafe_ensemble.pkl")
        explainer_path = os.path.join(current_dir, "../../models/shap_explainer.pkl")
        
        # load model and explainer
        self.model = joblib.load(os.path.abspath(model_path))
        self.explainer = joblib.load(os.path.abspath(explainer_path))

    def run(self, data_dict):
        df = pd.DataFrame([data_dict])
        
        # required feature order
        # expected_order = [
        #     'pm2_5', 'pm10', 'no2', 'nox', 'no', 'at', 'ozone', 'co', 'nh3', 
        #     'so2', 'benzene', 'toluene', 'xylene', 'temp', 'rh', 'ws', 'wd', 
        #     'sr', 'rf', 'bp', 'vws', 'age', 'mask_type', 'is_smoker', 'has_asthma'
        # ]
        expected_order = [
            'pm2_5', 'pm10', 'no', 'no2', 'nox', 'nh3', 'so2', 'co', 'ozone', 
            'benzene', 'toluene', 'temp', 'rh', 'ws', 'wd', 'sr', 'bp', 'vws', 
            'xylene', 'rf', 'at', 'age', 'is_smoker', 'has_asthma', 'mask_type'
        ]
        
        for col in expected_order:
            if col not in df.columns:
                df[col] = 0
        
        df = df[expected_order]
        
        # categorical conversion
        for col in ['is_smoker', 'has_asthma', 'mask_type']:
            df[col] = df[col].astype('category')
            

        risk_score = self.model.predict(df)[0]
        
        # mask efficiency mapping
        mask_map = {
    0: 1.0,   # no mask
    1: 0.7,   # cloth (~30% filtration)
    2: 0.3,   # surgical (~70% filtration)
    3: 0.05   # n95 (~95% filtration)
}

        efficiency = mask_map.get(int(data_dict.get('mask_type', 0)), 1.0)
        
        # effective pm2.5 after filtration
        effective_pm25 = df['pm2_5'].iloc[0] * efficiency
        
        # safe exposure time based on WHO guidelines and effective filtration
        if effective_pm25 <= 15.0:
            safe_hours = 24.0 
        else:
            # The higher the effective PM2.5, the shorter the safe window
            # caps at a minimum of 0.5 hours for extreme pollution
            safe_hours = round(max(0.5, (15.0 / effective_pm25) * 24), 1)

        # shap explainability
        shap_values = self.explainer.shap_values(df)
        feature_names = df.columns.tolist()
        top_idx = np.argmax(np.abs(shap_values[0]))
        main_driver = feature_names[top_idx]
        # recommendation logic
        if risk_score > 0.6:
            status = "Critical Exposure"
            driver_display = main_driver.replace('_', ' ').title() if main_driver != 'pm2_5' else 'PM2.5' 
            recommendation = f"Critical risk primarily driven by {driver_display}. You are absorbing {effective_pm25:.1f}µg/m³ of PM2.5. Limit outdoors to {safe_hours}h."
        elif risk_score > 0.3:
            status = "Elevated Sensitivity"
            recommendation = f"Due to {main_driver}, your tolerance is reduced. You are safe for approx {safe_hours}h."
        else:
            status = "Safe"
            recommendation = f"Protection is optimal. You can safely remain outdoors for over {safe_hours}h."

        return {
            "risk_score": round(float(risk_score), 4),
            "status": status,
            "main_driver": main_driver,
            "recommendation": recommendation,
            "scientific_metrics": {
                "effective_pm25": round(float(effective_pm25), 2),
                "safe_window_hours": safe_hours,
                "filter_efficiency": f"{(1 - efficiency) * 100}%"
            }
        }
