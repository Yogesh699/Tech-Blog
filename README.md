# Tech Blog CMS

![image](https://github.com/Yogesh699/Tech-Blog/assets/143371945/ccb8a3da-9636-4790-88c9-927f6f3044b5)

This is a CMS-style blog site built from scratch following the Model-View-Controller (MVC) paradigm. Developers can use this platform to publish their blog posts, comment on others' posts, and engage in technical discussions. The application is deployed on Heroku and utilizes various technologies for a robust and secure development experience.

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- User authentication with secure password hashing.
- Creation, editing, and deletion of blog posts.
- Commenting functionality on blog posts.
- Responsive design for optimal user experience on different devices.
- MVC architecture for clean code organization.

## Technologies Used

- **Handlebars.js**: Templating language for creating dynamic HTML.
- **Express.js**: Web application framework for building APIs.
- **Sequelize**: ORM for MySQL database connectivity.
- **MySQL2**: MySQL database driver.
- **dotenv**: Used for environment variable management.
- **bcrypt**: Password hashing for secure authentication.
- **express-session**: Session management for user authentication.
- **connect-session-sequelize**: Session store using Sequelize for Express.js.
- **Heroku**: Cloud platform for application deployment.

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/your-username/tech-blog.git
```

## Install dependencies:
```bash
npm install
```
Create a .env file based on the provided .env.example and set your environment variables.
Set up your MySQL database using this command 
```bash
source database/createdb.sql
```
Insert Dummy Data (seeding)
```bash
npm run seed
```
Run the application:
```bash
npm run start
```
## Usage
Visit the deployed Heroku app or the local server.
Sign up or log in to start publishing blog posts and commenting.

## Deployment
link will be available when it deployed

## Contributing
Contributions are welcome! 


