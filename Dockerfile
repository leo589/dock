# Use a imagem base do webdevops com PHP e Apache
FROM webdevops/php-apache:alpine-php7

# Copie o conteúdo do diretório local ./www para o diretório /app no contêiner
COPY ./www /app

# Exponha a porta 80 para acesso externo
EXPOSE 80