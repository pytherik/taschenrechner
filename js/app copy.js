const key     = document.querySelectorAll('.key'); 
const result = document.getElementById('result');  
const signs = document.getElementById('signs');    

let termsArray = [];
let operator = '';
let term = '';

result.innerHTML = 0;

for (let i = 0; i < key.length; i++) {
  key[i].addEventListener('click', () => {
    input = key[i].innerHTML.trim();
    if (input.match('[0-9]')) {
      console.log(operator);
      if (operator != '' && term == '' && termsArray.length == 0) {
        term = input;
      } else {
        term += input;
      }
      result.innerHTML = term;
    } else if (input == 'c') {
      termsArray = [];
      term = '';
      operator = '';
      result.innerHTML = 0;
      signs.innerHTML = '';
    } else if (input == 'ce') {
      if (term != '') {
        term = term.slice(0, -1);
        result.innerHTML = term;
      }
    } else {
      if (input != '=' && term != '') {
        termsArray.push(term);
        if (termsArray.length > 1) {
          term = calculate(operator, termsArray);
          result.innerHTML = term;
          termsArray = [term];
        } else {
          term = '';
        }
        operator = input;
        signs.innerHTML = operator;
      } else if (input == '=' && operator != '' && term != '') {
        termsArray.push(term);
        term = calculate(operator, termsArray);
        result.innerHTML = term;
        termsArray = [];
        operator = '=';
        signs.innerHTML = operator;
      } else {
        termsArray.push(term);
        term = '';
        if (termsArray.length > 1) {
          termsArray = [calculate(operator, termsArray)];
          result.innerHTML = termsArray[0];
        }
      }
    }
    console.log(term, termsArray);
    }
  )
}
  
function calculate(operator, termsArray) {
  let a = parseFloat(termsArray[0]);
  let b = parseFloat(termsArray[1]);
  let result = 0;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '×':
      result = a * b;
      break;
    case '÷':
      result = a / b;
      break;
    case '^':
      result = a ** b;
      break;
    }
  return (result.toString()).slice(0, 10); 
}
