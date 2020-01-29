var roundScore, score, activePlayer, gamePlaying = true,
    PrevState = 0;
var val;
init();

document.querySelector('.btn-submit').addEventListener('click', function() {
    Getvalue();
    if (isNaN(val)) {
        console.log('Is not a  Number')
        alert('please enter valid number')
    } else {
        console.log('Is a Number')
        document.querySelector('.btn-roll').addEventListener('click', function() {
            if (gamePlaying) {
                var dice = Math.floor(Math.random() * 6) + 1;
                var diceDom = document.querySelector('.dice');
                diceDom.style.display = 'block';
                diceDom.src = 'dice-' + dice + '.png'
                document.getElementById('current-' + activePlayer).textContent = dice
                if (dice !== 1) {
                    roundScore += dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                    console.log('dice Prev state= ' + PrevState + ' And current dice status is ' + dice + ' Active Player is ' + activePlayer)
                    if (PrevState === 6 && dice === 6) {
                        alert('you have rolled dice with 6 twice')
                        changePlayer();
                    } else {
                        PrevState = dice;
                    }

                } else {
                    changePlayer();
                }
            }
        });

        document.querySelector('.btn-hold').addEventListener('click', function() {
            if (gamePlaying) {
                score[activePlayer] += roundScore;
                document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
                checkWinner();
                changePlayer();
            }
        });
        document.querySelector('.btn-new').addEventListener('click', init);
    }
})

function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

function checkWinner() {
    if (score[0] >= val && score[0] > score[1]) {
        document.querySelector('#score-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        gamePlaying = false;

    } else if (score[1] >= val && score[1] > score[0]) {
        document.querySelector('#score-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        gamePlaying = false;

    }
}

function init() {
    roundScore = 0;
    score = [0, 0];
    activePlayer = 0;
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    gamePlaying = true;
}

function Getvalue() {
    val = document.getElementById('EnterScore').value
    document.getElementById('EnterScore').required = true;
    console.log(val)
    return val;

}