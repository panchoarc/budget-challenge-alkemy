# Budget Challenge Alkemy

Backend for budget application using Express.js / Node.js / MySQL

***Project Status: WIP***

## TO-DO List

- [ ] Establish the CI/CD for this Project
- [ ] Create tests that doesn't depend on database.

## Technology Stack

* Backend
  * [Express.js](https://expressjs.com/)
  * [MySQL2](https://www.npmjs.com/package/mysql2)
  * [Dotenv](https://www.npmjs.com/package/dotenv)
  * [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
  * [Cors](https://www.npmjs.com/package/cors)
  * [Helmet](https://helmetjs.github.io/)
  * [Sequelize](https://sequelize.org/v6/)

* Database
  * [MYSQL](https://www.mysql.com/)

* Development Tools
  * [Docker](https://www.docker.com/)
  * [Heroku](https://www.heroku.com/)

* Testing Tools
  * [Supertest](https://www.npmjs.com/package/supertest)
  * [Jest](https://jestjs.io/)


## Getting Started

### Prerequisites
    You have to get Node.js installed on your PC.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/panchoarc/budget-challenge-alkemy.git
   ```
2. Install NPM packages for all the folder, excluding the database folder
   ```sh
   npm install
   ```
3. Create a ***.env*** with the following variables for a production environment
   1. PD:  SERVER_JWT_TOKEN_TEST only for testing purposes.
   2. If you want to change the variables for development, see config/config.js.
    ```sh
    SERVER_MYSQL_HOST=
    SERVER_MYSQL_USER=
    SERVER_MYSQL_PASSWORD=
    SERVER_MYSQL_DATABASE=
    SERVER_MYSQL_DIALECT=
    SERVER_MYSQL_PORT=
    SERVER_JWT_SECRET=
    SERVER_JWT_TOKEN_TEST=
    ```
    PD: If you want to create a docker image and run it, follow the next steps.
     ```sh
    docker build -t <ContainerName> .
    docker run -dp <ContainerPort>:<MachinePort> --name <Name> <ContainerName>
    ```
