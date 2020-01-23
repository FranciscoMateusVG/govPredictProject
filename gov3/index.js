import Cell from './model/cell.js';
import tableView from './view/tableView.js';
import modalView from './view/modalView.js';
import rowController from './controller/rowController.js';
import saveController from './controller/saveController.js';
import inputController from './controller/inputController.js';
import columnController from './controller/columnController.js';

{
  //Variables
  let indexFlagRows,
    nItens,
    inputData,
    indexFlag,
    cell,
    nRows,
    columnsBluePrint;
  let arrayTable = [];

  //Destructuring Objects
  const { getInput, showAddRow } = columnController;
  const { getFlagRows, howManyRows, addRows, changeLetter } = rowController;
  const { popModal, getInputModal, renderItens } = modalView;
  const { saveTable, verifyLocalStorage } = saveController;
  const { renderTable } = tableView;
  const { validateInputs, updateInputs, getCellValues } = inputController;

  //Verify Local Stroage
  const storage = verifyLocalStorage();

  if (storage) {
    arrayTable = storage.recipe;
    renderTable('', storage);
    showAddRow();
  }

  //Functions
  const createColumn = () => {
    //1 - Check for Index Start and Letter Flag
    indexFlag = $('.indexStart').val();

    //2 - Get Data
    inputData = getInput();

    //3- Validate if needs Index Start Cell
    if (!indexFlag) {
      //Create Cell Of index Start
      cell = new Cell('header', '@', '', '', false, 0, 0, 'hidden');
      arrayTable.push(cell);
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
      cell = new Cell('input', '', type, itens, required, index, column, '');
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
    //1 -Get IndexFlag Of Rows representing how many rows there are
    indexFlagRows = getFlagRows();

    //2- Add how many rows you wish to create on the IndexFlag
    addRows(indexFlagRows, 10);

    //3 - Get new IndexFlag Of Rows and calculates how many rows are rendered in the table
    indexFlagRows = getFlagRows();
    nRows = howManyRows() + 1;

    //4 - Get all cells in the arraytable which have the 'headers' part value
    columnsBluePrint = [];
    arrayTable.forEach(value => {
      if (value.part === 'header' && value.title !== '@') {
        columnsBluePrint.push(value);
      }
    });

    while (nRows <= indexFlagRows) {
      //5 - Create Index Rows based on the diference between the IndexFlag and how many rows there are
      cell = new Cell('index', nRows, '', '', false, nRows, 0, 'visible');
      arrayTable.push(cell);
      renderTable(arrayTable);

      //Create Input Rows based on Columns BluePrint
      columnsBluePrint.forEach(value => {
        cell = new Cell(
          'input',
          '',
          value.type,
          value.itens,
          value.required,
          nRows,
          value.column,
          ''
        );
        arrayTable.push(cell);
        renderTable(arrayTable);
      });

      nRows = howManyRows() + 1;
    }

    //Save Table on localStorage
    saveTable(arrayTable);
  };

  // Function to validate Inputs, Update the arrayTable and Save the modifications on the local storage
  const controlCells = e => {
    const cellValues = getCellValues(e);

    validateInputs(cellValues);

    updateInputs(cellValues, arrayTable);

    saveTable(arrayTable);
  };

  //Event Listners
  /** Create Column Button */
  $('#createColumn').click(function(e) {
    createColumn();
  });

  /** Add rows Button */
  $('#addRows').click(function(e) {
    e.preventDefault();
    createRow();
    $('html, body').scrollTop($(document).height());
  });
  /** Blur input event */
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
