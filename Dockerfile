FROM node:15-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD [ "node", "src/server.js" ]

