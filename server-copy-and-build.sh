#!/bin/sh

rm -rf /usr/local/etc/nginx-indexing/ || exit
mkdir -p /usr/local/etc/nginx-indexing/ || exit
cp -r ./* /usr/local/etc/nginx-indexing/ || exit
cd /usr/local/etc/nginx-indexing/ || exit
ROOT_DIR=/mnt/shared/public/ SITE_CONFIG=Files_TheSqkyOne pnpm run build || exit
systemctl restart nginx-index.service