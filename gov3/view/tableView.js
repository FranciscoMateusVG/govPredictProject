const tableView = {
  renderTable: (arrayTable, storage) => {
    let lastElement, cellToAdd;

    //Checks if localStorage exists to render the table!
    if (storage) {
      const { recipe, letter, nrows } = storage;
      //Update index.html
      $('.letterFlag').text(letter);
      $('.rowFlag').text(nrows);
      recipe.forEach(value => {
        switch (value.part) {
          case 'header':
            //Render Header
            tableView.renderColumn(value);
            break;

          case 'index':
            //Render Index
            tableView.renderIndex(value);

            break;
          case 'input':
            //Render Rows

            if (!value.itens) {
              //Normal
              tableView.renderNormalInput(value);
            } else {
              //Selected
              tableView.renderSelectInput(value);
              break;
            }
        }
      });
    } else {
      lastElement = arrayTable.length - 1;

      cellToAdd = arrayTable[lastElement];

      switch (cellToAdd.part) {
        case 'header':
          //Render Header
          tableView.renderColumn(cellToAdd);
          break;

        case 'index':
          //Render Index
          tableView.renderIndex(cellToAdd);

          break;
        case 'input':
          //Render Rows

          if (!cellToAdd.itens) {
            //Normal
            tableView.renderNormalInput(cellToAdd);
          } else {
            //Selected
            tableView.renderSelectInput(cellToAdd);
            break;
          }
      }
    }
  },

  renderColumn: cell => {
    const { title, line, column, status } = cell;
    let template = `<td class="columnCSS"  style="visibility: ${status};"><input data-req="false" data-type="column" class="indexStart" id="${column}${line}" value="${title}" style="text-align:center;""></td>`;
    $('.column').append(template);
  },

  renderIndex: cell => {
    const { line, column } = cell;
    let template = `<tr class="rows${column}${line}"><td class="baseIndex">${line}</td>`;
    $('.spreadSheet').append(template);
  },

  renderNormalInput: cell => {
    const { title, type, required, line, column, status } = cell;

    let template = `<td><input style="${status}" data-req="${required}" data-type="${type}" id="${column}${line}" value="${title}"/></td>`;
    $(`.rows0${line}`).append(template);
  },

  renderSelectInput: cell => {
    const { itens, line, column } = cell;

    let template = ` <td>
    <select id="${column}${line}">`;

    itens.forEach(value => {
      template += `<option value="${value}">${value}</option>`;
    });

    template += `</select>
    </td>`;

    $(`.rows0${line}`).append(template);
  }
};

export default tableView;
