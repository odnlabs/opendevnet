#!/bin/bash

# ANSI color codes
export BOLD='\033[1m'
export RESET='\033[0m' # No color or formatting
export RED='\033[0;31m'
export YELLOW='\033[0;33m'
export GREEN='\033[0;32m'
export BLUE='\033[0;34m'

# Enable the "exit on error" option, so that if any command fails the script will exit
set -e

function run_script() {
  local script="$1"
  local args=("${@:2}")
  chmod +x tools/scripts/"$script".sh
  ./tools/scripts/"$script".sh "${args[@]}"
}

function help() {
  awk -v BOLD="$BOLD" -v BLUE="$BLUE" -v YELLOW="$YELLOW" -v RESET="$RESET" \
  '{gsub(/{{BOLD}}/, BOLD); gsub(/{{BLUE}}/, BLUE); gsub(/{{YELLOW}}/, YELLOW); gsub(/{{RESET}}/, RESET); print}' \
  ./tools/scripts/help.txt
}

# Check if the environment argument is specified
if [ -z "$1" ]; then
  help
  exit 1
fi

args=("$@")

# Set the environment file based on the argument
if [ "$1" == "prod" ]; then
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.production.yml"
  run_script docker "${args[@]}"
elif [ "$1" == "dev" ]; then
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.development.yml"
  run_script docker "${args[@]}"
elif [ "$1" == "test" ]; then
  if [ -e .env.production ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.production already exists"
  else
    echo "Setting environment variables in .env.production"
    echo "ENVIRONMENT=production" >> .env.production
    echo "DEBUG=true" >> .env.production
    echo "PUBLIC_API_URL=https://opendevnet.com/api" >> .env.production
    echo "PUBLIC_WS_URL=ws://opendevnet.com/ws" >> .env.production
    echo "PUBLIC_SITE_URL=https://opendevnet.com" >> .env.production
    echo "PUBLIC_WEB_URL=https://opendevnet.com/app" >> .env.production
    echo "PUBLIC_INTERNAL_URL=https://opendevnet.com/app" >> .env.production
  fi
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.test.yml"
  run_script docker "${args[@]}"
elif [ "$1" == "check" ]; then
  run_script check "${args[@]}"
else
  help
  exit 1
fi

