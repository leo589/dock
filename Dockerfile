FROM nginx:stable-alpine
COPY . /usr/www/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]