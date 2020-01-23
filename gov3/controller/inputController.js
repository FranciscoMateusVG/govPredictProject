const inputController = {
  getCellValues: e => {
    return {
      value: e.target.value,
      cellHash: `#${e.target.id}`,
      cell: e.target.id
    };
  },

  validateInputs: cellValues => {
    const { value, cellHash } = cellValues;
    let bgColor, required, typeValue, flag;

    flag = false;
    bgColor = "show";
    required = $(cellHash).data("req");
    typeValue = $(cellHash).data("type");

    if (required) {
      !value
        ? (bgColor = { "background-color": "#FF0000" })
        : (bgColor = { "background-color": "#FFFFFF" });

      flag = true;
    }

    switch (typeValue) {
      case "Text":
        isNaN(value) || (value.length == 0 && !flag)
          ? (bgColor = { "background-color": "#FFFFFF" })
          : (bgColor = { "background-color": "#FF0000" });
        break;

      case "Number":
        !isNaN(value)
          ? (bgColor = { "background-color": "#FFFFFF" })
          : (bgColor = { "background-color": "#FF0000" });
        break;

      case "Date":
        let regex;

        regex = /([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)(\d{4}|\d{2})/gi;
        value.match(regex) || (value.length == 0 && !flag)
          ? (bgColor = { "background-color": "#FFFFFF" })
          : (bgColor = { "background-color": "#FF0000" });

        break;
    }

    $(cellHash).css(bgColor);
    cellValues.bgColor = bgColor;
  },

  updateInputs: (cellValues, arrayTable) => {
    const { value, cell, bgColor } = cellValues;
    let lineInput, columnInput, index, status;

    status = JSON.stringify(bgColor)
      .replace(/"/g, "")
      .replace("{", "")
      .replace("}", "");

    lineInput = cell.slice(1);
    columnInput = cell.slice(0, 1);

    index = arrayTable.findIndex(value => {
      return value.line == lineInput && value.column == columnInput;
    });

    arrayTable[index].title = value;
    arrayTable[index].status = status;
  }
};
export default inputController;
