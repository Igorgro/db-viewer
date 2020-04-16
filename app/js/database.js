const { Client } = require('pg');



class Database {
    constructor (params) {
        this.client = new Client(params);
    }

    connect(callback) {
        this.client.connect(callback);
    }
}

module.exports = {
    Database
};
