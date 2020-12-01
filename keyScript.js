const calculator = document.querySelector(".calculator");

const numButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-operator");
const decimal = document.getElementById("decimal");
const clearAllButton = document.getElementById("clear-all");

const screen = document.querySelector(".screen");

let currentNum = '0';
let pendingNum;
let evalStringArr = [];


let keyText;

let operator;


function showKeyNumbers(event) {
    let key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    keyText = key.innerText;

    if(currentNum == "0") {
        currentNum = "" ;
    }

    currentNum = currentNum + keyText;
    screen.innerText = currentNum;
    console.log('showKey ' + currentNum);    
}

function changeNumDisplay() {
    pendingNum = currentNum;
    currentNum = 0;    
    evalStringArr.push(pendingNum);

}

function keyOperators() {
    switch (keyText) {
        case '+':
            operator = add;
            changeNumDisplay();
            evalStringArr.push('+');
            console.log(evalStringArr)

            break;
        case '-' :
            operator = subtract;
            changeNumDisplay();
            evalStringArr.push('-');

            break;
        case '%':
            operator = divide;
            changeNumDisplay();
            evalStringArr.push('/');

            break;
        case 'x':
            operator = multiply;
            changeNumDisplay()
            evalStringArr.push('*');

            break;
        /*case '=':
            changeNumDisplay()
            evaluate = eval(evalStringArr.join(' '));
            currentNum = evaluate + '';
            screen.innerText = currentNum;
            evalStringArr = [];
            console.log(evaluate);
            break;   */             
    }
}


function enterIsPressed() {
    if (keyText == '=') {
        changeNumDisplay()
        let arrToStr = evalStringArr.toString();
        let findOnlyNum = /[0-9]/g;
        let result = arrToStr.match(findOnlyNum);
        console.log(arrToStr)
        let firstValue = parseFloat(result[0]);
        let secondValue = parseFloat(result[1]);

        console.log(firstValue)
        
        let outcome;

        switch (operator) {
            case add:
                outcome = operate(add, firstValue, secondValue);
                console.log('added ' + outcome);
                break;
            case subtract:
                outcome = operate(subtract, firstValue, secondValue);
                console.log('subtracted ' + outcome);
                break;
            case multiply:
                outcome = operate(multiply, firstValue, secondValue);
                console.log('multiplyed ' + outcome);
                break;
            case divide:
                outcome = divide(firstValue, secondValue);
                outcome = outcome
                console.log('divided ' + outcome.toFixed(2));
                break;

        }

        
    }
}


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(func, a, b) {
    return func(a,b)
}



window.addEventListener('keydown', function(e) {
    showKeyNumbers(e)
    keyOperators()
    enterIsPressed()
})