# Use nginx image as base
FROM nginx:latest

# Copy site configuration file to nginx directory
COPY site.conf /etc/nginx/conf.d/site.conf

# Expose port 80
EXPOSE 80

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
