
const numButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-operator");
const decimal = document.getElementById("decimal");
const clearAllButton = document.getElementById("clear-all");
const backspace = document.querySelector('.backspace');
const screen = document.querySelector(".screen");

let currentNum = '';
let pendingNum;
let evalStringArr = [];



function numberButtonIsClicked(event) {
    let btnText = event.target.innerText;
    if(currentNum == "0") {
        currentNum = "" ;
    }
    currentNum = currentNum + btnText;
    screen.innerText = evalStringArr.join('') + currentNum;

    console.log(btnText);
}

function changeNumbers() {
    pendingNum = currentNum;
    currentNum = '';
    evalStringArr.push(pendingNum);
    console.log(evalStringArr);
}

function ButtonOperatorsAndCalculate(event) {
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
            changeNumbers()
            //This takes the operators and numbers and calculates them. This is where the magic happens
            evaluate = eval(evalStringArr.join(' '));          
            currentNum = evaluate + '';
            //makes sure that only 2 decimal is shown, if calculations have a decimalpoint
            if(currentNum.includes('.')) {
                currentNum = Number(currentNum).toFixed(2);
            }            
            screen.innerText = currentNum;
            evalStringArr = [];
            console.log(evaluate);
            break;                
    }
}

function addButtonOperator(operator) {
    changeNumbers();
    evalStringArr.push(operator);
    screen.innerText = evalStringArr.join('')
}


function addDecimal() {
    if(!currentNum.includes('.')) {
        currentNum = currentNum + '.';
    }
    screen.innerText = evalStringArr.join('') + currentNum;
}

//When clear-all button is clicked or delete button is pressed, clear screen
function clearScreen() {
    currentNum = '';
    pendingNum = '';
    evalStringArr = [];
    screen.innerText = '';
    console.log('clear all clicked');
}

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
    screen.innerText = evalStringArr.join('') + currentNum;
}


//All event Listeners for buttons
backspace.addEventListener('click', backspaceIsPressed);

decimal.addEventListener("click", addDecimal)

clearAllButton.addEventListener('click', function() {
    clearScreen();
    operator = null;

})

numButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        numberButtonIsClicked(e);
    })
})

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        ButtonOperatorsAndCalculate(e) 
    })
})




