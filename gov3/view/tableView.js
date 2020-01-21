const tableView = {
  renderTable: arrayTable => {
    let lastElement = arrayTable.length - 1;

    let cellToAdd = arrayTable[lastElement];

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
  },

  renderColumn: cell => {
    const { title, type, itens, required, line, column, status } = cell;
    //let template = `<th class="indexStart" id="${column}${line}" style="visibility: ${status};">${title}</th>`;
    let template = `<td class="columnCSS"  style="visibility: ${status};"><input data-req="false" data-type="column" class="indexStart" id="${column}${line}" value="${title}" style="background-color: rgb(193, 193, 193);"></td>`;
    $('.column').append(template);
  },

  renderIndex: cell => {
    const { title, type, itens, required, line, column, status } = cell;
    let template = `<tr class="rows${column}${line}"><td>${line}</td>`;
    $('.spreadSheet').append(template);
  },

  renderNormalInput: cell => {
    const { title, type, itens, required, line, column, status } = cell;

    let template = `<td><input data-req="${required}" data-type="${type}" id="${column}${line}" value="${title}"/></td>`;
    $(`.rows0${line}`).append(template);
  },

  renderSelectInput: cell => {
    const { title, type, itens, required, line, column, status } = cell;

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
