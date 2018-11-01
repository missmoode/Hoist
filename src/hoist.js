import Express from 'express'
import 'pg'

import authentication from './api/authentication.js'

import db from './database'
import Database from './database';
import isInstance from './lib/urlTest.js';

class App {
    constructor(port) {
        this.express = Express()

        this.express.use('/authentication', authentication)

        this.express.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })

        this.database = new Database("host", "database", "username", "password")
    }
}

export default new App(80)