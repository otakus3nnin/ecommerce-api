FROM node:lts-alpine

RUN corepack enable

WORKDIR /app
COPY package.json pnpm-*.yaml ./

RUN  pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "dev" ]
