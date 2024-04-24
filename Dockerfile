# Dockerfile

# Stage 1: Build stage for the web service (nginx)
FROM nginx:latest AS web
COPY ./site.conf /etc/nginx/conf.d/site.conf

# Stage 2: Build stage for the php service
FROM php:7.3-fpm AS php

# Stage 3: Build stage for the db service (mysql)
FROM mysql:5.7 AS db
RUN echo "--default-authentication-plugin=mysql_native_password" > /etc/mysql/conf.d/docker.cnf

# Stage 4: Final stage, copying configurations and built artifacts
FROM nginx:latest
COPY --from=web /etc/nginx/conf.d/site.conf /etc/nginx/conf.d/site.conf
COPY --from=php /usr/local/etc/php /usr/local/etc/php
COPY --from=db /etc/mysql /etc/mysql

# Expose ports
EXPOSE 80 3306

# Command to start services
CMD service nginx start && service mysql start && php-fpm
