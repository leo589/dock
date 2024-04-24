FROM php:7.4-fpm

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libzip-dev \
        zip \
        unzip \
        vim \
        wget \
        git \
        curl && \
    rm -rf /var/lib/apt/lists/* && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) gd mysqli pdo pdo_mysql zip

COPY nginx.conf /etc/nginx/nginx.conf

COPY . /var/www/html

RUN sed -i 's/\.php/\.php\$request_uri/' /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
