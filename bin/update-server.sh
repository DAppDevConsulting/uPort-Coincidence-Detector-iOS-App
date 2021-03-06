#!/bin/bash

cd `dirname $0`
cd ..

set -ex

git reset --hard && \
git pull && \
docker-compose down && \
docker-compose build && \
docker-compose up -d
