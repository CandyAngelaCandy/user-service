FROM node:15-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8000
CMD [ "node", "src/server.js" ]

