FROM node:14.17.6-alpine AS frontend

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install --silent
RUN npm config set unsafe-perm true
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]