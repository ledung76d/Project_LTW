FROM php:8.0-fpm-alpine

RUN mkdir -p /var/www/api

WORKDIR /var/www/api

# Install dependencies
RUN apk add --no-cache \
        postgresql-dev \
        libpq \
        libjpeg-turbo \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
        freetype \
        freetype-dev \
        zlib-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp
RUN docker-php-ext-install gd
RUN docker-php-ext-install pdo pdo_pgsql pgsql

USER laravel

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
