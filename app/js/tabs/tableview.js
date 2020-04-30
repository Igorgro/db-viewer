class TableView {
    constructor(table, parent) {
        this.tableElem = document.createElement('table');
        this.tableElem.className = 'table bg-dark text-light';
        this.tableElem.style.position = 'relative';

        let tableHeadElem = document.createElement('thead');
        let tableHeadRowElem = document.createElement('tr');
        table.getColumns().forEach(column => {
            let thElem = document.createElement('th');
            thElem.innerText = column;
            tableHeadRowElem.appendChild(thElem);
        });
        tableHeadElem.appendChild(tableHeadRowElem);
        this.tableElem.appendChild(tableHeadElem);

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
        this.tableElem.appendChild(tableBodyElem);

        parent.append(this.tableElem);
    }
}

module.exports = {
    TableView
};
