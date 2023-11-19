function setup_prod_env() {
  if [ -e .env.production ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.production already exists"
  else
    echo "Setting environment variables in .env.production"
    # Global
    echo "ENVIRONMENT=production" >> .env.production
    echo "DEBUG=true" >> .env.production
    # Postgres Docker Image
    echo "POSTGRES_PASSWORD=examplepass" >> .env.production
    # PGAdmin Docker Image
    echo "PGADMIN_DEFAULT_EMAIL=admin@opendevnet.com" >> .env.production
    echo "PGADMIN_DEFAULT_PASSWORD=examplepass" >> .env.production
    # All Clients
    echo "PUBLIC_API_URL=https://opendevnet.com/api" >> .env.production
    echo "PUBLIC_WS_URL=ws://opendevnet.com/ws" >> .env.production
    # Web Client
    echo "LOCAL_API_URL=http://backend:5000/api" >> .env.production
    echo "LOCAL_WS_URL=ws://backend:5000/ws" >> .env.production
    echo "PUBLIC_WEBSITE_URL=https://opendevnet.com" >> .env.production
    echo "PUBLIC_WEB_CLIENT_URL=https://opendevnet.com/app" >> .env.production
    echo "PUBLIC_INTERNAL_DOCS_URL=https://opendevnet.com/internal-docs" >> .env.production
    # API
    echo "POSTGRES_HOST=127.0.0.1" >> .env.production
    echo "POSTGRES_PORT=6500" >> .env.production
    echo "POSTGRES_USER=admin" >> .env.production
    echo "POSTGRES_DB=opendevnet" >> .env.production
    echo "DATABASE_URL=postgresql://admin:password123@localhost:6500/opendevnet?schema=public" >> .env.production
    echo "CLIENT_ORIGIN=http://localhost:4000" >> .env.production
    echo "REDIS_URL=redis://127.0.0.1:6379/" >> .env.production
    echo "ACCESS_TOKEN_PRIVATE_KEY=secret" >> .env.production
    echo "ACCESS_TOKEN_PUBLIC_KEY=secret" >> .env.production
    echo "ACCESS_TOKEN_EXPIRED_IN=15m" >> .env.production
    echo "ACCESS_TOKEN_MAXAGE=15m" >> .env.production
    echo "REFRESH_TOKEN_PRIVATE_KEY=secret" >> .env.production
    echo "REFRESH_TOKEN_PUBLIC_KEY=secret" >> .env.production
    echo "REFRESH_TOKEN_EXPIRED_IN=60m" >> .env.production
    echo "REFRESH_TOKEN_MAXAGE=60" >> .env.production
  fi

  rm ./api/.env || true
  ln -s ../.env.production ./api/.env || true

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
}

function setup_dev_env() {
  if [ -e .env.local ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.local already exists"
  else
    echo "Setting environment variables in .env.local"
    # Global
    echo "ENVIRONMENT=development" >> .env.local
    echo "DEBUG=true" >> .env.local
    # Postgres Docker Image
    echo "POSTGRES_PASSWORD=examplepass" >> .env.local
    # PGAdmin Docker Image
    echo "PGADMIN_DEFAULT_EMAIL=admin@opendevnet.com" >> .env.local
    echo "PGADMIN_DEFAULT_PASSWORD=examplepass" >> .env.local
    # All Clients
    echo "PUBLIC_API_URL=http://localhost:5000/api" >> .env.local
    echo "PUBLIC_WS_URL=ws://localhost:5000/ws" >> .env.local
    # Web Client
    echo "LOCAL_API_URL=http://localhost:5000/api" >> .env.local
    echo "LOCAL_WS_URL=ws://localhost:5000/ws" >> .env.local
    echo "PUBLIC_WEBSITE_URL=http://localhost:4000" >> .env.local
    echo "PUBLIC_WEB_CLIENT_URL=http://localhost:4100/app" >> .env.local
    echo "PUBLIC_INTERNAL_DOCS_URL=http://localhost:4200/internal-docs" >> .env.local
    # API
    echo "POSTGRES_HOST=127.0.0.1" >> .env.production
    echo "POSTGRES_PORT=6500" >> .env.production
    echo "POSTGRES_USER=admin" >> .env.production
    echo "POSTGRES_DB=opendevnet" >> .env.production
    echo "DATABASE_URL=postgresql://admin:password123@localhost:6500/opendevnet?schema=public" >> .env.production
    echo "CLIENT_ORIGIN=http://localhost:4000" >> .env.production
    echo "REDIS_URL=redis://127.0.0.1:6379/" >> .env.production
    echo "ACCESS_TOKEN_PRIVATE_KEY=secret" >> .env.production
    echo "ACCESS_TOKEN_PUBLIC_KEY=secret" >> .env.production
    echo "ACCESS_TOKEN_EXPIRED_IN=15m" >> .env.production
    echo "ACCESS_TOKEN_MAXAGE=15m" >> .env.production
    echo "REFRESH_TOKEN_PRIVATE_KEY=secret" >> .env.production
    echo "REFRESH_TOKEN_PUBLIC_KEY=secret" >> .env.production
    echo "REFRESH_TOKEN_EXPIRED_IN=60m" >> .env.production
    echo "REFRESH_TOKEN_MAXAGE=60" >> .env.production
  fi

  rm ./api/.env || true
  ln -s ../.env.local ./api/.env || true
}

if [ "$1" == "prod" ]; then
  setup_prod_env
elif [ "$1" == "dev" ]; then
  setup_dev_env
fi
