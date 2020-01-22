const columnController = {
  //Primary Functions

  getInput: () => {
    let obj, title, type, required, column;
    title = $('.column-title').val();
    type = $('.column-type').val();
    required = $('.column-required').is(':checked');
    column = $('.letterFlag').text();

    if (type !== 'Select') {
      obj = {
        title: title,
        type: type,
        itens: '',
        required: required ? true : false,
        column: column
      };
    } else {
      obj = {
        title: title,
        type: 'Select',
        itens: columnController.getItens(),
        required: required ? true : false,
        column: column
      };
    }

    return obj;
  },

  getItens: () => {
    const arr = [];
    $('.itens').each(function() {
      arr.push($(this).val());
    });
    return arr;
  },

  showAddRow: () => $('.addRows').show()
};

export default columnController;
