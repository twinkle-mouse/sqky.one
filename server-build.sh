#!/bin/bash

set -euo pipefail

cd "$1"

pnpm purge
pnpm install
NODE_ENV=production SITE_CONFIG=Files_SqkyOne ROOT_DIR="$2" FILES_SERVER_NAME="$3" pnpm run build
NODE_ENV=production SITE_CONFIG=The_SqkyOne pnpm run build
