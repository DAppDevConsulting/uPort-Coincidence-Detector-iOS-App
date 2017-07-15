FROM node:8

WORKDIR /root/app

COPY package.json .

RUN yarn install

DEBUG=app:* yarn start
