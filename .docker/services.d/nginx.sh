#!/usr/bin/with-contenv sh
set -e;

/bin/wait.sh -t 30 127.0.0.1:9000
echo "Starting NGINX"
nginx -g "daemon off;"