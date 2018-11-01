import Express from 'express'
import 'pg'
import fs from 'fs'
import https from 'https'

import authentication from './api/authentication.js'

import Database from './database';


class App {
    constructor(port, dbHost, dbName, dbUsername, dbPassword) {
        this.express = Express()

        this.express.use('/authentication', authentication)

        this.express.listen(80, () => {
            console.log(`App listening on port ${port}`)
        })

        this.httpsServer = https.createServer(credentials, this.express)

        this.httpsServer.listen(443, () => {
            console.log('HTTP server running on port 443')
        })

        this.database = new Database(dbHost, dbName, dbUsername, dbPassword)
    }
}

var config = JSON.parse(fs.readFileSync("config.json", "utf8"));
export default new App(
    {
        key: fs.readFileSync(config.credentials.privateKey, 'utf8'),
        cert: fs.readFileSync(config.credentials.certificate, 'utf8'),
        ca: fs.readFileSync(config.credentials.ca, 'utf8')
    },
    config.database.host, 
    config.database.name, 
    config.database.username, 
    config.database.password,
    )