ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine

ARG VITE_API_BASE_URL

WORKDIR /app

RUN npm i -g pnpm

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN node --run build

EXPOSE 9091

CMD [ "node", "--run", "serve" ]
