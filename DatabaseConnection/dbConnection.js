const mongoose = require('mongoose')

const dotenv  = require("dotenv")

dotenv.config();

const dbConncection = () => {

    const URL = process.env.DB_URL;

    mongoose.connect(URL)

    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully")
    })
    
    mongoose.connection.on('disconnected', () => {
        console.log("Database disconnected")
    })

    mongoose.connection.on('error' , () => {
        console.log("Error while connecting to database")
    })

}

module.exports = dbConncection;

