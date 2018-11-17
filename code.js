let matrix = [];

function coverage(matrix) {
    const coveredRows = [];
    const coveredCols = [];
    while(coveredCols.length < matrix[0].length) {
        const newMaxRow = {quantity: -1, row: -1};
        matrix.forEach((rowItem, rowIndex) => {
            if(!coveredRows.includes(rowIndex)) {
                const cols = rowItem.filter((colItem, colIndex) => {
                    if(!coveredCols.includes(colIndex) && colItem) return {colItem, colIndex};
                });
                if(cols.length >= newMaxRow.quantity) {
                    newMaxRow.quantity = cols.length;
                    newMaxRow.row = rowIndex;
                }
            }
        });
        if(newMaxRow.quantity === 0) { // if all rows were already covered
            return coveredRows
        } 
        coveredRows.push(newMaxRow.row);
        matrix[newMaxRow.row].filter((item, index) => {
            if (item && !coveredCols.includes(index)) return coveredCols.push(index);
        });
    }
    return coveredRows;
}

function generateMatrix(cols, rows, probability) {
    const initialMatrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    for (let i = 0; i < initialMatrix.length; i++) {
        for (let j = 0; j < initialMatrix[i].length; j++) {
            const rand = Math.random();
            if (rand <= probability && i !== j) {
                initialMatrix[i][j] = 1;
            }
        }
    }
    return initialMatrix;
}

function setInitialValues() {
    const inputs = document.querySelectorAll('input');
    inputs[0].value = '5';
    inputs[1].value = '5';
    inputs[2].value = '0.8';
}

function drawTable() {
    const container = document.querySelector('.matrix-container');
    const inputs = document.querySelectorAll('input');
    matrix = generateMatrix(+inputs[0].value, +inputs[1].value, +inputs[2].value);
    console.log(matrix);
    const tbl = document.createElement('table');
    tbl.className = 'pure-table pure-table-bordered'
    tbl.setAttribute('border', '1');
    const tbdy = document.createElement('tbody');
    for (let i = 0; i < +inputs[1].value; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < +inputs[0].value; j++) {
            const td = document.createElement('td');
            td.appendChild(document.createTextNode(matrix[i][j].toString()));
            tr.appendChild(td);    
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    container.innerHTML = '';
    container.appendChild(tbl)
}

function highlightCoveredRows() {
    const coveredRows = coverage(matrix);
    const tableRows = document.querySelectorAll('tr');
    tableRows.forEach((item, index) => {
        if( coveredRows.includes(index)){
            item.style.backgroundColor = 'bisque';
        }
    })
}

function registerHandlers() {
    document.getElementById('generate-btn')
            .addEventListener('click', drawTable);
    document.getElementById('calculate-btn')
            .addEventListener('click', highlightCoveredRows);
}

setInitialValues();
registerHandlers();