class Table {
    //Create table from database response
    constructor(content) {
        this.colums = content.fields.map(field => field.name);
        this.rows = content.rows;
    }

    getRows() {
        return this.rows;
    }

    getColumns() {
        return this.colums;
    }
}

module.exports = {
    Table
};
