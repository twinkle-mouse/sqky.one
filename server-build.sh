#!/bin/bash

set -euo pipefail

cd "$1"

pnpm purge
pnpm install
NODE_ENV=production FILES_ROOT_DIR="$2" FILES_SERVER_NAME="$3" pnpm run exec:files run build
NODE_ENV=production pnpm run exec:files-proxy run build
