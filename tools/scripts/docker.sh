#!/bin/bash

# Update the codebase and restart Docker container(s)
function update() {
  echo "Updating docker services..."
  git pull
  # docker compose -f "$COMPOSE_FILE" down --rmi all "$SERVICE"
  docker compose -f "$COMPOSE_FILE" up --build -d "$SERVICE"
}

# Restart Docker container(s)
function restart() {
  echo "Restarting docker services..."
  docker compose -f "$COMPOSE_FILE" restart "$SERVICE"
}

# Stop Docker container(s)
function stop() {
  echo "Stopping docker services..."
  docker compose -f "$COMPOSE_FILE" down "$SERVICE"
}

# Build Docker container(s)
function build() {
  echo "Building docker services..."
  docker compose -f "$COMPOSE_FILE" build "$SERVICE"
}

# Start Docker container(s)
function start() {
  echo "Starting docker services..."
  docker compose -f "$COMPOSE_FILE" up "$SERVICE"
}

# View logs for Docker container(s)
function logs() {
  echo "Showing logs for docker services..."
  docker compose -f "$COMPOSE_FILE" logs -t -f --tail 1000 "$SERVICE"
}

# Specify the service to run, if provided
if [ -z "$3" ]; then
  SERVICE=""
else
  SERVICE="$3"
fi

# Handle command-line arguments
case "$2" in
  "update" | "restart" | "build" | "start" | "stop" | "logs")
    $2
    ;;
  *)
    echo "Invalid command: $1"
    cat ./tools/scripts/help.txt
    exit 1
    ;;
esac
