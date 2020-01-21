export default class Cell {
  constructor(part, title, type, itens, required, line, column, status) {
    this.part = part;
    this.title = title;
    this.type = type;
    this.itens = itens;
    this.required = required;
    this.line = line;
    this.column = column;
    this.status = status;
  }
}
