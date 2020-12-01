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
        case '*':
            changeNumDisplay()
            evalStringArr.push('*');
            break;
        case '=':
            changeNumDisplay()
            let evaluate = eval(evalStringArr.join(' '));
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


clearAllButton.addEventListener('click', function() {
    currentNum = 0;
    pendingNum = 0;
    evalStringArr = [];
    operator = null;
    screen.innerText = currentNum;
    console.log('clear all clicked');
})

numButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        showNumbers(e);
        addDecimal()
    })
})

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        calculate(e) 
    })
})











































































/*
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

 

function showNumbers(e) {
    if(e.target.matches('.key')) {
        const button = e.target; //This is the whole div, what i pressed
        const action = button.dataset.action; //This shows the data-action that i pressed        
        const buttonContent = button.textContent; // shows what is inside the div that i pressed. In this case what is inside the kbd element
        const displayedNum = screen.textContent; //What you see in the calculators screen
        let operator;
//console.log(numButton)
        if (!action) {

            if (displayedNum === '0') {
                screen.textContent = buttonContent;
            } else {
                screen.textContent = displayedNum + buttonContent
            }
        }

        if(action == 'decimal') {
            screen.textContent = displayedNum + '.';
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                screen.textContent = displayedNum + buttonContent;
                operator = buttonContent;

                console.log(operator);
                console.log("operator button");
        }
        
        if (action === 'clear-all') {
            screen.textContent = '';
            console.log('clear all button!')
        }

        if (action === 'clear') {
            console.log(displayedNum)
            console.log(displayedNum.slice(0, -1));
        }
        
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.action;
            let secondValue = displayedNum;
            
        }
    }
}



calculator.addEventListener('click', showNumbers)

*/

