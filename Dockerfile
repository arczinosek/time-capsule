FROM alpine:3.21.2 AS os
RUN apk update && apk upgrade && apk add npm

FROM os AS build
COPY src test nest-cli.json package.json package-lock.json tsconfig.json tsconfig.build.json /build
WORKDIR /build
RUN npm ci && npm run build

FROM os
COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /build/dist /app/dist
WORKDIR /app

EXPOSE 3000
ENTRYPOINT ["node", "dist/main"]
