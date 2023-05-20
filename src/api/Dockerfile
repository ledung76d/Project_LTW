FROM php:8.2-apache-bullseye

ENV PHP_MAX_EXECUTION_TIME=30
ENV PHP_MEMORY_LIMIT=128M
ENV PHP_DISPLAY_ERRORS=Off
ENV PHP_POST_MAX_SIZE=8M
ENV PHP_UPLOAD_MAX_FILESIZE=2M
ENV PHP_MAX_FILE_UPLOADS=20

# Add the PHP configuration file
COPY ./php.ini /usr/local/etc/php/

# Install PHP extensions
# Install dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libwebp-dev \
    libxml2-dev \
    zip unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd pdo pdo_pgsql pgsql

# Add apache and php config for Laravel
COPY ./vhost.conf /etc/apache2/sites-available/site.conf
RUN sed -i 's/Listen 80/Listen 8080/g' /etc/apache2/ports.conf
RUN a2dissite 000-default.conf && a2ensite site.conf && a2enmod rewrite

# Change uid and gid of apache to docker user uid/gid
# (needed to solve some permissions issues when using volumes)
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

WORKDIR /var/www/html/
COPY . .

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN composer install

# Create .env file
RUN cp .env.example .env

# Generate key
RUN php artisan key:generate

RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache