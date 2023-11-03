#!/bin/bash
# Checks if the environment is set up correctly

passed=true

function software_check() {
  # Check if required software is installed
  echo -e "${BLUE}CHECK${RESET} If required software is installed"
  software=("docker" "docker-compose" "git")
  missing_software=()
  for software_name in "${software[@]}"; do
    if [ -x "$(command -v $software_name)" ]; then
      echo -e "${GREEN}PASS${RESET} $software_name is installed"
    else
      echo -e "${RED}FAIL${RESET} $software_name is not installed"
      missing_software+=("$software_name")
      passed=false
    fi
  done
}

function file_check() {
  # Check if required files exist
  echo -e "${BLUE}CHECK${RESET} If required files exist"
  file_paths=(".env.production" "docker/production/nginx.conf" "docker/production/ssl/opendevnet.crt" "docker/production/ssl/opendevnet.key")
  missing_files=()
  for file in "${file_paths[@]}"; do
    if [ -e "$file" ]; then
      echo -e "${GREEN}PASS${RESET} $file exists"
    else
      echo -e "${RED}FAIL${RESET} $file does not exist"
      missing_files+=("$file")
      passed=false
    fi
  done
}

function env_check() {
  echo -e "${BLUE}CHECK${RESET} If required environment variables are set amd and valid"
  variables=("ENVIRONMENT" "DEBUG" "PUBLIC_API_URL" "PUBLIC_WS_URL" "PUBLIC_SITE_URL" "PUBLIC_WEB_URL" "PUBLIC_INTERNAL_URL")

  required_http_vars=("PUBLIC_API_URL" "PUBLIC_SITE_URL" "PUBLIC_WEB_URL", "PUBLIC_INTERNAL_URL")
  valid_environments=("development" "production")

  missing_variables=()
  invalid_variables=()
  source .env.production
  for var in "${variables[@]}"; do
    if [[ -n "${!var}" ]]; then
      if [[ " ${required_http_vars[*]} " =~ " $var " && ! ( "${!var}" == http://* || "${!var}" == https://* ) ]]; then
        echo -e "${RED}FAIL${RESET} $var environment variable does not start with 'http://' or 'https://'"
        invalid_variables+=(""$var" does not start with not 'http://' or 'https://'")
        passed=false
      elif [[ "$var" == "DEBUG" && !(" true false " =~ " ${!var} ") ]]; then
        echo -e "${RED}FAIL${RESET} $var environment variable is not 'true' or 'false'"
        invalid_variables+=(""$var" is not 'true' or 'false'")
        passed=false
      elif [[ "$var" == "PUBLIC_WS_URL" && ! ( "${!var}" == ws://* || "${!var}" == wss://* ) ]]; then
        echo -e "${RED}FAIL${RESET} $var environment variable does not start with 'ws://' or 'wss://'"
        invalid_variables+=(""$var" does not start with 'ws://' or 'wss://'")
        passed=false
      elif [[ "$var" == "ENVIRONMENT" && ! " ${valid_environments[*]} " =~ " ${!var} " ]]; then
        echo -e "${RED}FAIL${RESET} $var environment variable is not 'development' or 'production'"
        invalid_variables+=(""$var" is not 'development' or 'production'")
        passed=false
      else
        echo -e "${GREEN}PASS${RESET} $var environment variable is set and valid"
      fi
    else
      echo -e "${RED}FAIL${RESET} $var environment variable is not set"
      missing_variables+=("$var")
      passed=false
    fi
  done
}

function repo_sync_check() {
  # Check if the repository is in sync with origin
  echo -e "${BLUE}CHECK${RESET} If the repository is in sync with origin"
  repo_synced=true
  repo_url="https://github.com/odnlabs/opendevnet.git"
  branch="main"
  if [ "$(git rev-parse HEAD)" = "$(git rev-parse origin/$branch)" ]; then
      echo -e "${GREEN}PASS${RESET} Repository is in sync with origin/$branch"
  else
      echo -e "${RED}FAIL${RESET} Repository is not in sync with origin/$branch"
      repo_synced=false
      passed=false
  fi
}

# If the environment is not test, run these checks
if [ "$env" != "test" ]; then
  software_check
  file_check
  repo_sync_check
fi

env_check

echo ""

if [ $passed == true ]; then
  echo -e "${GREEN}✅ Your environment is setup correctly!${RESET}"
  echo ""
else
  echo -e "❌ ${RED}Your environment is not setup correctly:${RESET}"
  # Missing software
  if [ ! ${#missing_software[@]} -eq 0 ]; then
    for missing_software_name in "${missing_software[@]}"; do
      echo -e "  • Missing software: "$missing_software_name""
    done
  fi

  # Missing files
  if [ ! ${#missing_files[@]} -eq 0 ]; then
    for missing_file in "${missing_files[@]}"; do
      echo -e "  • Missing file: "$missing_file""
    done
  fi

  # Missing environment variables
  if [ ! ${#missing_variables[@]} -eq 0 ]; then
    for missing_variable in "${missing_variables[@]}"; do
      echo -e "  • Missing environment variable: "$missing_variable""
    done
  fi

  # Invalid environment variables
  if [ ! ${#invalid_variables[@]} -eq 0 ]; then
    for invalid_variable in "${invalid_variables[@]}"; do
      echo -e "  • "$invalid_variable""
    done
  fi

  # Outdated repository
  if [ "$repo_synced" == false ]; then
    echo -e "  • Repository is not in sync with origin/${branch}"
  fi

  echo ""

  exit 1
fi

