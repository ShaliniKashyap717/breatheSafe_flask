import pandas as pd

def create_smart_sample(input_file, output_file, total_target=200000):
    print("Loading data for smart sampling...")
    cols = ['PM2.5', 'PM10', 'NO2', 'Ozone', 'age', 'is_smoker', 'has_asthma', 'health_risk_score']
    
    
    chunks = pd.read_csv(input_file, usecols=cols, chunksize=100000)
    
    sample_list = []
    for chunk in chunks:
       
        sample_list.append(chunk.sample(frac=0.02))
        
    df_sample = pd.concat(sample_list)
    
   
    df_sample.to_csv(output_file, index=False)
    print(f"Sampled {len(df_sample)} rows. Saved to {output_file}")

create_smart_sample("final_with_health.csv", "colab_train_ready.csv")