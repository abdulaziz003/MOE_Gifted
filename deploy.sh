#!/bin/bash

tar czf moe_gifted.tar.gz README.md models package-lock.json package.json public routes server.js views
scp moe_gifted.tar.gz abdulaziz@digitalocean:~
rm moe_gifted.tar.gz

ssh abdulaziz@digitalocean <<'ENDSSH'
pm2 stop gifted
rm -rf moe_gifted
mkdir moe_gifted
tar xf moe_gifted.tar.gz -C moe_gifted
rm moe_gifted.tar.gz
cd moe_gifted
npm install
pm2 start gifted
ENDSSH
