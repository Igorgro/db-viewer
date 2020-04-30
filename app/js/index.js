const { Database } = require('./database');
const { DatabaseTab } = require('./tabs/databasetab');
const { QueriesTab } = require('./tabs/queriestab');
const { SearchTab } = require('./tabs/searchtab');
const { ConnectDialog } = require('./dialogs/connectdialog');
const { DatabaseSelectDialog } = require('./dialogs/databaseselectdialog');
const fs = require('fs');
const path = require('path');


let database = null;
let cnDialog = null;
let dbSelectDialog = null;
let dbTab = null;
let queriesTab = null;
let searchTab = null;
let settings = null;

let menu = [ 'dbviewer', 'queries', 'search' ];

function main() {
    loadSettings();
    initVariables();
    initEvents();
    selectMenuItem(menu[0]);
    showConnectDialog();
}

function initVariables() {
    dbTab = new DatabaseTab();
    queriesTab = new QueriesTab(settings['queries']);
    searchTab = new SearchTab(settings['search']);
}
function initEvents() {
    $('#close-button').on('click', () => {
        window.close();
    });
    $('.menu-item').on('click', (event) => {
        onMenuItemClicked(event);
    });


    window.addEventListener('close', () => {
        database.end();
    });
}

function loadSettings() {
    let content = fs.readFileSync(path.resolve(__dirname, '../res/settings.json'));
    settings = JSON.parse(content);
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

function onMenuItemClicked(event) {
    selectMenuItem(event.target.id.split(/item-/)[1]);
}

function selectMenuItem(item) {
    $('.menu-item').removeClass('active');
    $('.tab').hide();
    $('#item-' + item).addClass('active');
    $('#tab-' + item).show();
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
        dbTab.setDatabase(database);
        queriesTab.setDatabase(database);
        searchTab.setDatabase(database);
    });
}

window.addEventListener('load', main);
`
⎧ 1 ⎫
⎪ 2 ⎪
⎩ 3 ⎭`;