# Use a imagem oficial do PHP com suporte ao FPM
FROM php:7.4-fpm

# Instale as extensões do PHP necessárias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Defina o diretório de trabalho no contêiner
WORKDIR /var/www

# Exponha a porta 9000 para conexões do nginx
EXPOSE 9000
