const { TableView } = require('./tableview');
const { getFormAsObject } = require('../utilities');

class DatabaseTab {
    constructor() {
        this._database = null;
    }

    setDatabase(database) {
        this._database = database;
        this._initTablesSelect();
        $('#tb-select').on('click', () => {
            this._showTable();
        });
    }
    _initTablesSelect() {
        this._database.getTables().then((result) => {
            $('#tb-select-select').empty();
            let emptyOption = new Option('Select table', '');
            emptyOption.setAttribute('disabled', true);
            emptyOption.setAttribute('selected', true);
            $('#tb-select-select').append(emptyOption);
            result.forEach((db) => {
                $('#tb-select-select').append(new Option(db, db));
            });
        });
    }

    async _showTable() {
        await this._database.getTableFromServer(getFormAsObject($('#tb-select-form')).table);
        let table = this._database.getCurrentTable();
        $('#database-table-container').empty();
        new TableView(table, $('#database-table-container'));
    }

}

module.exports = {
    DatabaseTab
};