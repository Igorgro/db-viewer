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
        let result = await this._queryNow('SELECT datname FROM pg_database WHERE datistemplate = false;');
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
        let result = await this._queryNow({ text: 'SELECT table_name FROM information_schema.tables WHERE table_schema=\'public\'', rowMode: 'array' });
        return result.rows.map(row => row[0]);
    }

    // Get all values from specified column
    async getColumn(tablename, columnname) {
        await this._query({ text: 'SELECT ' + columnname + ' FROM "' + tablename + '"', rowMode: 'array' });
    }

    // Execute query, which contains $key=$value filter
    async executeFilteredQuery(query, key, value) {
        query = query.replace('$key', key).replace('$value', value);
        await this._query({ text: query, rowMode: 'array' });
    }

    async executeQuery(query) {
        await this._query({ text: query, rowMode: 'array' });
    }

    async searchInTable(tablename, field, value) {
        let query = `SELECT * FROM ${tablename} WHERE ${field}='${value}'`;
        await this._query({ text: query, rowMode: 'array' });
    }

    // Get table from server and store it in Database instance
    async getTableFromServer(tablename) {
        await this._query({ text: 'SELECT * FROM "' + tablename + '"', rowMode: 'array' });
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

    async _queryNow(statement) {
        return await this.client.query(statement);
    }

    async _query(statement) {
        let result =  await this.client.query(statement);
        this.currentTable = new Table(result);
    }
}

module.exports = {
    Database
};
