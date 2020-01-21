const modalView = {
  popModal: () => {
    if ($('#columnType').val() == 'Select') {
      $('#modal').modal('show');
    } else {
      modalView.clearItens();
    }
  },

  getInputModal: () => $('#numberItens').val(),

  createTemplate: nItem => {
    return `<div class="form-group col-6 d-inline-block">
                        <label for="titulo">${nItem}º Item</label>
                        <input
                            type="text"
                            name="itens"
                   
                            class="form-control text-left itens"
                            placeholder="Insert Itens!"
                            aria-describedby="helpId"
                        />
                    </div>`;
  },

  renderItens: number => {
    let template;

    for (let index = 1; index <= number; index++) {
      template = modalView.createTemplate(index);
      $('.itensGroup').append(template);
    }
  },

  clearItens: () => $('.itensGroup').empty()
};

export default modalView;
