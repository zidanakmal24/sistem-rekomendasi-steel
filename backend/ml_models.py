import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import os

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = os.environ.get("CSV_PATH", os.path.join(BASE_DIR, "Steel_industry.csv"))

# Global models and data
df = None
kmeans_model = None
rf_model = None

def init_ml():
    global df, kmeans_model, rf_model
    print("Loading dataset...")
    df = pd.read_csv(CSV_PATH)
    
    # Feature engineering / mapping
    # Extract hour from Date_Time (format: DD-MM-YYYY HH:MM)
    df['Hour'] = pd.to_datetime(df['Date_Time'], format='%d-%m-%Y %H:%M').dt.hour
    
    # Rename columns for easier access
    df.rename(columns={
        'Usage_kWh': 'Usage',
        'CO2(tCO2)': 'CO2',
        'Lagging_Current_Power_Factor': 'PowerFactor',
        'Lagging_Current_Reactive.Power_kVarh': 'ReactivePower'
    }, inplace=True)
    
    print("Training K-Means...")
    kmeans_model = KMeans(n_clusters=3, random_state=42)
    df['Cluster'] = kmeans_model.fit_predict(df[['Usage', 'CO2']])
    
    print("Training Random Forest Regressor...")
    categorical_features = ['WeekStatus', 'Day_Of_Week', 'Load_Type']
    numeric_features = ['Hour', 'NSM', 'PowerFactor', 'ReactivePower']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', numeric_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])
    
    rf_model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=50, random_state=42, n_jobs=-1))
    ])
    
    X = df[numeric_features + categorical_features]
    y = df[['Usage', 'CO2']]
    
    rf_model.fit(X, y)
    print("Models initialized successfully!")

def get_kpis():
    if df is None: return {}
    return {
        "totalRecords": len(df),
        "avgUsage": round(df['Usage'].mean(), 2),
        "avgCO2": round(df['CO2'].mean(), 2),
        "activeClusters": 3
    }

def get_trend_data():
    if df is None: return []
    # Sample data to avoid sending 35k rows to frontend (take daily averages)
    df['Date'] = pd.to_datetime(df['Date_Time'], format='%d-%m-%Y %H:%M').dt.date
    daily = df.groupby('Date').agg({'Usage': 'mean', 'CO2': 'mean'}).reset_index()
    # Return last 30 days
    recent = daily.tail(30).copy()
    recent['Date'] = recent['Date'].astype(str)
    return recent.to_dict(orient='records')

def get_distribution_data():
    if df is None: return []
    dist = df['Load_Type'].value_counts().to_dict()
    return [{"name": k, "value": v} for k, v in dist.items()]

def get_day_of_week_data():
    if df is None: return []
    dow_map = {'Monday':0, 'Tuesday':1, 'Wednesday':2, 'Thursday':3, 'Friday':4, 'Saturday':5, 'Sunday':6}
    dow = df.groupby('Day_Of_Week').agg({'Usage': 'mean', 'CO2': 'mean'}).reset_index()
    dow['order'] = dow['Day_Of_Week'].map(dow_map)
    dow = dow.sort_values('order')
    return dow.to_dict(orient='records')

def get_clustering_data():
    if df is None: return [], []
    # Sample scatter data (take 500 random points)
    scatter = df[['Usage', 'CO2', 'Cluster']].sample(n=min(500, len(df)), random_state=42)
    
    # Cluster profiles
    profiles = []
    for c in range(3):
        c_df = df[df['Cluster'] == c]
        profiles.append({
            "id": c,
            "name": f"Cluster {c}",
            "avgUsage": round(c_df['Usage'].mean(), 2),
            "avgCO2": round(c_df['CO2'].mean(), 2)
        })
        
    return scatter.to_dict(orient='records'), profiles

def predict_energy(params):
    input_df = pd.DataFrame([params])
    # RF predicts Usage and CO2
    pred = rf_model.predict(input_df)[0]
    usage_pred = round(pred[0], 2)
    co2_pred = round(pred[1], 2)
    
    # KMeans predicts cluster
    cluster_pred = int(kmeans_model.predict([[usage_pred, co2_pred]])[0])
    
    # Mock confidence
    confidence = round(85 + np.random.random() * 10, 2)
    
    return {
        "usage": usage_pred,
        "co2": co2_pred,
        "clusterId": cluster_pred,
        "clusterName": f"Cluster {cluster_pred}",
        "confidence": confidence
    }
