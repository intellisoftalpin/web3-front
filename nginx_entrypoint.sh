#! /usr/bin/env sh
set -e

BACKEND_URL_KEY=${BACKEND_URL_KEY}
WALLET_NETWORK_KEY=${WALLET_NETWORK_KEY}
DESCRIPTION=${DESCRIPTION}
TITLE=${TITLE}
LINK=${LINK}
LINK_TEXT=${LINK_TEXT}
ACTIONS=${ACTIONS}
EXPLORER_TRANSACTIONS_LINK=${EXPLORER_TRANSACTIONS_LINK}
EXPLORER_ADDRESSES_LINK=${EXPLORER_ADDRESSES_LINK}
EXPLORER_POOLS_LINK=${EXPLORER_POOLS_LINK}

env_content='BACKEND_URL_KEY='$BACKEND_URL_KEY'\nWALLET_NETWORK_KEY='$WALLET_NETWORK_KEY'\nDESCRIPTION='$DESCRIPTION'\nTITLE='$TITLE'\nLINK='$LINK'\nLINK_TEXT='$LINK_TEXT'\nACTIONS='$ACTIONS'\nEXPLORER_TRANSACTIONS_LINK='$EXPLORER_TRANSACTIONS_LINK'\nEXPLORER_ADDRESSES_LINK='$EXPLORER_ADDRESSES_LINK'\nEXPLORER_POOLS_LINK='$EXPLORER_POOLS_LINK'\n'
printf "$env_content" > /usr/share/nginx/html/.env

echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' /usr/share/nginx/html/.env >> /usr/share/nginx/html/env-config.js
echo "}" >> /usr/share/nginx/html/env-config.js

sed -i.bak 's~<body[^>]*>~&<script src="env-config.js"></script>~' /usr/share/nginx/html/index.html

exec "$@"
