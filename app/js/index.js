const { Database } = require('./js/database.js');
let database = null;

function main() {
    initVariables();
    initEvents();
    showConnectDialog();
}

function initVariables() {
    $('#cn-form-port').mask('0000');
}
function initEvents() {
    $('#cn-dialog-exit').on('click', () => {
        window.close();
    });
    $('#cn-dialog-connect').on('click', () => {
        connectToDatabase();
    });
    $('#db-dialog-select').on('click', () => {
        selectDatabase();
    });
    $('#tb-select').on('click', () => {
        selectTable();
    });
    window.addEventListener('close', () => {
        database.end();
    });
}

function showConnectDialog() {
    $('#cn-dialog').modal({ backdrop: 'static', keyboard: false });
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

function connectToDatabase() {
    let formObj = getFormAsObject($('#cn-dialog-form'));
    database = new Database(formObj);
    database.connect((err) => {
        if (err) {
            console.log('Error connecting to database');
        }
        else {
            $('#cn-dialog').modal('hide');
            setStatus(true, formObj.host);
            showDatabasesDialog();
        }
    });
}

function showDatabasesDialog() {
    database.getDatabases().then((result) => {
        $('#db-select').empty();
        result.forEach((db) => {
            $('#db-select').append(new Option(db, db));
        });
        $('#db-dialog').modal({ backdrop: 'static', keyboard: false });
    });
}

function selectDatabase() {
    database.selectDB(getFormAsObject($('#db-select-form')).database).then(() => {
        $('#db-dialog').modal('hide');
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
    showTable(table);
}

function showTable(table) {
    $('#table-container').empty();

    let tableElem = document.createElement('table');
    tableElem.className = 'table bg-dark text-light';

    let tableHeadElem = document.createElement('thead');
    let tableHeadRowElem = document.createElement('tr');
    table.getColumns().forEach(column => {
        let thElem = document.createElement('th');
        thElem.innerText = column;
        tableHeadRowElem.appendChild(thElem);
    });
    tableHeadElem.appendChild(tableHeadRowElem);
    tableElem.appendChild(tableHeadElem);

    let tableBodyElem = document.createElement('tbody');
    table.getRows().forEach(row => {
        let tableBodyRowElem = document.createElement('tr');
        row.forEach(field => {
            let tableTdElem = document.createElement('td');
            tableTdElem.innerText = field;
            tableBodyRowElem.appendChild(tableTdElem);
        });
        tableBodyElem.appendChild(tableBodyRowElem);
    });
    tableElem.appendChild(tableBodyElem);

    $('#table-container').append(tableElem);
}

function getFormAsObject(form) {
    let formArray = form.serializeArray();
    let formObj = {};
    formArray.forEach(pair => {
        formObj[pair.name] = pair.value;
    });
    return formObj;
}

window.addEventListener('load', main);
