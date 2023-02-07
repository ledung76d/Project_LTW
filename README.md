# docker-compose-laravel
- `cp src/api/.env.example src/api/.env`
- `cp src/frontend/.env.example src/frontend/.env`
- `docker-compose up -d --build`
- `docker-compose run --rm composer update`
- `docker-compose run --rm artisan db:seed --force`
- `docker-compose run --rm npm install`
- `docker-compose run --rm npm run build`
