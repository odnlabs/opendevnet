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

function setup_prod_env() {
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
    echo "PUBLIC_INTERNAL_URL=https://opendevnet.com/internal" >> .env.production
  fi

  rm ./apps/api/.env || true
  ln -s ../../.env.production ./apps/api/.env || true
}

function setup_dev_env() {
  if [ -e .env.local ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.local already exists"
  else
    echo "Setting environment variables in .env.local"
    echo "ENVIRONMENT=development" >> .env.local
    echo "DEBUG=true" >> .env.local
    echo "PUBLIC_API_URL=http://localhost:5000/api" >> .env.local
    echo "PUBLIC_WS_URL=ws://localhost:5000/ws" >> .env.local
    echo "PUBLIC_SITE_URL=http://localhost:4000" >> .env.local
    echo "PUBLIC_WEB_URL=http://localhost:4100/app" >> .env.local
    echo "PUBLIC_INTERNAL_URL=http://localhost:4200/internal" >> .env.local
  fi

  rm ./apps/api/.env || true
  ln -s ../../.env.local ./apps/api/.env || true
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
      setup_prod_env
      exit 0
    fi
  elif [ "$2" == "check" ]; then
    run_script check "${args[@]}"
    exit 0
  fi
  git reset --hard
  git pull
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.production.yml"
  run_script docker "${args[@]}"
elif [ "$1" == "prodtest" ]; then
  if [ "$2" == "internal" ]; then
    run_script check ci
    echo -e "${BLUE}BUILDING${RESET} internal"
    pnpm nx run internal:build --prod --no-cache
    echo -e "${BLUE}COPYING${RESET} project.json"
    cp ./apps/internal/project.json ./dist/apps/internal || true
    echo -e "${BLUE}COPYING${RESET} tailwind.config.ts"
    cp ./apps/internal/tailwind.config.ts ./dist/apps/internal || true
    echo -e "${BLUE}COPYING${RESET} postcss.config.js"
    cp ./apps/internal/postcss.config.js ./dist/apps/internal || true
    echo -e "${BLUE}COPYING${RESET} node_modules"
    cp -rL ./apps/internal/node_modules ./dist/apps/internal || true
    echo -e "${BLUE}COPYING${RESET} .next"
    cp -rL ./apps/internal/.next ./dist/apps/internal || true
    echo -e "${BLUE}COPYING${RESET} mdx"
    cp -rL ./apps/internal/mdx ./dist/apps/internal || true
    echo -e "${BLUE}SERVING${RESET} internal"
    pnpm nx run internal:serve --prod --verbose
  else
    echo -e "${RED}ERROR${RESET} Invalid argument"
  fi
elif [ "$1" == "dev" ]; then
  if [ "$2" == "setup" ]; then
    if [ "$3" == "env" ]; then
      setup_dev_env
      exit 0
    fi
  fi
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.development.yml"
  run_script docker "${args[@]}"
elif [ "$1" == "ci" ]; then
  setup_prod_env
  run_script check "${args[@]}"
  export COMPOSE_FILE="docker-compose.ci.yml"
  run_script docker "${args[@]}"
elif [ "$1" == "check" ]; then
  run_script check "${args[@]}"
elif [ "$1" == "clean" ]; then
  run_script clean "${args[@]}"
else
  help
  exit 1
fi

