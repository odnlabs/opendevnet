#!/bin/bash

# Update the codebase and restart Docker container(s)
function update() {
  git pull
  if [ -n "$SERVICE" ]; then
    echo "Updating docker service $SERVICE..."
  # docker compose -f "$COMPOSE_FILE" down --rmi all "$SERVICE"
    docker compose -f "$COMPOSE_FILE" up --build -d "$SERVICE"
  else
    echo "Updating all docker services..."
    docker compose -f "$COMPOSE_FILE" up --build -d
  fi
}

# Restart Docker container(s)
function restart() {
  if [ -n "$SERVICE" ]; then
    echo "Restarting docker service $SERVICE..."
    docker compose -f "$COMPOSE_FILE" restart "$SERVICE"
  else
    echo "Restarting all docker services..."
    docker compose -f "$COMPOSE_FILE" restart
  fi
}

# Stop Docker container(s)
function stop() {
  if [ -n "$SERVICE" ]; then
    echo "Stopping docker service $SERVICE..."
    docker compose -f "$COMPOSE_FILE" down "$SERVICE"
  else
    echo "Stopping all docker services..."
    docker compose -f "$COMPOSE_FILE" down
  fi
}

# Build Docker container(s)
function build() {
  if [ -n "$SERVICE" ]; then
    echo "Building docker $SERVICE..."
    docker compose -f "$COMPOSE_FILE" build "$SERVICE"
  else
    echo "Building all docker services..."
    docker compose -f "$COMPOSE_FILE" build
  fi
}

# Start Docker container(s)
function start() {
  echo "Starting docker services..."
  if [ -n "$SERVICE" ]; then
    docker compose -f "$COMPOSE_FILE" up --build -d "$SERVICE"
  else
    docker compose -f "$COMPOSE_FILE" up --build -d
  fi
}

# View logs for Docker container(s)
function logs() {
  echo "Showing logs for docker services..."
  if [ -n "$SERVICE" ]; then
    docker compose -f "$COMPOSE_FILE" logs -t -f --tail 1000 "$SERVICE"
  else
    docker compose -f "$COMPOSE_FILE" logs -t -f --tail 1000
  fi
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
