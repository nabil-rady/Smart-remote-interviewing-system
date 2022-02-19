FROM node:lts-alpine3.14

RUN npm install --global nodemon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]