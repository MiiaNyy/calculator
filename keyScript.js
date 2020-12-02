const calculator = document.querySelector(".calculator");

const screen = document.querySelector(".screen");

let currentNum = '';
let pendingNum;
let evalStringArr = [];
let keyText;


function whenKeyIsPressed(event) {
    let key = document.querySelector(`div[data-key="${event.keyCode}"]`);

    if(key.innerText === 'Clear') {
        console.log('You pressed delete');
        reset()
    } else {
        keyText = key.innerText;
        addKeyOperatorsAndCalculate();
    }  

}

function changeNumbers() {
    pendingNum = currentNum;
    currentNum = '';
    evalStringArr.push(pendingNum);
    console.log(evalStringArr);
}

function addKeyOperatorsAndCalculate() {
    switch (keyText) {
        case '+':      
            addKeyOperator('+');            
            break;
        case '-' :            
            addKeyOperator('-');
            break;
        case '%':            
            addKeyOperator('/');
            break;
        case 'x':            
            addKeyOperator('*');
            break;
        case '=':
            changeNumbers()
            removeTrailingOperator();
            evaluate = eval(evalStringArr.join(' '));            
            currentNum = evaluate + '';
            //makes sure that only 2 decimal is shown, if calculations have a decimalpoint
            if(currentNum.includes('.')) {
                currentNum = Number(currentNum).toFixed(2);
            }            
            screen.innerText = currentNum;
            evalStringArr = [];
            break;
        //Non operators (numbers)             
        default:
            console.log('Updating screen text, currentNum: ' + currentNum + ' keyText: ' + keyText);
            currentNum = currentNum + keyText;
            backspaceIsPressed();


            screen.innerText = evalStringArr.join('') + currentNum;
            break;
    }
}

function removeTrailingOperator() {
    let lastElement = evalStringArr[evalStringArr.length - 1];

    while(!isNumeric(lastElement)) {
        console.log('last element ' + lastElement + ' is not numeric, removing it');

        evalStringArr.splice(-1);
        lastElement = evalStringArr[evalStringArr.length - 1];
    }          
}

function addKeyOperator(operator) {
    changeNumbers();
    removeTrailingOperator();
    evalStringArr.push(operator);
    screen.innerText = evalStringArr.join('');
    
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function reset() {
    currentNum = '';
    pendingNum = '';
    evalStringArr = [];
    screen.innerText = '';
}

function backspaceIsPressed() {
    console.log('Before pressing backspace, array is ' + evalStringArr)
    if(currentNum.includes('c')) {
        console.log('backspace pressed');
        //mahdollisesti vois korvata indexOf
        evalStringArr = evalStringArr.toString().slice(0, - 1);
        currentNum = ''
        console.log('After pressing backspace, array is ' + evalStringArr)
    }
}


window.addEventListener('keydown', function(e) {    
    whenKeyIsPressed(e);
})
