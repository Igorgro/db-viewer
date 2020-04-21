/**
 * Generates unique id
 */
function generateId() {
    return Math.random().toString(16).substr(2, 13);
}

function getFormAsObject(form) {
    let formArray = form.serializeArray();
    let formObj = {};
    formArray.forEach(pair => {
        formObj[pair.name] = pair.value;
    });
    return formObj;
}

module.exports = {
    generateId,
    getFormAsObject
}
