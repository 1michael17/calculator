const quesView = document.querySelector('.ques');
const ansView = document.querySelector('.ans');

const dNumbers = document.querySelector('.numbers');
const dControls = document.querySelector('.controls');
const allControl = document.querySelectorAll('.control');

const dot = document.querySelector('.dot');
const equalsBtn = document.querySelector('.equalsTo');
const delBtn = document.querySelector('.del');
const clearBtn = document.querySelector('.clear');


equalsBtn.setAttribute('disabled', 'disabled');
delBtn.setAttribute('disabled', 'disabled');
dDisabler(allControl);

/** Global Variables */
let newOperator = null, newNum = null, num1 = null, num2 = null, result = null,
theState = 'done', newResult = null, dDivide;
let book = 1;
let firstNum = [];
let secondNum = [];


dNumbers.addEventListener('click', (event) => {
    newNum = event.target.value;

    if (newNum == 0 || newNum <= 9) {
        if(dDivide = 'No'){
            ansView.textContent = ``;
            dDivide = '';
        }

        if (result !== null) {
            result = null;
            quesView.textContent = '';
            ansView.textContent = '';
        }

        if (book === 1) {
            if (firstNum.length < 4){
                firstNum.push(newNum);
                quesView.textContent += `${newNum}`;
            }
            unDisabler(allControl);
            delBtn.removeAttribute('disabled');
        }

        if (book > 1) {
            if (secondNum.length < 4){
                secondNum.push(newNum);
                quesView.textContent += `${newNum}`;
            }
        }

    }
});

dControls.addEventListener('click', (event) => {
    num1 = parseFloat(firstNum.join(''));
    firstNum = [];
    switchOperator(event);
    dDisabler(allControl);
    book = 2;
    
    dot.removeAttribute('disabled');
    equalsBtn.removeAttribute('disabled');
    delBtn.removeAttribute('disabled');
    
    quesView.textContent = `${num1} ${newOperator} `;

    if (theState === 'done' && result !== null) {
        result = null;
        num1 = newResult;
        quesView.textContent = `${num1} ${newOperator} `;
        equalsBtn.removeAttribute('disabled');
    }
});

equalsBtn.addEventListener('click', () => {
    equalsBtn.setAttribute('disabled', 'true');
    
    num2 = parseFloat(secondNum.join(''));
    solve(num1, num2);
    
    newResult = Math.round(result * 100) / 100;
    
    secondNum = [];
    
    let num = newResult;
    let formattedRes = addCommas(num);
    console.log(formattedRes);
    
    quesView.textContent = `${num1} ${newOperator} ${num2}`;
    ansView.textContent = ``;
    ansView.textContent += `${formattedRes} `;
    
    if(dDivide == 'No'){
        quesView.textContent = '';
        ansView.textContent = 'Indivisible by Zero';
    }
    
    num2 = null;
    book = 1;
    theState = 'done';
    
    delBtn.setAttribute('disabled', 'disabled');
    dot.setAttribute('disabled', 'disabled');
    
    
    unDisabler(allControl);
    
    return equalsBtn.setAttribute('disabled', true);
});
//Add
clearBtn.addEventListener('click', () => {
    clearFn();
});

//Add
function addCommas(number) {
    return number.toLocaleString();
}

//Add
delBtn.addEventListener('click', () => {
    if (book === 1) {
        firstNum.pop();
        unDisabler(allControl);
        let show1 = firstNum.join('');
        quesView.textContent = `${show1}`;
        
        if (firstNum === '') {
            delBtn.setAttribute('disabled', 'disabled');
        }
        return;
    }

    else if (book > 1) {
        secondNum.pop();
        let show2 = secondNum.join('');
        quesView.textContent = `${num1} ${newOperator} ${show2}`;
        
        if (secondNum.length < 0) {
            delBtn.setAttribute('disabled', 'disabled');
        }
    } 
});

dot.addEventListener('click', () => {
    if (book == 1) {
        firstNum.push('.');
    }
    else if (book > 1) {
        secondNum.push('.');
    }

    quesView.textContent += '.';
    dot.setAttribute('disabled', 'disabled');
});

//**Functions */
function clearFn(){
    newOperator = null, newNum = null, num1 = null, num2 = null, result = null, theState = null, newResult = null;
    book = 1;
    firstNum = [];
    secondNum = [];
    quesView.textContent = ``;
    ansView.textContent = ``;
    console.log("Clear Btn");
    dDisabler(allControl);
    equalsBtn.setAttribute('disabled', 'disabled');
    dot.setAttribute('disabled', 'disabled');
}

function solve(num1, num2) {
    if (newOperator === '+') toAdd(num1, num2);
    if (newOperator === '-') toMinus(num1, num2);
    if (newOperator === '*') toMultiply(num1, num2);
    if (newOperator === '/'){
        if(num2 === 0){
            clearFn();
            dDivide = 'No';
            return false;
        }
        toDivide(num1, num2);
    };
}

function toAdd(a, b) {
    return result = a + b;
}
function toMinus(a, b) {
    return result = a - b;
}
function toMultiply(a, b) {
    return result = a * b;
}
function toDivide(a, b) {
    return result = a / b;
}
function toPercent(a, b) {
    return result = a * (b / 100);
}

function switchOperator(event) {
    switch (event.target.value) {
        case '+':
            newOperator = '+';
            break;
        case '-':
            newOperator = '-';
            break;
        case '*':
            newOperator = '*';
            break;
        case '/':
            newOperator = '/';
            break;
        // case '%':
        //     newOperator = '%';
        //     break;
        default:
            break;
    }
}

function dDisabler(dNode) {
    dNode.forEach(dNodes => {
        return dNodes.setAttribute('disabled', 'disabled');
    });
}

function unDisabler(dNode) {
    dNode.forEach(dNodes => {
        return dNodes.removeAttribute('disabled');
    });
}
