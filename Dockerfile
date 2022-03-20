FROM node:16 as base

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . .

ENV PORT=3001 \
    DB_USER=bastion \
    DB_PASSWORD=db_password \
    DB_HOST=db-server \
    DB_PORT=27017 \
    DB_NAME=db-server

EXPOSE 3001

FROM base as development

ENV NODE_ENV=development

RUN npm install

CMD ["node", "src/index.js"]


FROM base as production

ENV NODE_ENV=production

RUN npm install --only=production \
    && npm cache clean --force

CMD ["node", "src/index.js"]
