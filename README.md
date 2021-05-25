# OG Yoga

![OG-Yoga](https://img.shields.io/badge/OG--Yoga-PRs%20welcomed-brightgreen)

This project was built to automate the process of sending class reminders/events/feedback surveys for OG Yoga. 
The application implements an automated script that updates a MYSQL database with class data fetched from Mindbody,
sends reminder emails when necessary, and allows users to modify their scheduled tasks.

## Project Setup 

Dependencies you'll need: 
- Node 14+
- NPM 6+

First, clone the repository and install all node dependencies. 
```
git clone https://github.com/TritonSE/OG-Yoga.git
cd OG-Yoga
npm install
```

Then, fill in the environment variables from the sample config:

```
cp .env_sample .env
vim .env
```

Finally, run all migrations to setup the MYSQL database:

```
knex migrate:latest
```

To run the application, use:

```
nodemon
```
or
```
npm start
```
