FROM nginx:stable-alpine
COPY . /usr/share/www/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]