FROM python:3.13-slim as builder

RUN apt-get update && apt-get install git -y

RUN pip install git+https://github.com/xgui3783/ebrains-util.git@471689ce6c5424f0dd8b147f0e55a75002960e32

ENTRYPOINT [ "/bin/bash", "-c", "exit 1" ]
