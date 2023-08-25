#! /usr/bin/env sh
set -e

BACKEND_URL_KEY=${BACKEND_URL_KEY}
WALLET_NETWORK_KEY=${WALLET_NETWORK_KEY}

env_content='BACKEND_URL_KEY='$BACKEND_URL_KEY'\nWALLET_NETWORK_KEY='$WALLET_NETWORK_KEY'\n'
printf "$env_content" > /usr/share/nginx/html/.env

echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/html/.env >> /usr/share/nginx/html/env-config.js
echo "}" >> /usr/share/nginx/html/env-config.js

sed -i.bak 's~<body[^>]*>~&<script src="env-config.js"></script>~' /usr/share/nginx/html/index.html

exec "$@"
