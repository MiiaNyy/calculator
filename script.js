const calculator = document.querySelector(".calculator");
const numButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-operator");
const decimal = document.getElementById("decimal");
const clearAllButton = document.getElementById("clear-all");
const screen = document.querySelector(".screen");

let currentNum = 0;
let pendingNum;
let evalStringArr = [];

let operator;
let keyText;

let evaluate;


function showNumbers(event) {
    let btnText = event.target.innerText;

    if(currentNum == "0") {
        currentNum = "" ;
    }

    currentNum = currentNum + btnText;
    screen.innerText = currentNum;

    console.log(btnText);
}

function changeNumDisplay() {
    pendingNum = currentNum;
    currentNum = 0;
    evalStringArr.push(pendingNum);
    console.log(evalStringArr);
}

function calculate(event) {
    operator = event.target.innerText;

    switch (operator) {
        case '+':
            changeNumDisplay();
            evalStringArr.push('+');
            break;
        case '-' :
            changeNumDisplay();
            evalStringArr.push('-');
            break;
        case '%':
            changeNumDisplay();
            evalStringArr.push('/');
            break;
        case 'x':
            changeNumDisplay()
            evalStringArr.push('*');
            break;
        case '=':
            changeNumDisplay()
            evaluate = eval(evalStringArr.join(' '));
            currentNum = evaluate + '';
            screen.innerText = currentNum;
            evalStringArr = [];
            console.log(evaluate);
            break;                
    }
}


function addDecimal() {
    if(!currentNum.includes('.')) {
        currentNum = currentNum + '.';
    }
    screen.innerText = currentNum;
}

function reset() {
    currentNum = 0;
    pendingNum = 0;
    evalStringArr = [];
    operator = null;
    screen.innerText = currentNum;
    console.log('clear all clicked');
}



decimal.addEventListener("click", addDecimal)

clearAllButton.addEventListener('click', function() {
    reset();
})

numButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        showNumbers(e);
    })
})

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        calculate(e) 
    })
})




