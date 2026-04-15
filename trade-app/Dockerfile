FROM node:18-alpine

WORKDIR /trade-app

COPY package*.json ./

RUN npm install --registry https://registry.npmmirror.com
RUN npm install swagger-ui-express swagger-jsdoc --registry https://registry.npmmirror.com

COPY . .

EXPOSE 8080

CMD ["npm", "start"]