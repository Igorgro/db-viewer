const { generateId } = require('../utilities');

class Dialog {
    constructor(parent, title, acceptLabel, rejectLabel) {
        this.id = generateId();

        let modal = document.createElement('div');
        modal.id = 'modal-' + this.id;
        modal.classList.add('modal', 'hide', 'fade');
        parent.append(modal);

        let modalDialog = document.createElement('div');
        modalDialog.id = 'dialog-' + this.id;
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
        modal.append(modalDialog);

        let dialogContent = document.createElement('div');
        dialogContent.id = 'dialog-content-' + this.id;
        dialogContent.classList.add('modal-content', 'bg-secondary');
        modalDialog.append(dialogContent);

        let dialogHeader = document.createElement('div');
        dialogHeader.id = 'dialog-header-' + this.id;
        dialogHeader.className = 'modal-header';
        dialogContent.append(dialogHeader);

        let dialogTitle = document.createElement('h5');
        dialogTitle.id = 'dialog-title-' + this.id;
        dialogTitle.innerText = title;
        dialogTitle.classList.add('modal-title', 'text-light');
        dialogHeader.append(dialogTitle);

        let dialogBody = document.createElement('div');
        dialogBody.id = 'dialog-body-' + this.id;
        dialogBody.className = 'modal-body';
        dialogContent.append(dialogBody);

        let dialogFooter = document.createElement('div');
        dialogFooter.id = 'dialog-footer-' + this.id;
        dialogFooter.className = 'modal-footer';
        dialogContent.append(dialogFooter);

        if (rejectLabel) {
            let rejectButton = document.createElement('button');
            rejectButton.id = 'reject-button-' + this.id;
            rejectButton.type = 'button';
            rejectButton.classList.add('btn', 'btn-dark');
            rejectButton.innerText = rejectLabel;
            dialogFooter.append(rejectButton);
        }

        let acceptButton = document.createElement('button');
        acceptButton.id = 'accept-button-' + this.id;
        acceptButton.type = 'button';
        acceptButton.classList.add('btn', 'btn-primary');
        acceptButton.innerText = acceptLabel;
        dialogFooter.append(acceptButton);

        // Dialogs are hidden by default
        this.hide();
    }

    on(event, handler) {
        switch(event) {
            case 'accept':
                $('#accept-button-' + this.id).on('click', handler);
                break;
            case 'reject':
                $('#reject-button-' + this.id).on('click', handler);
                break;
        }
    }

    show() {
        $('#modal-' + this.id).modal({ backdrop: 'static', keyboard: false });
        $('#modal-' + this.id).modal('show');
    }

    hide() {
        $('#modal-' + this.id).modal('hide');
    }

    del() {
        $('#modal-' + this.id).remove();
    }
}

module.exports = {
    Dialog
};
