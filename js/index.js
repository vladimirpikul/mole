const levels = document.querySelectorAll('.level');
const playBtn = document.querySelector('.play-btn');

levels.forEach((level) => {
    level.checked = false;
});

playBtn.addEventListener('click', loadGame);

function loadGame(e) {
    e.preventDefault();
    for(let i =0; i<levels.length; i++){
        if(levels[i].checked){
            window.location.href = `game.html?${levels[i].id}`;
            return
        }
    }
    alert('Please, choose level first...');
}