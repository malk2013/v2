const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes')
const mongoose = require('mongoose');
const cors = require("cors");
const isAuth = require('./middleware/is-auth');
class App {

    /**
     * 
     * 
     * Sets the properties to be used by this class to create the server
     * 
     */
    constructor() {
        this.expressApp = express()

        //Literal object containing the configurations
        this.configs = {
            get port() {

                return process.env.PORT || 8080
            }
        }
    }

    /**
     * 
     * 
     * Applies any middleware to be used by this app
     * 
     */
    applyMiddleware() {
        //Allows the server to parse json
        this.expressApp.use(bodyParser.json())
        this.expressApp.use(cors("*"));        
        this.expressApp.use(isAuth);
        //Registers the routes used by the app
        new Routes(this.expressApp)
        
        //connect DB
        mongoose
            .connect(
                'mongodb://localhost:27017/v1DB', {useNewUrlParser: true}
            ).then(res => console.log("Connected to DB"))
            .catch(err => console.log("Not connected"));
            
    }

    /**
     * 
     * 
     * Runs the app
     * 
     */
    run() {
        this.expressApp.listen(this.configs.port, () => {
            console.log("Express server running project on port " + this.configs.port + ".")
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
        })
    }
}

//Runs the thing
const app = new App()
app.applyMiddleware()

app.run()
