const key = document.querySelectorAll(".key"); //: all keys of the calculator
const display = document.getElementById("result"); //: result display panel
const signs = document.getElementById("signs"); //: display for the operator
const calc = document.querySelector(".calc");
let termsArray = [];
let fullArray = [];
let operator = "";
let term = "";

display.innerHTML = 0;
resultFlag = false;

//: input mainloop
for (let i = 0; i < key.length; i++) {
  key[i].addEventListener("click", () => {
    input = key[i].innerHTML.trim();
    //: input is a number
    if (input.match("[0-9.]")) {
      console.log(operator);
      if (
        (operator != "" && resultFlag == true) ||
        (operator == "=" && termsArray.length == 0)
      ) {

        term = input;
        resultFlag = false;
        if (operator == "=") {
          signs.innerHTML = "";
          operator = "";
        }
      } else {
        term += input;
      }
      display.innerHTML = term;
      //: input is not a number (c = clear, ce = delete last digit)
    } else if (input == "c") {
      termsArray = [];
      fullArray = [];
      term = "";
      operator = "";
      display.innerHTML = 0;
      resultFlag = false;
      signs.innerHTML = "";
    } else if (input == "ce") {
      if (term != "") {
        term = term.slice(0, -1);
        display.innerHTML = term;
      }
    } else {
      //: input is an operator
      if (input != "=" && term != "") {
        termsArray.push(term);
        fullArray.push(term);
        if (termsArray.length > 1) {
          term = calculate(operator, termsArray);
          display.innerHTML = term;
          termsArray = [term];
          fullArray.push("=", term);
          resultFlag = true;
        } else {
          term = "";
        }
        operator = input;
        fullArray.push(operator);
        signs.innerHTML = operator;
        //: input is eqal sign
      } else if (input == "=" && operator != "" && term != "") {
        termsArray.push(term);
        fullArray.push(term);
        term = calculate(operator, termsArray);
        display.innerHTML = term;
        fullArray.push("=", term);
        termsArray = [];
        operator = "=";
        resultFlag = true;
        signs.innerHTML = operator;
      } else if (term != "") {
        termsArray.push(term);
        term = "";
        if (termsArray.length > 1 && termsArray[1] != "") {
          console.log("before calc: ", termsArray);
          termsArray = [calculate(operator, termsArray)];
          display.innerHTML = termsArray[0];
        }
      }
    }
    console.log(term, termsArray);
    // console.log(fullArray);
    let calcPath = "";
    fullArray.forEach((item) => {
      calcPath += item.toString();
    })
    calc.innerHTML = calcPath;
  });
}

function calculate(operator, termsArray) {
  let a = parseFloat(termsArray[0]);
  let b = parseFloat(termsArray[1]);
  let result = 0;
  //: detect fitting calculation
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "×":
      result = a * b;
      break;
    case "÷":
      result = a / b;
      break;
    case "^":
      result = a ** b;
      break;
  }
  return result.toString().slice(0, 10); //: cut output to 10 digits
}
