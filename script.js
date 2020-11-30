const container = document.querySelector(".content-container");
const calculator = container.querySelector(".calculator")
const keys = document.querySelectorAll('.key');
const screen = document.querySelector(".screen");

const previousKeyType = calculator.dataset.previousKeyType;

console.log(keys)

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
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = screen.textContent;

        if (!action) {

            if (displayedNum === '0' || previousKeyType === 'operator') {
                screen.textContent = keyContent
            } else {
                screen.textContent = displayedNum + keyContent
            }
        }

        if(action == 'decimal') {
            screen.textContent = displayedNum + '.';
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                screen.textContent = displayedNum + keyContent;
                calculator.dataset.previousKeyType = 'operator';
                console.log("operator key");
        }
        
        if (action === 'clear-all') {
            screen.textContent = '';
            console.log('clear all key!')
        }

        if (action === 'clear') {
            console.log(displayedNum)
            console.log(displayedNum.slice(0, -1));
        }
        
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            let operator = calculator.dataset.action;
            let secondValue = displayedNum;
            console.log('equal key!')
        }
    }
}



calculator.addEventListener('click', showNumbers)

keys.forEach(function(key) {
    key.addEventListener('click', calculate);
    console.log(key);
})


