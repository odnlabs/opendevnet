#!/bin/bash

# Function to update Docker images
function update() {
  echo "Updating docker services..."
  docker compose -f "$COMPOSE_FILE" down --rmi all
  git pull
  docker compose -f "$COMPOSE_FILE" up --build -d
}

# Function to restart Docker containers
function restart() {
  echo "Restarting docker services..."
  docker compose -f "$COMPOSE_FILE" restart
}

# Function to stop Docker containers
function stop() {
  echo "Stopping docker services..."
  docker compose -f "$COMPOSE_FILE" down
}

# Function to start Docker containers
function start() {
  echo "Starting docker services..."
  docker compose -f "$COMPOSE_FILE" up --build -d
}

# Function to view Docker container logs
function logs() {
  echo "Showing logs for docker services..."
  docker compose -f "$COMPOSE_FILE" logs -t -f --tail 1000
}

# Check if the environment argument is specified
if [ -z "$1" ]; then
  echo "Usage: ./run.sh [prod|dev] [update|restart|start|stop|logs]"
  exit 1
fi

# Set the environment file based on the argument
if [ "$1" == "prod" ]; then
  COMPOSE_FILE="docker compose.production.yml"
elif [ "$1" == "dev" ]; then
  COMPOSE_FILE="docker compose.development.yml"  # Adjust the filename for development, if necessary
else
  echo "Unknown environment '$1'. Please use 'prod' or 'dev'."
  exit 1
fi

# Handle command-line arguments
case "$2" in
  "update")
    update
    ;;
  "restart")
    restart
    ;;
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  "logs")
    logs
    ;;
  *)
    echo "Usage: ./run.sh [prod|dev] [update|restart|start|stop|logs]"
    exit 1
    ;;
esac
