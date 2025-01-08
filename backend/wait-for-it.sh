#!/bin/sh
# Use this script to test if a given TCP host/port are available

set -e

TIMEOUT=15
while getopts ":t:" opt; do
  case $opt in
    t) TIMEOUT=$OPTARG ;;
    *) ;;
  esac
done

HOST=$1
shift
PORT=$1
shift

echo "Waiting for $HOST:$PORT to be available..."

for i in $(seq $TIMEOUT); do
  if nc -z $HOST $PORT; then
    echo "$HOST:$PORT is available!"
    exec "$@"
    exit 0
  fi
  echo "Waiting ($i)..."
  sleep 1
done

echo "$HOST:$PORT is not available after $TIMEOUT seconds!"
exit 1
