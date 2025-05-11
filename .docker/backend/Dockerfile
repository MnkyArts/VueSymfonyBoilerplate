FROM php:8.4

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    zip \
    wget \
    && docker-php-ext-install intl zip

# Install PostgreSQL driver
RUN apt-get install -y libpq-dev \
    && docker-php-ext-install pdo_pgsql

# Install Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash \
    && mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Install Composer
RUN wget https://getcomposer.org/installer -O composer-setup.php \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && rm composer-setup.php

# Set working directory
WORKDIR /var/www/html

# Copy application code
COPY . /var/www/html

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Check if the vendor directory exists, and if not, run composer install
RUN if [ ! -d "/var/www/html/vendor" ]; then composer install; fi

# Expose port 8000
EXPOSE 8000

# Serve the Symfony project on port 8000 and allow all IPs
CMD ["symfony", "serve", "--no-tls", "--port=8000", "--allow-all-ip"]