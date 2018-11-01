import Sequelize from 'sequelize'

import models from './models.js'

export default class Database {
    constructor(host, database, username, password) {
        const sequelize = new Sequelize(database, username, password, {
            host: host,
            dialect: 'postgres',
            operatorsAliases: false,
          
            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            },
          
          });

        console.log('Testing connection to database...')
        sequelize.authenticate()
          .then(() => {
              console.log('Connection to database has been established')
          })
          .catch(err => {
              console.error("Unable to connect to the database:", err)
          })

        for (let model in models) {
            this[model] = sequelize.define(model.toLowerCase(), models[model])
            this[model].sync()
        }
    }
}