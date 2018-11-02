import Express from 'express'
import 'pg'
import fs from 'fs'
import https from 'https'

import authentication from './api/authentication.js'
import instances from './api/instances.js'

import Database from './database';


class App {
    constructor(credentials, dbHost, dbName, dbUsername, dbPassword) {
        this.express = Express()

        this.express.use('/authentication', authentication)
        this.express.use('/instances', instances)

        this.httpServer = https.createServer(credentials, this.express)

        this.httpServer.listen(443, () => {
            console.log('HTTP server running on port 443')
        })

        this.database = new Database(dbHost, dbName, dbUsername, dbPassword)
    }
}

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
export default new App(
    {
        key: fs.readFileSync(config.sslPath + 'privkey.pem', 'utf8'),
        cert: fs.readFileSync(config.sslPath + 'fullchain.pem', 'utf8')
    },
    config.database.host, 
    config.database.name, 
    config.database.username, 
    config.database.password,
    )