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

  renderColumn: (flag, inputData) => {
    //Header
    columnController.createColumnHeader(flag, inputData);
  },

  createColumnHeader: (flag, inputData) => {
    let template;
    if (!flag) {
      template = `<td class="indexStart" style="visibility: hidden;">@</td>
    <td>${inputData.title}</td>`;
      $('.column').append(template);
    } else {
      template = `<td>${inputData.title}</td>`;
      $('.column').append(template);
    }
  },

  showAddRow: () => $('.addRows').show(),

  clearInput: () => {
    $('.column-title').val('');
  }
};

export default columnController;
