#!/usr/bin/env sh

while ! nc -z "${DATABASE_HOST}" 27017; do
    echo "Waiting for database to be ready"
    sleep 3;
done

mongo --host "${DATABASE_HOST}":27017 --eval "rs.initiate({ '_id': 'rs0', 'members': [{ '_id': 0, 'host': '127.0.0.1:27017' }] })"