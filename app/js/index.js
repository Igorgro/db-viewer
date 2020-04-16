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
        }
    });
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
