# docker-compose-laravel
- `cd src && cp .env.example .env`
- `docker-compose up -d --build`
- `docker-compose run --rm composer update`
- `docker-compose run --rm artisan migrate`
