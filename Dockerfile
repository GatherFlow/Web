ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

FROM base AS build

RUN npm i -g pnpm

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY --link . .

RUN node --run build

FROM base

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 9001

CMD [ "node", "--run", "serve" ]
