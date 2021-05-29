FROM node:16-alpine3.11

WORKDIR /usr/app

COPY . ./
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]