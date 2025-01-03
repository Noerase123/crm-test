## Instructions for running the crm apps

## Instructions for Laravel app

Step #1: go to the backend project

```
cd ./crm-app-test
```

Step #2: duplicate .env-example and rename .env file:

```
# add your DB credentials here
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=<your database>
DB_USERNAME=<your username>
DB_PASSWORD=<your password>
```

Step #3: install dependencies with composer [learn how to install composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos):

```
composer install
```

Step #4: run your docker and run command:

```
docker compose up -d or sail up
```

Step #5: run command for DB migration:

```
sail artisan migrate
```

Step #6: restart your docker container:

```
sail restart
```

## Instructions for React app

Step #1: go to the frontend project

```
cd ./crm-web-test
```

Step #2: run your docker and run command:

```
docker compose up -d
```

### Optional run your app locally on react application

Create .env file & install dependencies via command `npm install`:

```
REACT_APP_BASE_URL=http://localhost/api
```

### for laravel application to run locally

Install dependencies with `composer install` & run command `php artisan serve`
