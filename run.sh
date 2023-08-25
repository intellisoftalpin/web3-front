#!/usr/bin/env bash
# docker compose -f docker-compose.yml up -d --build
# docker compose -p mainnet-ctokens-frontend -f docker-compose.yml up -d --build

docker compose --env-file ./.env up -d --build
