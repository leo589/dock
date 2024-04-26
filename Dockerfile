FROM nginx:stable-alpine
COPY . /usr/share/nginx/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]