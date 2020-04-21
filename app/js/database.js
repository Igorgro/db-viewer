const { Client } = require('pg');
const { Table } = require('./table');


class Database {
    constructor(config) {
        this.config = config;
        this._createClient();
    }

    connect(callback) {
        this.client.connect(callback);
    }

    // Return list of databases available on the server
    async getDatabases() {
        let result = await this._query('SELECT datname FROM pg_database WHERE datistemplate = false;');
        return result.rows.map(row => row.datname);
    }

    end() {
        this.client.end();
    }

    async selectDB(dbname) {
        this.config.database = dbname;
        // Postgres cannot switch databases, so we just disconnect
        // and connect again with th right database name
        this._createClient();
        this.connect();
    }

    // Return list of tables available in the current database
    async getTables() {
        let result = await this._query({ text: 'SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\'', rowMode: 'array' });
        return result.rows.map(row => row[0]);
    }

    // Get table from server and store it in Database instance
    async getTableFromServer(tablename) {
        let result = await this._query({ text: 'SELECT * FROM "' + tablename + '"', rowMode: 'array' });
        this.currentTable = new Table(result);
    }

    getCurrentTable() {
        return this.currentTable;
    }

    _createClient() {
        if (this.client) {
            this.end();
        }
        this.client = new Client(this.config);
    }

    async _query(statement) {
        return await this.client.query(statement);
    }
}

module.exports = {
    Database
};
