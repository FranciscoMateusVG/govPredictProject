const rowController = {
  getFlagRows: () => parseFloat($('.rowFlag').text()),

  howManyRows: () => {
    let table = $('#tableSpreadSheet').get(0);
    return table.tBodies[0].rows.length;
  },

  addRows: (indexFlagRows, addHowMany) => {
    $('.rowFlag').text(indexFlagRows + addHowMany);
  },

  changeLetter: letter => {
    let nextLetter = rowController.nextLetter(letter[letter.length - 1]);
    $('.letterFlag').text(nextLetter);
  },

  nextLetter: letter => {
    return String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
  }
};

export default rowController;
