FROM node:16-slim

WORKDIR /app

COPY package.json  /app/

RUN cd /app && npm set progress=false && npm install

COPY .  /app

RUN cd /app && npm run build

CMD ["npm","run","live"]
