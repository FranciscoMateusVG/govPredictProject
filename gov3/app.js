import columnController from './controller/columnController.js';
import rowController from './controller/rowController.js';
import modalView from './view/modalView.js';
import saveController from './controller/saveController.js';
import Cell from './model/cell.js';
import tableView from './view/tableView.js';
import inputController from './controller/inputController.js';

{
  //Variables
  let indexFlagRows,
    nItens,
    inputData,
    indexFlag,
    letterFlag,
    rowFlag,
    cell,
    nRows;
  const arrayTable = [];

  //Destructuring Objects
  let { getInput, clearInput, renderColumn, showAddRow } = columnController;
  let {
    renderRow,
    getFlagRows,
    howManyRows,
    addRows,
    changeLetter
  } = rowController;
  let { popModal, getInputModal, renderItens } = modalView;
  let { saveTable } = saveController;
  let { renderTable } = tableView;
  let { validateInputs, updateInputs, getCellValues } = inputController;

  //Functions
  const createColumn = () => {
    //1 - Check for Index Start and Letter Flag
    indexFlag = $('.indexStart').val();

    //2 - Get Data
    inputData = getInput();

    //3- Validate if needs Index Start Cell
    if (!indexFlag) {
      //Create Cell Of index Flag
      cell = new Cell('header', '@', '', '', false, 0, 0, 'hidden');
      arrayTable.push(cell);
      //Render Index Start Cell
      renderTable(arrayTable);
    }

    //4- Create Cell Column

    const { title, type, itens, required, column } = inputData;

    cell = new Cell(
      'header',
      title,
      type,
      itens,
      required,
      0,
      column,
      'visible'
    );
    arrayTable.push(cell);
    renderTable(arrayTable);

    //5- Create Cell Index
    //Get IndexFlag Of Rows
    indexFlagRows = getFlagRows();
    nRows = howManyRows() + 1;

    while (nRows <= indexFlagRows) {
      cell = new Cell('index', nRows, '', '', false, nRows, 0, 'visible');
      arrayTable.push(cell);
      renderTable(arrayTable);
      nRows = howManyRows() + 1;
    }

    //6- Create Input Cell

    for (let index = 1; index < nRows; index++) {
      cell = new Cell(
        'input',
        '',
        type,
        itens,
        required,
        index,
        column,
        'visible'
      );
      arrayTable.push(cell);
      renderTable(arrayTable);
    }

    //7- Change Column Letter
    changeLetter(column);

    //8 - Show Add Row Button
    showAddRow();

    //9 - Save in local Storage
    saveTable(arrayTable);
  };

  const createRow = () => {
    //1- Add how many rows you wish to create
    addRows(indexFlagRows, 10);

    //Get IndexFlag Of Rows
    indexFlagRows = getFlagRows();
    nRows = howManyRows() + 1;

    //How Many Rows to Create? How Many Columns there is?
    let rowsToCreate = indexFlagRows - nRows;
    let columnsBluePrint = [];
    arrayTable.forEach(value => {
      if (value.part === 'header' && value.title !== '@') {
        columnsBluePrint.push(value);
      }
    });

    while (nRows <= indexFlagRows) {
      //Create Index Rows
      cell = new Cell('index', nRows, '', '', false, nRows, 0, 'visible');
      arrayTable.push(cell);
      renderTable(arrayTable);

      //Create Input Rows
      columnsBluePrint.forEach(value => {
        cell = new Cell(
          'input',
          '',
          value.type,
          value.itens,
          value.required,
          nRows,
          value.column,
          'visible'
        );
        arrayTable.push(cell);
        renderTable(arrayTable);
      });

      //One row created
      nRows = howManyRows() + 1;
    }
  };

  const controlCells = e => {
    //1- Get cells input
    const cellValues = getCellValues(e);

    //2- Validate input
    validateInputs(cellValues);

    //3 - Update Inputs
    updateInputs(cellValues, arrayTable);
  };

  //Event Listners
  /** Add Column*/
  $('#createColumn').click(function(e) {
    createColumn();
  });

  /** Add rows */
  $('#addRows').click(function(e) {
    e.preventDefault();
    createRow();
    $('html, body').scrollTop($(document).height());
  });
  /** Blur input */
  $(document).on('blur', 'td input', function(e) {
    controlCells(e);
  });
  /** Modal*/
  $('select').on('change', function() {
    popModal();
  });
  $('.generateItens').click(function() {
    //1 - Get Number of Itens
    nItens = getInputModal();
    //2 - Render Itens Input Fields
    renderItens(nItens);
  });
}
