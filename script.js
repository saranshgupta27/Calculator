alert("FOR KEYBOARD: Left Ctrl= Reset/Ac Enter= Result Backspace=Clear/CE")

function add(arg1, arg2) {
  return roundFourDecimals(arg1 + arg2);
}

function subtract(arg1, arg2) {
  return roundFourDecimals(arg1 - arg2);
}

function multiply(arg1, arg2) {
  return roundFourDecimals(arg1 * arg2);
}

function divide(arg1, arg2) {
  if (arg2 == 0) {
    reset = 1;
    return "Error";
  } else {
    return roundFourDecimals(arg1 / arg2);
  }
}
function remainder(arg1, arg2) {
  return roundFourDecimals(arg1 % arg2);
}
function roundFourDecimals(num) {
  return Math.round(num * 10000) / 10000;
}

const tb = document.querySelector("#t1");
const history = document.querySelector("#history");
const ops = document.querySelector("#ops");
var bt = Array.from(document.querySelectorAll(".btn"));
var operators = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "%": remainder,
};
bt.forEach(bt_add);
var a = 0;
var b = 0;
op = "+";
var click = 0;
var result = 0;
tb.textContent = "0";
op.textContent = "";
var reset = 0;

function bt_add(x) {
  if (`${x.textContent}` == "AC") {
    x.addEventListener("click", ac);
  } else if (`${x.textContent}` == "CE") {
    x.addEventListener("click", ce);
  } else if (`${x.textContent}` == "=") {
    x.addEventListener("click", equal);
  } else if (`${x.textContent}` in operators == true) {
    x.addEventListener("click", op);
  } else {
    x.addEventListener("click", btn_click);
  }
}
function ac() {
  tb.textContent = "0";
  history.innerHTML = "&nbsp";
  ops.textContent = "";
  a = b = 0;
  click = 0;
  result = 0;
  reset = 0;
  op = "+";
}

function ce() {
  tb.innerHTML = "&nbsp";
}

function equal() {
  if (reset == 1) {
    tb.textContent = "0";
    history.innerHTML = "&nbsp";
    ops.textContent = "";
    a = b = 0;
    click = 0;
    result = 0;
    reset = 0;
    op = "+";
  } else {
    tb.textContent = `${result}`;
    history.innerHTML = "&nbsp";
    ops.innerHTML = "&nbsp";
    click = 0;
    var f = operators[op];
    result = f(a, b);
    tb.textContent = `${result}`;
  }
}

function btn_click() {
  if (reset == 1) {
    tb.textContent = "0";
    history.innerHTML = "&nbsp";
    ops.textContent = "";
    a = b = 0;
    click = 0;
    result = 0;
    reset = 0;
    op = "+";
  } else {
    a = Number(history.textContent);
    if (click == 0) {
      tb.textContent = `${this.textContent}`;
      history.textContent = `${result}`;
      click = 1;
    } else {
      tb.textContent += `${this.textContent}`;
    }
    b = Number(tb.textContent);

  }
}

function op() {
  if (reset == 1) {
    tb.textContent = "0";
    history.innerHTML = "&nbsp";
    ops.textContent = "";
    a = b = 0;
    click = 0;
    result = 0;
    reset = 0;
    op = "+";
  } else {
    var current_op = `${this.textContent}`;
    history.textContent = b;
    ops.textContent = `${this.textContent}`;
    var f = operators[op];
    result = f(a, b);
    if (reset == 1) {
      tb.textContent = `${result}`;
      history.innerHTML = "&nbsp";
      ops.textContent = "";
    } 
    else {
      history.textContent = `${result}`;
      tb.innerHTML = "&nbsp";
      op = current_op;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(e) {
  let keyInputArray = e.code.match(/[A-Z][a-z]+|[0-9]+/g);
  let keyInput = keyInputArray[keyInputArray.length - 1].toLowerCase();
 
  console.log(keyInput);
  if (keyInput == 'enter') {
    keyInput = 'equals';
}
if (keyInput == 'left') {
  keyInput = 'reset';
}

 
  document.querySelector(`[data-key='${keyInput}']`).click();
}