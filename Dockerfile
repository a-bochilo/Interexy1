FROM node:18 AS build
WORKDIR /usr/src/build
COPY . .
RUN npm install
RUN npm run build

FROM node:18 AS app
WORKDIR /usr/src/app
RUN npm i -g http-server
COPY --from=build /usr/src/build/dist .
EXPOSE 8080
CMD ["http-server"]