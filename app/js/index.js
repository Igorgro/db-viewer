const { Database } = require('./database');
const { TableView } = require('./tableview');
const { ConnectDialog } = require('./dialogs/connectdialog');
const { DatabaseSelectDialog } = require('./dialogs/databaseselectdialog');
const { getFormAsObject } = require('./utilities');

let database = null;
let cnDialog = null;
let dbSelectDialog = null;
let tableView = null;

function main() {
    initVariables();
    initEvents();
    showConnectDialog();
}

function initVariables() {
    $('#cn-form-port').mask('0000');
}
function initEvents() {
    $('#close-button').on('click', () => {
        window.close();
    });
    $('#tb-select').on('click', () => {
        selectTable();
    });
    window.addEventListener('close', () => {
        database.end();
    });
}

function setStatus(connected, host) {
    if (connected) {
        $('#status-icon').removeClass('text-danger');
        $('#status-text').removeClass('text-danger');

        $('#status-icon').addClass('text-success');
        $('#status-text').addClass('text-success');
        $('#status-text').text('Connected to ' + host);
    }
    else {
        $('#status-icon').removeClass('text-success');
        $('#status-text').removeClass('text-success');

        $('#status-icon').addClass('text-danger');
        $('#status-text').addClass('text-danger');
        $('#status-text').text('Not connected');
    }
}

function showConnectDialog() {
    if (cnDialog) {
        cnDialog.del();
    }
    cnDialog = new ConnectDialog($('body'));
    cnDialog.show();
    cnDialog.on('reject', () => {
        window.close();
    });
    cnDialog.on('accept', () => {
        console.log(cnDialog.getForm());
        connectToDatabase(cnDialog.getForm());
    });
}

function connectToDatabase(formObj) {
    database = new Database(formObj);
    database.connect((err) => {
        if (err) {
            showConnectDialog();
            console.log('Error connecting to database');
        }
        else {
            cnDialog.hide();
            setStatus(true, formObj.host);
            showDatabasesDialog();
        }
    });
}

function showDatabasesDialog() {
    database.getDatabases().then((result) => {
        dbSelectDialog = new DatabaseSelectDialog($('body'), result);
        dbSelectDialog.on('accept', () => {
            selectDatabase(dbSelectDialog.getForm());
        });
        dbSelectDialog.show();
    });
}

function selectDatabase(formObj) {
    database.selectDB(formObj.database).then(() => {
        dbSelectDialog.hide();
        showTablesSelect();
    });
}

function showTablesSelect() {
    database.getTables().then((result) => {
        $('#tb-select-select').empty();
        let emptyOption = new Option('Select table', '');
        emptyOption.setAttribute('disabled', true);
        emptyOption.setAttribute('selected', true);
        result.forEach((db) => {
            $('#tb-select-select').append(new Option(db, db));
        });
    });
}

async function selectTable() {
    await database.getTableFromServer(getFormAsObject($('#tb-select-form')).table);
    let table = database.getCurrentTable();
    $('#table-container').empty();
    tableView = new TableView(table, $('#table-container'));
}

window.addEventListener('load', main);
