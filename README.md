# miami

Umami is a simple, fast, privacy-focused alternative to Google Analytics, and Miami is a fork of it that introduces many new features:

- Design:
  - Custom branding for site
  - Higher quality icons
- API:
  - Some API requests do not need to be bound by date
  - The share id _is_ the token, so additional requests are not needed
- QOL:
  - Click map to set country
    - Set region and city from home page
  - Line charts
  - Ongoing efforts to reduce script sizes and hosting costs

You can see a demo of miami [here](https://espy.boehs.org/share/JGBYO4bVg3kZVQUb).

## Getting started

A detailed getting started guide can be found at [https://umami.is/docs/](https://umami.is/docs/)

## Installing from source

### Requirements

- A server with Node.js version 16.13 or newer
- A database. Umami supports [MySQL](https://www.mysql.com/) and [Postgresql](https://www.postgresql.org/) databases.

### Install

```
npm install -g yarn
git clone https://github.com/umami-software/umami.git
cd umami
yarn install
```

### Configure

Create an `.env` file with the following

```
DATABASE_URL=connection-url
```

The connection url is in the following format:

```
postgresql://username:mypassword@localhost:5432/mydb

mysql://username:mypassword@localhost:3306/mydb
```

### Build

```bash
yarn build
```

The build step will also create tables in your database if you ae installing for the first time. It will also create a login user with username **admin** and password **umami**.

### Start

```bash
yarn start
```

By default this will launch the application on `http://localhost:3000`. You will need to either
[proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) requests from your web server
or change the [port](https://nextjs.org/docs/api-reference/cli#production) to serve the application directly.

## Installing with Docker

To build the umami container and start up a Postgres database, run:

```bash
docker compose up -d
```

There are not currently prebuilt docker images for miami

## Getting updates

To get the latest features, simply do a pull, install any new dependencies, and rebuild:

```bash
git pull
yarn install
yarn build
```

To update the Docker image, simply pull the new images and rebuild:

```bash
docker compose pull
docker compose up --force-recreate
```

## License

MIT
