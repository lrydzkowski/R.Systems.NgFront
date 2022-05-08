FROM node:lts as build
WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build /usr/local/app/dist/r-systems-ng-front /usr/share/nginx/html
COPY ./server/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80