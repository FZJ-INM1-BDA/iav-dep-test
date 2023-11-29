FROM python:3.10-slim as builder

RUN apt-get update && apt-get install git

RUN pip install git+https://github.com/xgui3783/ebrains-util.git

ENTRYPOINT [ "/bin/bash", "-c", "exit 1" ]
