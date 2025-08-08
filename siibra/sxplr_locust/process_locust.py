import sys
from pathlib import Path
from datetime import datetime


import pandas as pd


def main(path: str, *args):

    stat_history_csv = list(Path(path).glob("**/*_stats_history.csv"))
    assert len(stat_history_csv) > 0, f"Expected at least one  _stats_history.csv file, but found none"
    for f in stat_history_csv:
        df = pd.read_csv(f)
        _95pc = df["95%"]
        _idx, row = list(df.iterrows())[-1]
        timestamp = df["Timestamp"]
        
        statsfiles = list(f.parent.glob("*_stats.csv"))
        assert len(statsfiles) == 1, f"Expected one and only one status file, but got {len(statsfiles)}: {statsfiles}"

        stat_df = pd.read_csv(statsfiles[0])
        urls_df = stat_df[stat_df["Name"] != "Aggregated"]
        aggregated_keys = "Total Median Response Time", "Total Average Response Time", "Total Max Response Time"
        key = "median:", "mean:", "max:"
        other_metrics = "\n".join([f"{k.ljust(7)}{row[dfk]}" for k, dfk in zip(key, aggregated_keys)])
        print(f"""--
{str(f)}:
95%:   {_95pc.median()}
begin: {datetime.fromtimestamp(timestamp.min())}
end:   {datetime.fromtimestamp(timestamp.max())}
{other_metrics}

urls:
    len:      {len(urls_df)}
    avg size  {urls_df['Average Content Size'].mean()/1024}
""")


if __name__ == "__main__":
    main(*sys.argv[1:])
