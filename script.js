
const numButtons = document.querySelectorAll(".btn-num");
const operatorButtons = document.querySelectorAll(".btn-operator");
const decimal = document.getElementById("decimal");
const clearAllButton = document.getElementById("clear-all");
const screen = document.querySelector(".screen");

let currentNum = '';
let pendingNum;
let evalStringArr = [];



function buttonIsClicked(event) {
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

function reset() {
    currentNum = '';
    pendingNum = '';
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
        buttonIsClicked(e);
    })
})

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
        ButtonOperatorsAndCalculate(e) 
    })
})




