FROM node:8

WORKDIR /usr/src/app

ADD src ./
ADD package*.json ./

RUN npm install

EXPOSE 10254

ENTRYPOINT ["node", "app.js"]