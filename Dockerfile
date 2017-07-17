FROM node:6

WORKDIR /root/app

COPY package.json .

RUN yarn install

COPY . .

CMD yarn start
