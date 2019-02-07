This is a sample Weather app server which exposes a few REST APIs that helps in determining the weather from a list of cities. This uses the OpenWeatherMap API and postgreSQL DB
How to Install:
1. Once the repository is cloned, run `npm install` in order to install dependencies.
2. Run `npm start` to start the nodeJS server

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
The app is listening  to port 3001 by default which can be changed in the .env file.

Directory structure :

weather-app-server
|
|--- .env - configuration file with DB details and API keys to the external API. It contains sample values as of now
|
|--- server.js  - the initial server file which Starts the server.
|
|---server - folder
    |
    |---- data - has capitals.json which is teh list of capitals returned by get/capitals API
    |---- db
         |---- postgresSetup.js - One time setup to create the required tables with schema
         |---- user.js - File to communicate with the DB to fetch data of users
    |
    |----external
         |---- api.js -  Wrapper layer for external APIs 
         |---- weather.js - Wrapper layer for openWeatherMap APIs
    |
    |----routes
         |---- jwtAuth.js - JWT authentication module
         |---- route.js - Router for non auth routes
         |---- routesWeather.js - Router for auth routes


API details:
-----------

All APIs will respond with the following error codes 

0 - success
100 - failure
99 - JWT Token errors

1. POST /signUp  - adds a new User to the DB
    Request:
        Header : Content-Type : "application/json"
        Body : userId - string - denoting the UserId 
             : pwd - string - denoting the password

    Response:
        errorCode 
        statusMsg

2. POST /authenticate  - Verifies an existing user's credentials.
    Request:
        Header : Content-Type : "application/json"
        Body : userId - string - denoting the UserId 
             : pwd - string - denoting the password

    Response:
        errorCode 
        statusMsg
        token - string - JWT auth token

3. GET /weather/get/capitals  - Gets the list of world capitals
    Request:
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request

    Response:
        errorCode 
        data - JSOn Object with the list of capitals and countries

4. GET /weather/get/favourites  - Gets the list of favourite capitals for the user
    Request:
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request

    Response:
        errorCode 
        favouriteCityList - Array of strings containing the User's favourite capital cities. This key is present only if the request is successfull.
        statusMsg - present only when the request errors out - Has a string describing the error.

5. POST /weather/post/favourite  - Adds a city to favourite capitals for the user
    Request:
        Header : Content-Type : "application/json"
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request
        Body : city - string containing name of city

    Response:
        errorCode 
        statusMsg

6. GET /weather/get/weather  - Gets the current weather for a given city. This internally gets details from the OpenWeatherMap API
    Request:
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request
        Query params - city - name of city

    Response:
            weather - the high level weather condition eg:"Rain"
            weatherIcon - Weather icon id for the open weatherMap API icons
            weatherDesc - Detailed description of the weather condition eg:"moderate rain",
            sunrise - sunrise time for the city in 24Hr format 
            sunset - sunrset time for the city in 24Hr format 
            temp - current temperature of the city in degree celsius
            currentTime - current time of the city
            errorCode
