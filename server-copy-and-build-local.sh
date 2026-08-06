#!/bin/bash

set -euo pipefail

echo "Copying files to local folder."
sudo rsync --chown=host:host -adrv $1 "$DST/"

echo "Building local server."
sudo -u host chmod +x "$DST/server-build.sh"
sudo -u host "$DST/server-build.sh" "$DST" "/mnt/shared/public/" "files1"

echo "Done!"