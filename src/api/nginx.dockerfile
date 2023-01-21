
FROM nginx:alpine

ADD ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
