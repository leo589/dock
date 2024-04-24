# Use a imagem base do PHP com FPM
FROM php:fpm

# Instalação de pacotes adicionais
RUN apt-get update && apt-get install -y nginx

# Limpeza do cache do apt
RUN apt-get clean

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Configura o servidor web
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Copia o código PHP para a pasta raiz do servidor web
COPY www /var/www/html

# Expõe a porta 80 para tráfego da web
EXPOSE 80

# Inicia os serviços necessários
CMD service nginx start && php-fpm
