# OG Yoga Admin Tool
![Node.js](https://img.shields.io/badge/-Node.js-fff?&logo=node.js)
![JavaScript](https://img.shields.io/badge/-JavaScript-fff?&logo=JavaScript&logoColor=ddc508)
![AWS](https://img.shields.io/badge/-AWS-fff?&logo=Amazon-AWS&logoColor=232F3E)

### Table of Contents
**[Project Description](#Project-Description)**<br>
**[Project Architecture](#Project-Architecture)**<br>
**[Run Project+Setup Environment](#Run-Project+Setup-Environment)**<br>
**[Database Schema](#Database-Schema)**<br>

## Project Description

This project was built to automate the process of sending Class Reminders/Events/Feedback Surveys
for OG Yoga. This project will implement an automated script that updates
the MYSQL database with Mindbody API, as well as a administrative user interface for
modifying/tracking scheduled tasks.

## Project Architecture
```
.
├── app
│   ├── database
│          ├── migrations
│          └── dbConfig.js
│   ├── models
│          └── jobsModel.js
│   ├── routes
│          └── index.js
│   ├── views
│          ├── error.ejs
│          └── index.ejs
│   └── index.js
├── scripts
│   ├── index.js
│   └── parser.js
├── .env_sample
├── .gitignore
├── app.js
├── knexfile.js
├── package.json
├── package-lock.json
└── README.md
```

## Run Project+Setup Environment
### Setting up repository:
Dependencies you'll need: 
- Node 14+
- NPM 6+

First, clone the repository and install all node dependencies. 
```
git clone https://github.com/TritonSE/OG-Yoga.git
cd OG-Yoga
npm install
```

Second, run knex migration files for the MYSQL database:
```
knex migrate:latest
```

### Run the project:
#### Development:
```
nodemon
```
or
```
npm start
```

#### Production:
Docker:
```
In progress
```

## Database Schema
This application currently uses the following tables: (Actual design
is subject to changes)
- jobs table (jobs from mindbody Api with a scheduled timestamp)
- receivers table (receivers from mindbody API correspond to each jobs)
