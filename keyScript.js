//This page is key pressed events

let keyText;


//Takes correct numbers and operations from key presses and forwards them to another function
function whenKeyIsPressed(event) {
    let key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    key.classList.add('key-down');
    if (key.innerText === 'Clear') {
        console.log('You pressed delete');
        clearScreen();
    } else {
        keyText = key.innerText;
        elementDisplayAndCalculations();
    }
}

function elementDisplayAndCalculations() {
    switch (keyText) {
        case '+':
            addKeyOperator('+');
            break;
        case '-':
            addKeyOperator('-');
            break;
        case '%':
            addKeyOperator('/');
            break;
        case 'x':
            addKeyOperator('*');
            break;
        case '=':
            changeNumbers();
            removeTrailingOperator();
            //Calculates numbers in the array
            evaluate = eval(evalStringArr.join(' '));
            currentNum = evaluate + '';
            //makes sure that only 2 decimal is shown, if calculations have a decimalpoint
            if (currentNum.includes('.')) {
                currentNum = Number(currentNum).toFixed(2);
            }
            screen.innerText = currentNum;
            evalStringArr = [];
            break;
        case 'c':
            backspaceIsPressed();
            screen.innerText = evalStringArr.join('') + currentNum;
            break;
        //Non operators (numbers)             
        default:
            console.log('Updating screen text, currentNum: ' + currentNum + ' keyText: ' + keyText);
            currentNum = currentNum + keyText;
            //This shows the numbers in the screen
            screen.innerText = evalStringArr.join('') + currentNum;
            break;
    }
}

//Makes sure that you cannot add two operators in a row. Removes the last operator
function removeTrailingOperator() {
    let lastElement = evalStringArr[evalStringArr.length - 1];

    while (!isNumeric(lastElement)) {
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

//This is for the little animation when key is pressed down
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('key-down');
}

function addColorWhenKeyIsPressed() {
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
}

addColorWhenKeyIsPressed();

window.addEventListener('keydown', function (e) {
    whenKeyIsPressed(e);
})