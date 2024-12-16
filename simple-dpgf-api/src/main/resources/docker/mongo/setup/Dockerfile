FROM mongo:5.0

RUN apt-get update && apt-get install -y netcat && apt-get clean

ENTRYPOINT [ "sh", "/setup.sh" ]