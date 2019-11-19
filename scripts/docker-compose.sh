#!/bin/bash

OS=$(uname -s)

if [ $OS = "Darwin" ]; then
  export COMPOSE_FILE=docker-compose.yml:docker-compose-mac.yml
fi

docker-compose run --rm node yarn install
docker-compose up -d
docker-compose logs -f
