import Sequelize from 'sequelize'

const Instance = {
    address: {
        type: Sequelize.STRING
    },
    clientID: {
        type: Sequelize.STRING
    },
    clientSecret: {
        type: Sequelize.STRING
    }
}

export default {Instance}