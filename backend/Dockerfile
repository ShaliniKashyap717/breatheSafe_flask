FROM node:18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["sh", "-c", "node server.js & node langchain.js"]
