import pandas as pd
import joblib
from xgboost import XGBRegressor
from catboost import CatBoostRegressor
from sklearn.ensemble import VotingRegressor

def train_ensemble(data_path):
    df = pd.read_csv(data_path)
    # Drop non-features
    X = df.drop(columns=['city', 'state', 'health_risk_score', 'from date', 'to date'], errors='ignore')
    y = df['health_risk_score']

    # Set categories
    cat_cols = ['is_smoker', 'has_asthma', 'mask_type']
    for col in cat_cols: X[col] = X[col].astype('category')

    xgb = XGBRegressor(n_estimators=100, enable_categorical=True, tree_method="hist")
    cat = CatBoostRegressor(iterations=100, silent=True, cat_features=cat_cols)

    ensemble = VotingRegressor([('xgb', xgb), ('cat', cat)])
    ensemble.fit(X, y)
    
    # Manual 'fusing' to avoid cloning errors later
    ensemble.estimators_ = [xgb, cat]
    
    joblib.dump(ensemble, 'models/breathesafe_ensemble.pkl')
    print("Ensemble trained and saved.")

if __name__ == "__main__":
    train_ensemble('data/final_gen_ai_data.csv')