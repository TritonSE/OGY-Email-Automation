# OG Yoga

![OG-Yoga](https://img.shields.io/badge/OG--Yoga-PRs%20welcomed-brightgreen)


### Table of Contents
**[Project Description](#Project-Description)**<br>
**[File Structure](#File-Structure)**<br>
**[Run Project and Setup Environment](#Run-Project-and-Setup-Environment)**<br>
**[Database Schema](#Database-Schema)**<br>

## Project Description

This project was built to automate the process of sending Class Reminders/Events/Feedback Surveys
for OG Yoga. 
The application will implement an automated script that updates
the MYSQL database with Mindbody API utilizing repeating jobs, as well as an administrative user interface for
modifying/tracking scheduled tasks.

## File Structure
```
.
├── app
│   ├── database
│   │      ├── migrations
│   │      └── dbConfig.js
│   ├── models
│   │      └── jobsModel.js
│   ├── routes
│   │      └── index.js
│   ├── views
│   │      ├── error.ejs
│   │      └── index.ejs
│   └── index.js
├── modules
│   └── mailer.js
├── scripts
│   ├── index.js
│   └── parser.js
├── utils
│   └── getDateByInterval.js
├── .env_sample
├── .gitignore
├── app.js
├── knexfile.js
├── package.json
├── package-lock.json
└── README.md
```

## Run Project and Setup Environment
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
