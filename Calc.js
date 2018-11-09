let bool=0,floatpoint=0;
function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}
function divide(a, b) {
    if (b == 0) return "Error!"
    return (a / b);
}

function Operate(operator, a, b) {
    let results = 0;
    if (operator == '+') results = add(a, b);
    else if (operator == '-') results = subtract(a, b);
    else if (operator == '*') results = multiply(a, b);
    else if (operator == '/') results = divide(a, b);
    return results;
}

let clear = document.querySelector('#clear');
clear.addEventListener('click', (e) => {
    let p = document.querySelector('#txt');
    p.value = "";
});
let Del = document.querySelector('#del');
Del.addEventListener('click', (e) => {
    let p = document.querySelector('#txt');
    p.value = p.value.substring(0,p.value.length-1);
});
let numbers = document.querySelectorAll('.number');
numbers.forEach((num) => num.addEventListener('click', updatetext));

function updatetext(e) {
    let p = document.querySelector('#txt');
    if(p.value=="Error!"||p.value==0)p.value="";
    if (e.target.value == '=') {
        p.value = GetRes(p.value);
        bool=1;
        return;
    }
    if(IsNumber(e.target.value)&&bool)
    {
        p.value="";
        bool=0;
    }
    else bool=0;
    p.value += e.target.value;
}

function GetRes(All) {
    if(All.length==0)return 0;
    if (!IsNumber(All[0]))
        if(All[0]!='-')
            return "Error!";
    if(!IsNumber(All[All.length-1]))
            return "Error!";
    let results="",i=0,op,b="";
    if(All[0]=='-'){results+=All[0];i++;}
    for(i;i<All.length;i++)
    {
        if(!IsNumber(All[i])){op=All[i];i++;break;}
        results+=All[i];
    }
    for(i;i<All.length;i++)
    {
        // console.log(i);
        if(!IsNumber(All[i]))
        {
            // console.log(results,' ',op,' ',b);
            results=Operate(op,parseFloat(results),parseFloat(b));
            b="";
            op=All[i];
        }
        else b+=All[i];
        if(i==All.length-1)
        {
            // console.log(results,' ',op,' ',b);
            results=Operate(op,parseFloat(results),parseFloat(b));
        }
    }
    return results;
}
let IsNumber = function (ch) {
    return (0<=ch && 9>=ch)||ch=='.';
}