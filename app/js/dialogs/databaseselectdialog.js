const { FormDialog } = require('./formdialog');

class DatabaseSelectDialog extends FormDialog {
    constructor(parent, databases) {
        super(parent, 'Select database', 'Select');

        let formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        $('#form-' + this.id).append(formGroup);

        let databaseSelect = document.createElement('select');
        databaseSelect.id = 'select-' + this.id;
        databaseSelect.className = 'form-control bg-dark text-light';
        databaseSelect.name = 'database';
        formGroup.append(databaseSelect);

        databases.forEach((database) => {
            $('#select-' + this.id).append(new Option(database, database));
        });
    }
}

module.exports = {
    DatabaseSelectDialog
};
