FROM node:20.12.2-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 4003

CMD ["npm", "run", "start"]