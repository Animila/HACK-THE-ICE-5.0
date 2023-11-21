FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN sh -c "sleep 10"

CMD ["npm","run", "dev"]