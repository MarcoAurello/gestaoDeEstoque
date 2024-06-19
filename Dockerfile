FROM node:20.12.2-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY lnzewnasahrab2d
ENV PM2_SECRET_KEY bezc75qfv3gmwad

EXPOSE 4003

CMD ["pm2-runtime", "app.js"]