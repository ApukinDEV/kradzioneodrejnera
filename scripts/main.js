let firstNumber = 0;
let secondNumber = 0;
let solution = 0;
let equationType = '';
let equationText = '';
let points = [];
let currentLevel = 1;
let m = 1;
let s = 0;
let interval = null;
let isTimerRunning = false
// const timer = document.querySelector("#timer");
const sleep = ms => new Promise(r => setTimeout(r, ms));

function setDzialanie(level){
    if ((points[level-2] < 20 || points[level-2] === undefined) && level !== 1) {
        window.alert("Nie odblokowales tego poziomu!")

        return
    }
    if (level === 7) {
        if (!isTimerRunning) {
            x = document.getElementById("timer")
            x.style.display = 'block'
            interval = setInterval(startTimer, 1000);
            isTimerRunning = true;
        }
        level = Math.floor(Math.random()*6+1)
        currentLevel = 7;
    }
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
        secondNumber = Math.floor(Math.random()*10)+1;
        firstNumber = Math.floor(Math.random()*10)+1;
        if(Math.floor(Math.random()*2)===0){
            equationType='*';
            solution=firstNumber*secondNumber;
            equationText = firstNumber + ' * ' + secondNumber + ' = ?';
        }else{
            firstNumber = secondNumber * Math.floor((Math.random()*3)+1);
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
        equationText = firstNumber + ' ^ ' + secondNumber + ' = ?';

    }
    if (level === 5) {
        equationType = "√";
        firstNumber = Math.floor(Math.random()*10)+2;
        secondNumber = firstNumber*firstNumber;
        solution = firstNumber;
        equationText = '√ ' + secondNumber + ' = ?';
    }
    if (level === 6){
        setDzialanie(Math.floor(Math.random()*2)+1);
        equationText = 'X' + equationType + secondNumber + ' = ' + solution;
        equationType = "x";
        solution = firstNumber;
    }
    if (currentLevel !== 7) {

        currentLevel = level;
    }
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
    if (points[currentLevel-1] === undefined) {
        points[currentLevel - 1] = 1;
    } else {
        points[currentLevel -1]++;
    }
    console.log(points[currentLevel-1])
    setDzialanie(currentLevel)
    ans.style="animation-name:rightBob;"
    let audio = new Audio('resources/music/correct.mp3');
    audio.play();
    sleep(500).then(r => ans.style="animation-name:none;");
    if(points[0]>19){
        lvl2.innerHTML = 'lvl2';
    }else if(points[0]!==undefined){
        lvl2.innerHTML = points[0] + '/20';
    }
    if(points[1]>19){
        lvl3.innerHTML = 'lvl3';
    }else if(points[1]!==undefined){
        lvl3.innerHTML = points[1] + '/20';
    }
    if(points[2]>19){
        lvl4.innerHTML = 'lvl4';
    }else if(points[2]!==undefined){
        lvl4.innerHTML = points[2] + '/20';
    }
    if(points[3]>19){
        lvl5.innerHTML = 'lvl5';
    }else if(points[3]!==undefined){
        lvl5.innerHTML = points[3] + '/20';
    }
    if(points[4]>19){
        lvl6.innerHTML = 'lvl6';
    }else if(points[4]!==undefined){
        lvl6.innerHTML = points[4] + '/20';
    }
    if(points[5]>19) {

        lvl7.style = 'display:inline-block;';
    }
    if(points[
        6]>19){
        lvl7.innerHTML= "<img src=\'resources/images/wzium1.png\'></div>"
    }

}
function incorrect() {
    ans.style="animation-name:wrongShake;"
    let audio = new Audio('resources/music/incorrect.mp3');
    audio.play();
    sleep(500).then(r => ans.style="animation-name:none;");

}

function startTimer() {
    const timer = document.getElementById("timer")

    if (currentLevel !== 7) {
       clearInterval(interval);
       isTimerRunning = false;
        x = document.getElementById("timer")
        x.style.display = 'block'
    }
    if (s === 0) {
        timer.innerHTML = m.toString() + " : 00"
    }
    else {
        timer.innerHTML = m.toString() + " : " + s.toString();
    }
    s--;
    if (s < 0) {
        m--;
        s += 60;
    }
    if(m==0 && s<1){
        currentLevel = 6;
        points[6]=0;
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