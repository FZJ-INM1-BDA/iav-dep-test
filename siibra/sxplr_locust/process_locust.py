

# use 
# mean_value=$(python siibra/sxplr_locust/process_locust.py)
# to capture the output value

def main():
    import pandas as pd
    df = pd.read_csv("locust_output/output_stats_history.csv")
    average = df["Total Average Response Time"]
    print(average.mean())
    

if __name__ == "__main__":
    main()
