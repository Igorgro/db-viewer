const { FormDialog } = require('./formdialog');

class ConnectDialog extends FormDialog {
    constructor(parent) {
        super(parent, 'Connect to database', 'Connect', 'Exit');

        let formGroup1 = document.createElement('div');
        formGroup1.className = 'form-group';
        $('#form-' + this.id).append(formGroup1);

        let formRow = document.createElement('div');
        formRow.className = 'form-row';
        formGroup1.append(formRow);

        let formColumn1 = document.createElement('div');
        formColumn1.className = 'col-9';
        formRow.append(formColumn1);

        let hostInput = document.createElement('input');
        hostInput.type = 'text';
        hostInput.classList.add('form-control', 'bg-dark', 'text-light');
        hostInput.placeholder = 'Host';
        hostInput.name = 'host';
        formColumn1.append(hostInput);

        let portLabel = document.createElement('label');
        portLabel.className = 'col-form-label-sm';
        portLabel.innerText = ':';
        formRow.append(portLabel);

        let formColumn2 = document.createElement('div');
        formColumn2.className = 'col';
        formRow.append(formColumn2);

        let portInput = document.createElement('input');
        portInput.type = 'text';
        portInput.classList.add('form-control', 'bg-dark', 'text-light');
        portInput.placeholder = 'Port';
        portInput.name = 'port';
        portInput.id = 'port-' + this.id;
        formColumn2.append(portInput);

        let formGroup2 = document.createElement('div');
        formGroup2.className = 'form-group';
        $('#form-' + this.id).append(formGroup2);

        let usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.classList.add('form-control', 'bg-dark', 'text-light');
        usernameInput.placeholder = 'Username';
        usernameInput.name = 'user';
        formGroup2.append(usernameInput);

        let formGroup3 = document.createElement('div');
        formGroup3.className = 'form-group';
        $('#form-' + this.id).append(formGroup3);

        let passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.classList.add('form-control', 'bg-dark', 'text-light');
        passwordInput.placeholder = 'Password';
        passwordInput.name = 'password';
        formGroup3.append(passwordInput);

        $('#port-' + this.id).mask('0000');
    }
}

module.exports = {
    ConnectDialog
};
