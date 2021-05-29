FROM node:16-alpine3.11

WORKDIR /usr/app

COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]