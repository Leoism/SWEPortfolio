# SWEPortfolio
**All references to directories are from the projects root folder unless stated otherwise.** 

This project aims to create a reusable SWE portfolio that anyone can clone and deploy on a private server.

## Setup
Before proceeding, ensure that you have installed the following:
- [Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
- [Angular](https://angular.io/guide/setup-local)
- [PostgreSQL](https://www.postgresql.org/download/)

To begin, run `npm install` to install all necessary packages. The main
packages for the project are:
```
pg - connecting to the postgresdb
dotenv - loading up .env file
@angular/material - all styling for the app
express - serves the backend API
```

Inside of the `server/` folder, create a `.env` file. The `.env` file must follow the format:
```
USERNAME=<username>
PASSWORD=<password>
ADDRESS=<host>
DATABASE=<database>
PORT=<port>
```
Where
- \<username\>: your postgres username
- \<password\>: your postgres password
- \<host\>: the address your postgres database is at. For local instances, this is usually `localhost`
- \<database\>: the name of the postgres database
- \<port\>: the port number that postgres is listening at

`server/server.js` contains a corsOptions variable near the top of the folder. This variable contains a parameter called `origin`. To avoid errors related to CORS, origin should be set to the address of your application. In local instances, this would be the address that angular runs the app. In deployed setting, this should be the domain name, or ip address of your app.

## Building
For local instances, you can run the application by running `ng serve` at the root folder and running `node server.js` inside of the `server/` folder.

By default, the express server listens at port 8080. 

## Deploying
This project contains a `deploy.sh` application that makes building the app for deployment easy. `deploy.sh` contains three flags:
```
--url
--password
--init
```
Usage
- --url \<url of your app\>
  - Replaces the baseUrl variable of `DatabaseCommunicator.ts` with the given url. Use this flag when you want to update the url that the api is pointing at
  - example: `./deploy.sh --url https://example.com`
- --password \<password\>
  - Creates a password and stores it inside the postgres database to protect editing the website. Use this flag when you want to create a password for your application.
  - example: `./deploy.sh --password password123`
    - If your password contains special characters, wrap it inside quotes.
- -- init
  - Initializes the postgres database schema for your application and creates the database `portfoliodb`
  - example: `./deploy.sh --init`
    - This flag should only be called once

For first time setup, you may run the script as so:
```
./deploy.sh --init --password password123 --url https://example.com
```
After running the `./deploy.sh` script, the Angular app gets built and the application contents can be found inside the `dist/` folder.

Copy over the contents of `dist/` folder into your server.

### Setting up Nginx
This application was testing on Ubuntu 18 LTS and using Nginx. Since Angular creates Single Page Applications, the frontend can easily be served by updating your Nginx config to serve folder.

For this scenario, all contents will be inside the `/var/www/html/` folder of the server. Assuming all the contents of the `dist/` folder are inside `/var/www/html/` folder, you can create a simple Nginx config file like so:
```
server {
  ...
  index index.html;
  root /var/www/html;

  location / {
    try_files $uri $uri/ /index.html;
  }
  ...
}
``` 

To run the express server along with the angular app, a reverse-proxy must be made. For this reason, all api calls inside the express server are prefixed with the `/api` prefix.

Inside your Nginx config file, you can add something like so to get reverse proxy to work
```
server {
  ...
  location /api/ {
    proxy_pass http://localhost:8080; # 8080 is the port express is listening
  }
  ...
}
```

After updating your Nginx config file, restart nginx, and the application should be live.
