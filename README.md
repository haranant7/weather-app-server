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

weather-app-server<br>
|<br>
|--- .env - configuration file with DB details and API keys to the external API. It contains sample values as of now<br>
|<br>
|--- server.js  - the initial server file which Starts the server.<br>
|<br>
|---server - folder<br>
    |<br>
    |---- data - has capitals.json which is teh list of capitals returned by get/capitals API<br>
    |---- db<br>
         |---- postgresSetup.js - One time setup to create the required tables with schema<br>
         |---- user.js - File to communicate with the DB to fetch data of users<br>
    |<br>
    |----external<br>
         |---- api.js -  Wrapper layer for external APIs <br>
         |---- weather.js - Wrapper layer for openWeatherMap APIs<br>
    |<br>
    |----routes<br>
         |---- jwtAuth.js - JWT authentication module<br>
         |---- route.js - Router for non auth routes<br>
         |---- routesWeather.js - Router for auth routes<br>


API details:
-----------

All APIs will respond with the following error codes 

0 - success<br>
100 - failure<br>
99 - JWT Token errors<br>

1. POST /signUp  - adds a new User to the DB<br>
    Request:<br>
        Header : Content-Type : "application/json"<br>
        Body : userId - string - denoting the UserId <br>
             : pwd - string - denoting the password<br>

    Response:<br>
        errorCode<br> 
        statusMsg<br>

2. POST /authenticate  - Verifies an existing user's credentials.<br>
    Request:<br>
        Header : Content-Type : "application/json"<br>
        Body : userId - string - denoting the UserId <br>
             : pwd - string - denoting the password<br>

    Response:<br>
        errorCode<br> 
        statusMsg<br>
        token - string - JWT auth token<br>

3. GET /weather/get/capitals  - Gets the list of world capitals<br>
    Request:<br>
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request<br>

    Response:<br>
        errorCode<br> 
        data - JSOn Object with the list of capitals and countries<br>

4. GET /weather/get/favourites  - Gets the list of favourite capitals for the user<br>
    Request:<br>
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request<br>

    Response:<br>
        errorCode<br> 
        favouriteCityList - Array of strings containing the User's favourite capital cities. This key is present only if the request is successfull.<br>
        statusMsg - present only when the request errors out - Has a string describing the error.<br>

5. POST /weather/post/favourite  - Adds a city to favourite capitals for the user<br>
    Request:<br>
        Header : Content-Type : "application/json"<br>
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request<br>
        Body : city - string containing name of city<br>

    Response:<br>
        errorCode<br> 
        statusMsg<br>

6. GET /weather/get/weather  - Gets the current weather for a given city. This internally gets details from the OpenWeatherMap API<br>
    Request:<br>
        Header: Authorization - Bearer token - The JWT auth token obtained from the authenticate request<br>
        Query params - city - name of city<br>

    Response:<br>
            weather - the high level weather condition eg:"Rain"<br>
            weatherIcon - Weather icon id for the open weatherMap API icons<br>
            weatherDesc - Detailed description of the weather condition eg:"moderate rain",<br>
            sunrise - sunrise time for the city in 24Hr format <br>
            sunset - sunrset time for the city in 24Hr format <br>
            temp - current temperature of the city in degree celsius<br>
            currentTime - current time of the city<br>
            errorCode<br>
