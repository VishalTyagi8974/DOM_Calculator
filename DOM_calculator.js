const ans = document.querySelector("#screen span:nth-of-type(1)");
const exp = document.querySelector("#screen span:nth-of-type(2)");



/////////////////////////////////
const divide = document.querySelector("#divide");
divide.addEventListener("click", () => {
    if (exp.innerText.length < 11) {
        exp.innerText += "/";
    }
})
const add = document.querySelector("#add");
add.addEventListener("click", () => {
    if (exp.innerText.length < 11) {
        exp.innerText += "+";
    }
})

const subtract = document.querySelector("#subtract");
subtract.addEventListener("click", () => {
    if (exp.innerText.length < 11) {
        exp.innerText += "-";
    }
})

const multiply = document.querySelector("#multiply");
multiply.addEventListener("click", () => {
    if (exp.innerText.length < 11) {
        exp.innerText += "x";
    }
})

////////////////////////////////////////

function screenClear() {
    ans.innerHTML = "";
    exp.innerHTML = "0";
}

const clear = document.querySelector("#clear");

clear.addEventListener("click", screenClear);


for (let i = 0; i <= 9; i++) {
    const num = document.querySelector(`#b${i}`);
    num.addEventListener("click", () => {

        if (exp.innerText === "0") {
            exp.innerText = i;
        } else if (exp.innerText.length < 12) {
            exp.innerText += i;

        }
    })
}

const back = document.querySelector("#back");

back.addEventListener("click", () => {
    if (exp.innerText.length > 1) {
        exp.innerText = exp.innerText.slice(0, exp.innerText.length - 1);
    } else {
        screenClear();

    }
})

const dblzero = document.querySelector("#b00");

dblzero.addEventListener("click", () => {
    if (exp.innerText.length <= 10 && exp.innerText !== "0") {
        exp.innerText += "00";
    }
})


//////// hidden buttons/////

const lbrac = document.querySelector("#lBracket");
lbrac.addEventListener("click", () => {
    if (exp.innerText.length < 10 && exp.innerText[exp.innerText.length - 1] !== Number(exp.innerText[exp.innerText.length - 1]) && exp.innerText[exp.innerText.length - 1] !== ".") {
        exp.innerText += "(";
    }
})
const rbrac = document.querySelector("#rBracket");
rbrac.addEventListener("click", () => {
    if (exp.innerText.length <= 11 && exp.innerText[exp.innerText.length - 1] !== Number(exp.innerText[exp.innerText.length - 1]) && exp.innerText[exp.innerText.length - 1] !== ".") {
        exp.innerText += ")";
    }
})
/////////////////////
// equals

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
    let s = expToString(exp.innerText);
    if (!s) {
        exp.innerText = "wrong exp";
    } else {
        exp.innerText = calculate(s);;
    }
})



////////////////////////////////
function expToString(s) {
    let res = "";
    for (let c of s) {
        if (c == "x") {
            res += "*"
        } else {
            res += c
        }
    }
    if (stringChecker(res)) {
        return res;
    }
    return "";
}


function stringChecker(s) {
    let st = [];
    for (let c of s) {
        if (c === "(") {
            st.push("(");
        } else if (c === ")") {
            if (st.length === 0) {
                return false;
            } else {
                st.pop();
            }
        }
    }
    if (st.length > 0) {
        return false;
    }
    s = "+" + s;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === "(" && !(s[i - 1] === '+' || s[i - 1] === '-' || s[i - 1] === '*' || s[i - 1] === '/')) {
            return false;
        }
        else if ((s[i] === '+' || s[i] === '-' || s[i] === '*' || s[i] === '/' || s[i] === ")") && (s[i - 1] === '+' || s[i - 1] === '-' || s[i - 1] === '*' || s[i - 1] === '/')) {
            return false
        }

    }
    return true;
}

function calculate(s) {
    return dfs(s + "+")[0];
}

function dfs(s) {
    let prevSign = '+';
    let num = 0;
    let st = [];
    let i = 0;
    while (i < s.length) {
        if (s[i] === '(') {
            const ans = this.dfs(s.slice(i + 1));
            num = ans[0];
            i += ans[1] + 1;
            continue;
        } else if (s[i] === ')') {
            mathsOperation(prevSign, num, st);
            return [sum(st), i + 1];
        }

        if (!isNaN(parseInt(s[i]))) {
            num *= 10;
            num += parseInt(s[i]);
        }

        if (s[i] === '+' || s[i] === '-' || s[i] === '*' || s[i] === '/') {
            mathsOperation(prevSign, num, st);
            prevSign = s[i];
            num = 0;
        }

        i++;
    }
    return [sum(st), i];
}

function mathsOperation(prevSign, num, st) {
    if (prevSign === '+') {
        st.push(num);
    } else if (prevSign === '-') {
        st.push(-num);
    } else if (prevSign === '*') {
        st.push(st.pop() * num);
    } else if (prevSign === '/') {
        st.push(Math.trunc(st.pop() / num));
    }
}

function sum(st) {
    return st.reduce((acc, val) => acc + val, 0);
}

equal.addEventListener("click", () => {
    ans.innerText = "";
})

const allButtons = document.querySelectorAll("button");

for (let btn of allButtons) {
    if (btn.id === "clear") {
        ans.innerText = "";
    } else if (btn.id === "tohide") {
        continue;
    } else if (btn.id === "equal") {
        ans.innerText = "";
    } else if (btn.id === "back" && exp.innerText === "0") {
        ans.innerText = "";
    } else {
        btn.addEventListener("click", () => {
            let s = expToString(exp.innerText);
            if (!s) {
                ans.innerText = "X EXP";
            } else {
                ans.innerText = calculate(s);;
            }
        })
    }
}