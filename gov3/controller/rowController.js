const rowController = {
  //Primary Functions
  renderRow: (state, letter) => {
    let count;
    count = rowView.howManyRows();
    // render rows template
    rowView.renderTemplate(count, state, letter);

    //Add Letter
    rowView.addLetter(letter);
  },

  //Secundary Functions
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

  renderTemplate: (count, state, letter) => {
    let numerator, lastLetter;
    lastLetter = letter[letter.length - 1];
    let template = '';
    // console.log(count, state);

    numerator = count * 10;

    for (let index = numerator - 9; index <= numerator; index++) {
      template = `<td><input id="${lastLetter}${index}"/></td>`;
      $(`.rows${index}`).append(template);
    }
  },

  nextLetter: letter => {
    return String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
  }
};

export default rowController;
