function setup_prod_env() {
  if [ -e .env.production ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.production already exists"
  else
    echo "Setting environment variables in .env.production"
    echo "ENVIRONMENT=production" >> .env.production
    echo "DEBUG=true" >> .env.production
    echo "PUBLIC_API_URL=https://opendevnet.com/api" >> .env.production
    echo "PUBLIC_WS_URL=ws://opendevnet.com/ws" >> .env.production
    echo "PUBLIC_WEBSITE_URL=https://opendevnet.com" >> .env.production
    echo "PUBLIC_WEB_CLIENT_URL=https://opendevnet.com/app" >> .env.production
    echo "PUBLIC_INTERNAL_DOCS_URL=https://opendevnet.com/internal-docs" >> .env.production
  fi

  rm ./api/.env || true
  ln -s ../.env.production ./api/.env || true
}

function setup_dev_env() {
  if [ -e .env.local ]; then
    echo -e "${YELLOW}WARNING${RESET} .env.local already exists"
  else
    echo "Setting environment variables in .env.local"
    echo "ENVIRONMENT=development" >> .env.local
    echo "DEBUG=true" >> .env.local
    echo "PUBLIC_API_URL=http://localhost:5000/api" >> .env.localw
    echo "PUBLIC_WS_URL=ws://localhost:5000/ws" >> .env.local
    echo "PUBLIC_WEBSITE_URL=http://localhost:4000" >> .env.local
    echo "PUBLIC_WEB_CLIENT_URL=http://localhost:4100/app" >> .env.local
    echo "PUBLIC_INTERNAL_DOCS_URL=http://localhost:4200/internal-docs" >> .env.local
  fi

  rm ./api/.env || true
  ln -s ../.env.local ./api/.env || true
}

if [ "$1" == "prod" ]; then
  setup_prod_env
elif [ "$1" == "dev" ]; then
  setup_dev_env
fi
