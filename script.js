//This page is for clicked events and shared functions

const numButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-operator");

const decimal = document.getElementById("decimal");
const clearAllButton = document.getElementById("clear-all");
const backspace = document.querySelector('.backspace');

const screenResult = document.querySelector(".result");

//When enter is pressed this shows calculation
let operationDisplay = document.querySelector('.operation');

let currentNum = '';
let pendingNum;
let evalStringArr = [];


//When number is clicked it takes btn innerText and shows it in the screen
function numberButtonIsClicked(event) {
    let btnText = event.target.innerText;
    if(currentNum == "0") {
        currentNum = "" ;
    }
    currentNum = currentNum + btnText;
    screenResult.innerText = evalStringArr.join('') + currentNum;

    console.log(btnText);
}

//When clicked button or key, currentNum is  the pressed number
//When another number is pressed, currentNum becomes pendingNum and is pushed to the array
//This is shared function
function changeNumbers() {
    pendingNum = currentNum;
    currentNum = '';
    evalStringArr.push(pendingNum);
    console.log(evalStringArr);
}

function operatorDisplayAndCalculations(event) {
    let operator = event.target.innerText;
    console.log('operator is ' + operator);
    let evaluate;

    switch (operator) {
        case '+':
            addButtonOperator('+');
            break;
        case '-' :
            addButtonOperator('-');
            break;
        case '%':
            addButtonOperator('/');
            break;
        case 'x':            
            addButtonOperator('*');
            break;
        case '=':
            changeNumbers();

            operationDisplay.innerText = evalStringArr.join(' ') + ' =';

            //This takes the operators and numbers and calculates them. This is where the magic happens
            evaluate = eval(evalStringArr.join(' '));          
            currentNum = evaluate + '';
            //makes sure that only 2 decimal is shown, if calculations have a decimalpoint
            if(currentNum.includes('.')) {
                currentNum = Number(currentNum).toFixed(2);
            }            
            screenResult.innerText = currentNum;
            evalStringArr = [];
            console.log(evaluate);
            break;                     
    }
}

function addButtonOperator(operator) {
    changeNumbers();
    evalStringArr.push(operator);
    screenResult.innerText = evalStringArr.join('')
}


function addDecimal() {
    if(!currentNum.includes('.')) {
        currentNum = currentNum + '.';
    }
    screenResult.innerText = evalStringArr.join('') + currentNum;
}

//When clear-all button is clicked or delete button is pressed, clear screen
function clearScreen() {
    currentNum = '';
    pendingNum = '';
    evalStringArr = [];
    screenResult.innerText = '';
    operationDisplay.innerText = '';
    console.log('clear all clicked');
}

//This is shared function
function backspaceIsPressed() {

    if (currentNum != '') {
        console.log('array is empty');
        currentNum = currentNum.slice(0, -1)
    } else {
        console.log(evalStringArr)

        let lastElementFromArr = evalStringArr[evalStringArr.length - 1];
        console.log('last element from array is before removing it is ' + lastElementFromArr)
        lastElementFromArr = lastElementFromArr.slice(0, -1)

        if (lastElementFromArr.length == 0) {
            evalStringArr.pop()
        } else {
            evalStringArr[evalStringArr.length - 1] = lastElementFromArr;
        }

        console.log(evalStringArr);
    }
    screenResult.innerText = evalStringArr.join('') + currentNum;
    operationDisplay.innerText = '';
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('key-down');
}

function addColorWhenKeyIsPressed() {
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
}

function mediaQueryForPhones() {
    let windowWidth = document.documentElement.clientWidth;
    if (windowWidth < 400) {
        addColorWhenKeyIsPressed();
    }
    console.log('windows width is ' + windowWidth);
}

//All event listeners for buttons


backspace.addEventListener('click', backspaceIsPressed);

decimal.addEventListener("click", addDecimal)

clearAllButton.addEventListener('click', function() {
    clearScreen();
    operator = null;
})

numButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        numberButtonIsClicked(e);
        operationDisplay.innerText = '';
    })
})

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        operatorDisplayAndCalculations(e) 
    })
})




