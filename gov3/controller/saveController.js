const saveController = {
  saveTable: arrayTable => {
    //Get Table
    localStorage.removeItem('table');
    let jsonstring = JSON.stringify(arrayTable);
    localStorage.setItem('table', jsonstring);

    //Get Letter Flag

    localStorage.removeItem('letter');
    localStorage.setItem('letter', $('.letterFlag').text());

    //Get number of rows flag

    localStorage.removeItem('nrow');
    localStorage.setItem('nrow', $('.rowFlag').text());
  },
  verifyLocalStorage: () => {
    if (localStorage.length) {
      return {
        recipe: JSON.parse(localStorage.getItem('table')),
        letter: localStorage.getItem('letter'),
        nrows: localStorage.getItem('nrow')
      };
    }
  }
};

export default saveController;
