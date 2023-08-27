const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let num1=0;
let num2=0;
let operator="";
let flag=0;
let decimalFlag=false;

function updateDisplayNumber(n) {
    if (display.textContent==="*" || display.textContent==="-" || display.textContent==="+" || display.textContent==="/" || display.textContent==="^") {
        display.textContent="";
    }
    if (decimalFlag) {
        display.textContent=Number(display.textContent+String(n));
        if(flag===0){
            num1=Number(display.textContent);
        }else{
            num2=Number(display.textContent);
        }
        return;
    }else{
        const displayNumber = Number(display.textContent);
        display.textContent=(displayNumber * 10)+Number(n);
        if(flag===0){
            num1=Number(display.textContent);
        }else{
            num2=Number(display.textContent);
        }
    }
}
function updateDisplayOperator(o){
    decimalFlag=false;
    if (o==="=") {
        num1 = calculate(operator,num1,num2);
        num2 = 0;
        display.textContent=num1;
        operator="";
        flag=0;
        return;
    }
    if (flag===1) {
        num1 = calculate(operator,num1,num2);
        num2 = 0;
    }
    display.textContent=o;
    operator=o;
    flag=1;
}
function calculate(operator,num1,num2) {
    if (operator==="/" && num2===0) {
        alert("You can't divide by zero");
        return num1;
    }
    switch (operator) {
        case "+":
            num1=num1+num2;
            break;
        case "-":
            num1=num1-num2;
            break;
        case "*":
            num1=num1*num2;
            break;
        case "/":
            num1=num1/num2;
            break;
        case "^":
            num1=Math.pow(num1,num2);
            break;
        default:
            break;
    }
    num2=0;
    flag=1;
    num1=Number(num1.toFixed(6));
    return num1;
}
function updateDecimal() {
    if (display.textContent==="*" || display.textContent==="-" || display.textContent==="+" || display.textContent==="/") {
        display.textContent="";
    }
    if (decimalFlag) {
        return;
    }
    display.textContent=display.textContent+".";
    decimalFlag=true;
}
function clear() {
    num1=0;
    num2=0;
    operator="";
    flag=0;
    decimalFlag=false;
    display.textContent="0";
}
for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.addEventListener('click', ()=>{
        if (element.classList.contains("number")) {
            updateDisplayNumber(Number(element.textContent));
        }else if (element.classList.contains("operator")) {
            updateDisplayOperator(element.textContent);
        }else if(element.classList.contains("decimal")){
            updateDecimal();
        }else if(element.classList.contains("clear")){
            clear();
        }
        console.log(num1+" "+operator+" "+num2);
    })
}