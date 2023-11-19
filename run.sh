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
  if [ "$2" == "setup" ]; then
    if [ "$3" == "env" ]; then
      run_script setup prod
      exit 0
    fi
  elif [ "$2" == "check" ]; then
    run_script check "${args[@]}"
    exit 0
  fi
  git reset --hard
  git pull
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.production.yaml"
  run_script docker "${args[@]}"
elif [ "$1" == "prodtest" ]; then
  if [ "$2" == "internal_docs" ]; then
    run_script check ci
    echo -e "${BLUE}BUILDING${RESET} internal docs"
    pnpm nx run internal-docs:build --prod --no-cache
    echo -e "${BLUE}COPYING${RESET} project.json"
    cp ./apps/internal-docs/project.json ./dist/apps/internal-docs || true
    echo -e "${BLUE}COPYING${RESET} tailwind.config.ts"
    cp ./apps/internal-docs/tailwind.config.ts ./dist/apps/internal-docs || true
    echo -e "${BLUE}COPYING${RESET} postcss.config.js"
    cp ./apps/internal-docs/postcss.config.js ./dist/apps/internal-docs || true
    echo -e "${BLUE}COPYING${RESET} node_modules"
    cp -rL ./apps/internal-docs/node_modules ./dist/apps/internal-docs || true
    echo -e "${BLUE}COPYING${RESET} .next"
    cp -rL ./apps/internal-docs/.next ./dist/apps/internal-docs || true
    echo -e "${BLUE}SERVING${RESET} internal-docs"
    pnpm nx run internal-docs:serve --prod --verbose
  else
    echo -e "${RED}ERROR${RESET} Invalid argument"
  fi
elif [ "$1" == "dev" ]; then
  if [ "$2" == "setup" ]; then
    if [ "$3" == "env" ]; then
      run_script setup dev
      exit 0
    fi
  fi
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.development.yaml"
  run_script docker "${args[@]}"
elif [ "$1" == "ci" ]; then
  run_script setup prod
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.ci.yaml"
  run_script docker "${args[@]}"
elif [ "$1" == "check" ]; then
  run_script check "${args[@]}"
elif [ "$1" == "clean" ]; then
  run_script clean "${args[@]}"
else
  help
  exit 1
fi
