#!/bin/bash

set -euo pipefail

export DST="/usr/local/etc/nginx-indexing"
export REMOTE="madeline@v2202508295396374808.supersrv.de"

FILES_TO_COPY=$(echo ./{"common","fonts","noto-emoji","public","sites","site-configs.json","astro.config.ts","tsconfig.json","typings","package.json","pnpm-lock.yaml","pnpm-workspace.yaml","server-build.sh"})

echo "Installing local server..."
chmod +x ./server-copy-and-build-local.sh
./server-copy-and-build-local.sh "$FILES_TO_COPY"

echo "Restarting local systemd service."
sudo systemctl restart nginx-index.service

echo

echo "Installing remote server..."
chmod +x ./server-copy-and-build-remote.sh
./server-copy-and-build-remote.sh "$FILES_TO_COPY"
echo "Restarting remote systemd service."
ssh -t "$REMOTE" sudo systemctl restart nginx-index.service