FROM node:10-alpine
RUN mkdir -p /home/node/zappy/node_modules && chown -R node:node /home/node/zappy
WORKDIR /home/node/zappy
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "server.js" ]