function create_database() {
  # Load environment variables from .env.production file
  set -a
  source .env.production # Assumes the .env.production file contains the variables
  set +a

  # Extract database connection details
  DB_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres)
  DB_PORT=$POSTGRES_PORT
  DB_USERNAME=$POSTGRES_USER
  DB_PASSWORD=$POSTGRES_PASSWORD
  DB_NAME=$POSTGRES_DB

  export PGPASSWORD="$DB_PASSWORD"

  # Check if the database already exists
  if psql "postgresql://$DB_USERNAME@$DB_HOST:$DB_PORT/$DB_NAME" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "Database '$DB_NAME' already exists. Skipping creation."
  else
    # Create the database
    createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USERNAME" -w "$DB_PASSWORD" "$DB_NAME"
    echo "Database '$DB_NAME' created successfully."
  fi

  unset PGPASSWORD # Unset the password after the command execution for security reasons
}

function setup_prod_env() {
  local env="$1"

  if [ -e .env.production ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.production already exists"
  else
    echo "Setting up environment variables in .env.production"
    cp ./tools/scripts/data/.env.example.production ./.env.production || true
  fi

  rm ./api/.env 2> /dev/null || true
  ln -s ./.env.production ./.env || true

  exit 0

  if [ "$env" == "api" ]; then
    packages=("build-essential" "pkg-config" "libssl-dev")
    for package in "${packages[@]}"; do
      if dpkg-query -W -f='${Status}' "$package" 2> /dev/null | grep -q "installed"; then
        echo -e "${GREEN}PASS${RESET} $package is installed"
      else
        echo -e "${YELLOW}FAIL${RESET} $package is not installed, installing..."
        sudo apt -y install "$package"
      fi
    done

    # Install cargo
    if [ -e ~/.cargo/bin/cargo ]; then
      echo -e "${GREEN}PASS${RESET} cargo is installed"
    else
      echo -e "${YELLOW}FAIL${RESET} cargo is not installed, installing..."
      curl https://sh.rustup.rs -sSf | sh -s -- -y
      source ~/.cargo/env
    fi

    # Install Postgres
    if [ -e psql ]; then
      echo -e "${GREEN}PASS${RESET} psql is installed"
    else
      echo -e "${YELLOW}FAIL${RESET} psql is not installed, installing..."
      sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
      wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
      sudo apt update
      sudo apt -y install postgresql
    fi

    # Create database if doesn't exist
    create_database

    # Install sqlx-cli
    if [ -e ~/.cargo/bin/sqlx ]; then
      echo -e "${GREEN}PASS${RESET} sqlx-cli is installed"
    else
      echo -e "${YELLOW}FAIL${RESET} sqlx-cli is not installed, installing..."
      cargo install sqlx-cli
    fi

    # Migration
    cd api
    sqlx migrate run
    cd ../
  fi
}

function setup_ci_env() {
  local env="$1"

  if [ -e .env.ci ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.ci already exists"
  else
    echo "Setting up environment variables in .env.ci"
    cp ./tools/scripts/data/.env.example.ci ./.env.ci || true
  fi

  rm ./.env 2> /dev/null || true
  ln -s ./.env.ci ./.env || true
}

function setup_dev_env() {
  local env="$1"

  if [ -e .env.local ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.local already exists"
  else
    echo "Setting up environment variables in .env.local"
    cp ./tools/scripts/data/.env.example.local ./.env.local || true
  fi

  rm ./.env 2> /dev/null || true
  ln -s ./.env.local ./.env || true
}

if [ "$1" == "prod" ]; then
  if [ "$2" == "api" ]; then
    setup_prod_env $2
  else
    setup_prod_env
  fi
elif [ "$1" == "ci" ]; then
  if [ "$2" == "api" ]; then
    setup_ci_env $2
  else
    setup_ci_env
  fi
elif [ "$1" == "dev" ]; then
  if [ "$2" == "api" ]; then
    setup_dev_env $2
  else
    setup_dev_env
  fi
fi
