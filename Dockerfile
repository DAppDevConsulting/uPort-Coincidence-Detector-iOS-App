FROM node:6

WORKDIR /root/app

COPY package.json .

RUN yarn install

CMD yarn start
