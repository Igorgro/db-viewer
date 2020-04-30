const { TableView } = require('./tableview');
const { getFormAsObject } = require('../utilities');

class QueriesTab {
    constructor(queries) {
        this._queries = queries;
        this._database = null;
        this._initQueriesSelect();
        $('#qr-filter-row').hide();
        $('#qr-select').on('click', () => {
            this._showTable();
        });
    }

    setDatabase(database) {
        this._database = database;
    }

    _initQueriesSelect() {
        $('#qr-select-select').empty();
        let emptyOption = new Option('Select query', '');
        emptyOption.setAttribute('disabled', true);
        emptyOption.setAttribute('selected', true);
        $('#qr-select-select').append(emptyOption);
        for (let i = 0; i < this._queries.length; i++) {
            $('#qr-select-select').append(new Option(this._queries[i].text, i.toString()));
        }
        $('#qr-select-select').on('change', () => {
            let val = $('#qr-select-select').val();
            if (!jQuery.isEmptyObject(this._queries[val].filter)) {
                $('#qr-filter-row').show();
                $('#qr-filter-label').text(this._queries[val].filter.name + ':');
                $('#qr-filter-select').empty();
                let emptyOption = new Option('Select filter', '');
                emptyOption.setAttribute('disabled', true);
                emptyOption.setAttribute('selected', true);
                $('#qr-filter-select').append(emptyOption);
                this._database.getColumn(this._queries[val].filter.table, this._queries[val].filter.key).then(() => {
                    let filterValuesTable = this._database.getCurrentTable();
                    filterValuesTable.getRows().forEach((row) => {
                        $('#qr-filter-select').append(new Option(row[0], row[0]));
                    });
                });
            }
            else {
                $('#qr-filter-row').hide();
            }
        });
    }

    async _showTable() {
        let form = getFormAsObject($('#qr-select-form'));
        // Check if selected query support filters
        if (!jQuery.isEmptyObject(this._queries[form.query])) {
            await this._database.executeFilteredQuery(this._queries[form.query].query, this._queries[form.query].filter.key, form.filter);
        }
        else {
            await this._database.executeQuery(this._queries[form.query].query);
        }
        let table = this._database.getCurrentTable();
        $('#qr-result-container').empty();
        new TableView(table, $('#qr-result-container'));
    }
}


module.exports = {
    QueriesTab
};
