#!/bin/bash

cd `dirname $0`
cd ..

set -ex

docker run -it \
    -p 8080:8080 \
    -p 9229:9229 \
    --env-file .env \
    -v `pwd`:/root/app \
    -v ~/.bash_history:/root/.bash_history \
    --rm \
    --name cdapp \
    cdapp bash
