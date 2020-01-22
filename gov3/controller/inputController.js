const inputController = {
  getCellValues: e => {
    return {
      value: e.target.value,
      cellHash: `#${e.target.id}`,
      cell: e.target.id,
      bgColor: e.currentTarget.style.cssText
    };
  },

  validateInputs: cellValues => {
    const { value, cellHash } = cellValues;

    let required = $(cellHash).data('req');
    let typeValue = $(cellHash).data('type');

    if (required) {
      !value
        ? $(cellHash).css({ 'background-color': '#FF0000' })
        : $(cellHash).css({ 'background-color': '#FFFFFF' });
    }

    switch (typeValue) {
      case 'Text':
        isNaN(value)
          ? $(cellHash).css({ 'background-color': '#FFFFFF' })
          : $(cellHash).css({ 'background-color': '#FF0000' });
        break;

      case 'Number':
        !isNaN(value)
          ? $(cellHash).css({ 'background-color': '#FFFFFF' })
          : $(cellHash).css({ 'background-color': '#FF0000' });
        break;

      case 'Date':
        let regex;

        regex = /([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)(\d{4}|\d{2})/gi;
        value.match(regex)
          ? $(cellHash).css({ 'background-color': '#FFFFFF' })
          : $(cellHash).css({ 'background-color': '#FF0000' });

        break;
    }
  },

  updateInputs: (cellValues, arrayTable) => {
    const { value, cell, bgColor } = cellValues;

    let lineInput = cell.slice(1);
    let columnInput = cell.slice(0, 1);

    let index = arrayTable.findIndex(value => {
      return value.line == lineInput && value.column == columnInput;
    });

    arrayTable[index].title = value;
    arrayTable[index].status = status;
  }
};
export default inputController;
