FROM nginx:stable-alpine

COPY www/usr /share/nginx/html

EXPOSE 80

CMD [ "nginx" "-g" "daemon off;" ]