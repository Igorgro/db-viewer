const { TableView } = require('./tableview');
const { getFormAsObject } = require('../utilities');

class SearchTab {
    constructor(search) {
        this._search = search;
        this._database = null;
        this._initTab();
        $('#sr-search').on('click', () => {
            this._showTable();
        });
    }

    setDatabase(database) {
        this._database = database;
    }

    _initTab() {
        $('#sr-label').text(`Search in ${this._search.table} by ${this._search.field}`);
    }

    async _showTable() {
        let form = getFormAsObject($('#sr-form'));
        // Check if selected query support filters
        await this._database.searchInTable(this._search.table, this._search.field, form.query);
        let table = this._database.getCurrentTable();
        $('#sr-result-container').empty();
        new TableView(table, $('#sr-result-container'));
    }
}


module.exports = {
    SearchTab
};
