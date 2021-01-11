# Articles API:

Article provider api, using rest architecture, managing authentication with a sql database.
The api has a crud for article's authors and for articles.

## Pre-requisites:

- [npm](https://www.npmjs.com/)
- [nodeJs](https://nodejs.org/en/)

#### SQL database:

- [mysql](https://www.mysql.com/)
- [postgresql](https://www.postgresql.org/)

## Project structure:

<details>
    <summary>See structure</summary>

```console
.
├──coverage/
├──node_modules/
├──src/
│  ├──controller/
│  │  ├──apiController.js
│  │  ├──articlesController.js
│  │  ├──authorsController.js
│  │  ├──loginController.js
│  │  ├──searchController.js
│  │  └──signUpController.js
│  ├──middlewares/
│  │  ├──auth.js
│  │  ├──errorHandler.js
│  │  └──index.js
│  ├──migrations/
│  │  └──20210105145740_tables.js
│  ├──model/
│  │   ├──articlesModel.js
│  │   └──authorsModel.js
│  ├──seeds/
│  │   └──seed_tables.js
│  ├──services/
│  │   ├──articlesService.js
│  │   └──authorsService.js
│  ├──tests/
│  ├──.env
│  ├──index.js
│  ├──knex.js
│  └──kenxfile.js
├──.env
├──.eslintrc.json
├──.gitignore
├──package-lock.json
├──package.json
└──readme.md
```

</details>

## Technologies used:

- [nodeJs](https://nodejs.org/en/)
- [expressJs](https://expressjs.com/)
- [jest](https://jestjs.io/)
- [frisby](https://www.npmjs.com/package/frisby)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [knex](http://knexjs.org/)
- [objection](https://vincit.github.io/objection.js/)
- [mysql](https://www.mysql.com/)
- [pg](https://www.postgresql.org/)
- [compression](https://www.npmjs.com/package/compression)
- [helmet](https://www.npmjs.com/package/helmet)

## Running:

### Linux

#### clone the repository and install dependencies:

```console
git clone https://github.com/LulDelRey/node_challenge.git
or
git clone git@github.com:LulDelRey/node_challenge.git
cd node_challenge
npm install
```

#### create the .env file:

```console
cd src
touch .env
```

#### Declare the environment variables on the .env file:

```
PORT=
SECRET=
OUSER=
PASSWORD=
HOST=
DB_NAME_PROD=
DB_NAME_DEV=
DB_NAME_TEST=
DB_DIALECT=
LOCAL_URL=
```

#### migrate and seed the database:

```console
npx knex migrate:rollback
npx knex migrate:latest
npx knex seed:run
```

#### start with nodeJs:

```console
npm start
```

#### start with nodemon:

```console
npm run debug
```

#### test the application:

```console
npm test
```

#### see tests coverage:

```console
npm run testCoverage
```

## Api endpoints:

- #### Login:

  - Endpoint expects email and password on the request body

  - Will return status, message and token

    `POST url + /api/login`

- #### Sign Up:

  - Endpoint expects name, email, password and picture on the request body

  - Will return status, message and the object with the information passed

    `POST url + /api/sign-up`

- #### Create authors:

  - Need to be authenticated with an admin user

  - Enpoint expects name, email, password, picture and role on the request body

  - Will return status, message and the object with the information passed

    `POST url + /api/admin/authors`

- #### Read authors:

  - Need to be authenticated with an admin user

  - Endpoint expects no parameter

  - Will return status, message and a list with all the authors on the database

    `GET url + /api/admin/authors`

- #### Read author:

  - Need to be authenticated with admin user

  - Endpoint expects author id on the request params

  - Will return that specific author if it exists

  - Otherwise will return 404

    `GET url + /api/admin/authors/:id`

- #### Update authors:

  - Need to be authenticated with an admin user

  - Endpoint expects author id on the request params and author new information on the request body, all information has to be sent again in order to not update to empty values

  - Will return status, message and an author object with the new information if it was successfully

    `PUT url + /api/admin/authors/:id`

- #### Delete authors:

  Need to be authenticated with an admin user

  - Endpoint expects author id on the request params

  - Will return status, message

    `DELETE url + /api/admin/authors/:id`

- #### Create articles:

  - Need to be authenticated with an admin user

  - Endpoint expects author id from token, title, summary, first_paragraph, body and categories

  - Will return status, message and the article

    `POST url + /api/admin/articles`

- #### Read articles:

  - Need to be authenticated with an admin user

  - Endpoint expects the user to be authenticated

  - Wil return status, message and a list with all the articles

    `GET url + /api/admin/articles`

- #### Read article:

  - Need to be authenticated with an admin user

  - Endpoint expects article id from the request params

  - Will return status, message and complete article if found

    `GET url + /api/admin/articles/:id`

- #### Update articles:

  - Need to be authenticated with an admin user

  - Endpoint expects article id, author id from the token or admin, and the new information for the article, all information has to be sent again in order to not update to empty values

  - Will return status, message and the new article

    `PUT url + /api/admin/articles/:id`

- #### Delete articles:

  - Need to be authenticated with an admin user

  - Endpoint expects article id from the request params, author id from the token or admin

  - Will return status, message

    `DELETE url + /api/admin/articles/:id`

- #### Read specific article:

  - Endpoint expects article id from the request params

  - Will return status, message and simple article if found

    `GET url + /api/articles/:id`

- #### Query articles by category:

  - Endpoint expects category from the request query, if specified will return all articles for that category, if not, will return all articles

    `GET url + /api/articles?category=someCategory`

## Next steps:

- #### Chane de api database when testing
- #### Make password on the database safe
- #### Deploy database so the app can make querys
- #### Give examples of input and output on the documentation
- #### Finish all tests
- #### Add pagination for the articles
- #### Implement typescript
- #### Implement a more complete search
- #### Implement a front end to consume the api

## Challenges

- #### Learn knex + objection

It took more than i imagined to learn and apply this new orm, but i believe it is working correctly

- #### Organization

I thought I would complete this challenge faster, but i understimated the challenge, resulted
in 2 - 3 days of more work, however the application is working
