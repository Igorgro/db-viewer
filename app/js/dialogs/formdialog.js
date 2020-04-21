const  { Dialog } = require('./dialog');
const { getFormAsObject } = require('../utilities');

class FormDialog extends Dialog {
    constructor(parent, title, acceptLabel, rejectLabel) {
        super(parent, title, acceptLabel, rejectLabel);

        let form = document.createElement('form');
        form.id = 'form-' + this.id;

        $('#dialog-body-' + this.id).append(form);
    }

    getForm() {
        return getFormAsObject($('#form-' + this.id));
    }
}

module.exports = {
    FormDialog
};
