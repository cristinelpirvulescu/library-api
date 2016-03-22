# Library API

This is a REST API with the purpose of administering a virtual library.
  - Requests to the API need to be authenticated;
  - Basic CRUD operations;

## Technologies Used:
  - Express(NodeJS);
  - MongoDB;
  - JWT;
  - ECMAScript 6

## Instalation and Usage
The recommended installation method is a local NPM install for the project

```$ npm install```

After everything is installed, just run

```$ node app.js```

This will create the server and automatically connect to the mongoDB database specified in ```config.js```

## ENDPOINTS

  **Additional Info:** After authenticating the user, the received token must be added in header for all requests (except `/api/signup` and `/api/auth`).

  Otherwise, the following error will occur:
  ```
  {
    "success": false,
    "message": "No token provided."
  }
  ```
  1. **Create** a new user
    - **URL**

      `/api/signup`

    - **METHOD**

      ```POST```

    - **URL Params**

      None

    - **Data Params**
      ```
      username=[string]
      password=[string]
      ```
    - **Success Response**

      `Code: 200`

    - **Error Response**

      `Internal Server Error`

    - Sample Call

      `/api/signup`

      With the following values specified in the body:
      ```
      username: sampleuser
      password: testpassword```

  2. **Authenticate** an existing user
    - **URL**

      `/api/auth`

    - **METHOD**

      `POST`

    - **URL Params**

      None

    - **Data Params**

      ```
      username=[string]
      password=[string]
      ```
    - **Success Response**

      `Code: 200`

      ```
      Content: {
        success: true,
        message: 'Token was created',
        token: '<token>'
      }```
    - **Error Response**

      `Internal Server Error`

    - Sample Call

      `/api/signup`

      With the following values specified in the body:
      ```
      username: sampleuser
      password: testpassword```

  3. **Create** a new book
    - **URL**

      `/api/books`

    - **METHOD**

      `POST`

    - **URL Params**

      None

    - **Data Params**

      ```
      title=[string]
      author=[string]
      isbn=[string]
      year=[number]
      genre=[string]
      ```
    - **Success Response**

      `Code: 200`

    - **Error Response**

      `Internal Server Error`

    - Sample Call

      `/api/books`

      With the following values specified in the body:
      ```
      title: Test Book
      author: Test Author
      year: 1900
      isbn: ISBN-123-456
      genre: comedy
      ```
  4. **Update** a book
    - **URL**

      `/api/books/:id`

    - **METHOD**

      `POST`

    - **URL Params**

      `id=[string]`

    - **Data Params**

      ```
      title=[string]
      author=[string]
      isbn=[string]
      year=[number]
      genre=[string]
      ```
    - **Success Response**

      `Code: 200`

    - **Error Response**

      `Internal Server Error`

    - Sample Call

      `/api/books/56edcb41aef1a07f610f2256`

      With the following values specified in the body:
      ```
      title: Changed Book
      author: Changed Author
      year: 1900
      isbn: ISBN-123-456
      genre: drama
      ```
  5. **Delete** a book
    - **URL**

      `/api/books/:id`

    - **METHOD**

      `POST`

    - **URL Params**

      `id=[string]`

    - **Data Params**

      None

    - **Success Response**

      `Code: 200`

    - **Error Response**

      `Internal Server Error`

    - Sample Call

      `/api/books/56edcb41aef1a07f610f2256`

      `Code: 200`

  6. **List** all Books
    - **URL**

      `/api/books`

    - **METHOD**

      `GET`

    - **URL Params**

      [queryParams-optional]

    - **Data Params**

      None

    - **Success Response**

      `Code: 200`
      ```
      [
        {
          "_id": "56f11cfd3178d5558c8e8dd8",
          "title": "Moara cu Noroc",
          "author": "Ioan Slavici",
          "genre": "novel",
          "year": 1921,
          "__v": 0
        },
        {
          "_id": "56f11d513178d5558c8e8dd9",
          "title": "Ion",
          "author": "Liviu Rebreanu",
          "genre": "novel",
          "year": 1921,
          "__v": 0
        },
        {
          "_id": "56f11d683178d5558c8e8dda",
          "title": "O scrisoare pierduta",
          "author": "Ion Luca Caragiale",
          "genre": "comedy",
          "year": 1918,
          "__v": 0
        },
        {
          "_id": "56f11d913178d5558c8e8ddb",
          "title": "Baltagul",
          "author": "Mihail Sadoveanu",
          "genre": "novel",
          "year": 1930,
          "__v": 0
        }
      ]
      ```

    - **Error Response**

      `Internal Server Error`

    - Sample Call

      `/api/books?year=1921`
      Produces the next reponse:
      ```
      [
        {
          "_id": "56f11cfd3178d5558c8e8dd8",
          "title": "Moara cu Noroc",
          "author": "Ioan Slavici",
          "genre": "novel",
          "year": 1921,
          "__v": 0
        },
        {
          "_id": "56f11d513178d5558c8e8dd9",
          "title": "Ion",
          "author": "Liviu Rebreanu",
          "genre": "novel",
          "year": 1921,
          "__v": 0
        }
      ]
      ```


