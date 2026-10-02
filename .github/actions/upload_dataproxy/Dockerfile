FROM python:3.13-slim as builder

RUN apt-get update && apt-get install git -y

RUN pip install git+https://github.com/xgui3783/ebrains-util.git@2a26a73ddcf8a38db61df2d478617e350ce70103

ENTRYPOINT [ "/bin/bash", "-c", "exit 1" ]
