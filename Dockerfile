# Use a imagem oficial do PHP com FPM (FastCGI Process Manager) como base
FROM php:latest

# Instale as extensões do PHP necessárias
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Instale o servidor web Nginx
RUN apt-get update && apt-get install -y nginx

# Configuração do Nginx
RUN rm -rf /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-available/default
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Crie o diretório onde o aplicativo será armazenado
RUN mkdir -p /var/www/html

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Exponha a porta 80
EXPOSE 80

# Inicie o servidor Nginx e mantenha-o em execução
CMD service nginx start && tail -f /dev/null
