## Installation

```bash
$ npm install
```

## Before running

فایل env. و gitignore. داخل سورس اصلی پروژه درست کنید. محتوای
این دو فایل رو پایین گذاشتم. اپ رو بعد نصب پکیج ها با دستور `npm run start:dev` اجرا کنید. لازم به ذکر که Redis و Mongo و Minio رو روی سیستمتون باید از قبل نصب کنید و در حال اجرا باشه. تنظیمات برنامه مربوط به این ها رو ابتدا از env variables و بعد از دیفالت داخل کانفیگ میخونه

---

Recommending to create a new env file based on your NODE_ENV.For example, if you are running the app with `npm run start:dev`, you better have **.env** file in the root folder of the project unless you are OK with running the application with default variables. Here is a sample .env file

```
PORT=3000
APP_NAME=NESTJS-APP

DATABASE_PORT=27017
DATABASE_TIMEOUT=5000
DATABASE_HOST=localhost
DATABASE_NAME=NESTJS-APP
DATABASE_USERNAME=root
DATABASE_PASSWORD=1234@db

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_NAME=root
REDIS_PASS=1234@redis

MINIO_NAME=NESTJS-APP
MINIO_HOST=localhost
MINIO_PORT=9000
MINIO_ACCESSKEY=minioadmin
MINIO_SECRETKEY=minioadmin

SECRET=strong_secret

```

And Below is the recommended .gitignore file:

```
# compiled output
/dist
/node_modules

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

# environment variables
.env

#gitignore
.gitignore
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
