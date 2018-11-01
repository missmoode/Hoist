import Express from 'express'
import 'pg'
import fs from 'fs'

import authentication from './api/authentication.js'

import Database from './database';


class App {
    constructor(port, dbHost, dbName, dbUsername, dbPassword) {
        this.express = Express()

        this.express.use('/authentication', authentication)

        this.express.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })

        this.database = new Database(dbHost, dbName, dbUsername, dbPassword)

    }
}

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
export default new App(
    config.port, 
    config.database.host, 
    config.database.name, 
    config.database.username, 
    config.database.password
    )