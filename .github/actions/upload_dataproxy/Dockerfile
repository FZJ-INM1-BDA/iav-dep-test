FROM python:3.10-slim as builder

RUN apt-get update && apt-get install git -y

RUN pip install git+https://github.com/xgui3783/ebrains-util.git@9173432e8fea24bb5d9b4dada6f9d8e82926567d

ENTRYPOINT [ "/bin/bash", "-c", "exit 1" ]
