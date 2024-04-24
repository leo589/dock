FROM php:7.4-fpm

# Instale as dependências necessárias
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

# Copie o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copie os arquivos do seu aplicativo para o diretório de trabalho do Nginx
COPY . /var/www/html

# Configure o Nginx para servir os arquivos do PHP
RUN sed -i 's/\.php/\.php\$request_uri/' /etc/nginx/nginx.conf

# Exponha a porta 80 para o tráfego da web
EXPOSE 80

# Inicie o serviço do Nginx
CMD ["nginx", "-g", "daemon off;"]
