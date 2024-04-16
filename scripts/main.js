let firstNumber = 0;
let secondNumber = 0;
let solution = 0;
let equationType = '';
let equationText = '';
let points = [0];
let currentLevel = 1;
let m = 1;
let s = 1;
const timer = document.querySelector("#timer");
const sleep = ms => new Promise(r => setTimeout(r, ms));
setInterval(startTimer, 1000);
function setDzialanie(level){
    selected =document.getElementById('lvl' + currentLevel);
    selected.style = 'filter:invert(100)';
    if(level === 1){
        firstNumber = Math.floor(Math.random()*100)+1;
        secondNumber = Math.floor(Math.random()*100)+1;
        if(Math.floor(Math.random()*2)===0){
            equationType='+';
            solution=firstNumber+secondNumber;
            equationText = firstNumber + ' + ' + secondNumber + ' = ?';
        }else{
            equationType='-';
            solution=firstNumber-secondNumber;
            equationText = firstNumber + ' - ' + secondNumber + ' = ?';
        }
    }
    if(level === 2){
        firstNumber = Math.floor(Math.random()*20)+1;
        secondNumber = Math.floor(Math.random()*10)+1;
        if(Math.floor(Math.random()*2)===0){
            equationType='*';
            solution=firstNumber/secondNumber;
            equationText = firstNumber + ' * ' + secondNumber + ' = ?';
        }else{
            equationType='/';
            solution=firstNumber/secondNumber;
            equationText = firstNumber + ' / ' + secondNumber + ' = ?';
        }
    }
    if(level === 3){
        setDzialanie(Math.floor(Math.random()*2)+1);
    }
    if (level === 4) {
        equationType = "^";
        firstNumber = Math.floor(Math.random()*10)+1
        secondNumber = Math.floor(Math.random()*2)+2
        solution = Math.pow(firstNumber, secondNumber)
        equationText = firstNumber + ' do potegi ' + secondNumber + ' = ?';

    }
    if (level === 5) {
        equationType = "√";
        firstNumber = Math.floor(Math.random()*10)+2;
        secondNumber = firstNumber*firstNumber;
        solution = firstNumber;
        equationText = 'Pierwiastek z ' + secondNumber + ' = ?';
    }
    if (level === 6){
        setDzialanie(Math.floor(Math.random()*2)+1);
        equationText = 'X' + equationType + secondNumber + ' = ' + solution;
        equationType = "x";
        solution = firstNumber;
    }
    currentLevel = level;
    equation.innerHTML = equationText;
}

function checkCorrect() {
    if(parseInt(ans.value) === solution){
        correct();
    }else{
        incorrect();
    }
}
function correct() {
    ans.value = '';
    points[currentLevel]++;
    setDzialanie(currentLevel)
    ans.style="animation-name:rightBob;"
    let audio = new Audio('resources/music/correct.mp3');
    audio.play();
    sleep(500).then(r => ans.style="animation-name:none;");

}
function incorrect() {
    ans.style="animation-name:wrongShake;"
    let audio = new Audio('resources/music/incorrect.mp3');
    audio.play();
    sleep(500).then(r => ans.style="animation-name:none;");

}

function startTimer() {
    if (s === 0) {
        timer.innerHTML = m.toString() + " : 00"
    }
    else {
        timer.innerHTML = m.toString() + " : " + s.toString();
    }
    s--;
    if (s < 0) {
        m--;
        s+=60;
    }
}

document.addEventListener("keydown", (e) => {
    let input = document.querySelector("#ans");
    const cyfry = new Set('-1.234567890');
    for (let letter of cyfry) {
        if (e.key === letter && input.value.length < 4) {
            input.value += e.key;
            input.value.toString();
        }
    }
    if (e.key === "Backspace") {
        input.value = input.value.slice(0, -1);
    }
    if (e.key === "Enter"){
        checkCorrect();
    }
});