FROM node:14.17.6-alpine AS frontend

WORKDIR /app

COPY package.json /app/package.json
RUN npm install --silent
RUN npm config set unsafe-perm true
COPY . /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=frontend /app/build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080/tcp
CMD ["nginx", "-g", "daemon off;"]