const holes = document.querySelectorAll('.hole'),
    moles = document.querySelectorAll('.mole'),
    startGameBtn = document.querySelector('.start-game'),
    mainMenuBtn = document.querySelector('.main-menu');
let inProgress = false,
    score = document.querySelector('.score'),
    timer = document.querySelector('.time'),
    countSeconds, gameTime, kicks, minInt, maxInt;

if(window.location.search === '?level-easy'){
    gameTime = 30;
    minInt = 800;
    maxInt = 1000;
} else if(window.location.search === '?level-medium'){
    gameTime = 45;
    minInt = 400;
    maxInt = 800;
} else {
    gameTime = 60;
    minInt = 400;
    maxInt = 800;
    holes.forEach((hole) => {
        if(hole.classList.contains('hard')){
            hole.classList.toggle('hard');
        }
        hole.style.height = '175px';
        hole.classList.toggle('fit');
    })
}
timer.textContent = '00:' + gameTime;

mainMenuBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
});
startGameBtn.addEventListener('click', startGame);
moles.forEach((mole) => {
    mole.addEventListener('click', kick)
});

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
    const id = Math.floor(Math.random() * holes.length);
    const hole = holes[id];
    return hole;
}
function showMole() {
    const time = randomTime(minInt, maxInt);
    const hole = randomHole(holes);
    const delay = randomTime(100, 1000);
    hole.childNodes[1].classList.remove('dead-mole');
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(inProgress){
            setTimeout(() => {
                showMole()
            }, delay)
        }
    }, time)
}
function startGame() {
    if(inProgress) return;
    inProgress = true;
    showMole();
    score.textContent = 0;
    //countSeconds = gameTime;
    startTracking();
    kicks = 0;
    setTimeout(() => {
        inProgress = false
    }, gameTime*1000)
}
function kick(e) {
    if(!e.isTrusted || this.classList.contains('dead-mole')) return;
    this.classList.add('dead-mole');
    this.parentNode.classList.remove('up');
    kicks++;
    score.textContent = kicks;
}
function startTracking() {
    countSeconds = gameTime;
    updateTimer();
}
function updateTimer() {
    timer.textContent = '00:' + (countSeconds > 9 ? countSeconds : '0' + countSeconds);
    setTimeout(() => {
        if(countSeconds === 0) return timer.textContent = "is up!";
        countSeconds --;
        timer.textContent = '00:' + (countSeconds > 9 ? countSeconds : '0' + countSeconds);
        updateTimer()
    }, 1000);
}