# Tech-Blog

## Description

AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Table of Content

- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [License](#License)
- [Questions](#Questions)

## Installation

Please install the following dependencies to run the application properly:

//express, sequelize, mysql2

- npm init -y
- npm install express sequelize mysql2

// this to help protect our password and make the .env file

- npm install dotenv

//this helps hashes the password of the clients

- npm install bcrypt

//this serves as the template engine for HTML rather than build it from ground up

- npm install express-handlebars

//sets up the cookie system for database

- npm i express-session connect-session-sequelize

//install jest to run test,

- npm i jest -D

then under package.json, set your scripts/test to be under jest, seen below:
"scripts": {
"test": "jest",

if running on local computer rather than server,create .env file and enter the following:

DB_NAME ='THE DATABASE NAME YOU WANT TO NAME IT'
DB_USER ='YOUR MYSQL USER NAME'
DB_PASSWORD ='YOUR PASSWORD FOR MYSQL'

## Usage:

Run the following at the root of the project:

in terminal:
mysql -u root -p

"enter your username and password for mysql"

Enter the following:
source db/schema.sql

quit

npm start

OR

go to the website below that has been uploaded to heroku

https://tech-blogger1.herokuapp.com/

## Contributing

none

## Tests:

No testing is currently set up

## Questions

If you have any questions, please open a issue or contact the following:

Github Profile Contact: https://github.com/BenYeung4

Email Contact: byeungis@gmail.com
