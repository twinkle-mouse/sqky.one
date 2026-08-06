#!/bin/bash

set -euo pipefail

echo "Copying files to remote folder."
rsync -adrv $1 "$REMOTE:$DST/"

echo "Building remote server."
ssh "$REMOTE" chmod +x "$DST/server-build.sh"
ssh -t "$REMOTE" "$DST/server-build.sh" "$DST" "/mnt/storage/shared/public/" "files2"

echo "Done!"