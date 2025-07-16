

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

# fzj 54.17541311336944

# eucentral 77.89328359096784
# useast 220.3681194594253
# uswest 373.36095533948884
# ap-southeast 749.9450576519395
