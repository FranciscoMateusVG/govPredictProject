/*function nextLetter(letter) {
  letter = letter.substring(0, 1);
  letter = String.fromCharCode(letter.charCodeAt(letter.length - 1) + 1);
  return letter;
}

createTemplate: (count, columns) => {
  let template = '';
  let numerator;
  let letter;

  numerator = count * 10 + 1;
  console.log(numerator);

  for (let index = 1; index < numerator; index++) {
    letter = 'A';
    template += `<tr class ="rows">
    <td>${index}</td>
        <td><input id="${letter}${index}" />
    `;

    for (let index2 = 0; index2 < columns.length - 1; index2++) {
      letter = rowView.nextLetter(letter);
      template += `<td><input id="${letter}${index}" /></td>`;
    }
    template += '</tr>';
  }

  return template;
};*/

function retornaNData(conteudo, n) {
  // Declara variáveis
  let regex;
  //Corrige o indice e cria o regex

  regex = /([0-2][0-9]|(3)[0-1])(.)(((0)[0-9])|((1)[0-2]))(.)(\d{4}|\d{2})/gi;

  // Limpa Conteudo

  // Procura as Datas
  conteudo.match(regex);
}

retornaNData('31/12/1954051');
