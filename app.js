/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundScore, isPlaying, player1, player2;

init()

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (isPlaying) {
        var dice, diceDOM;
        // Get a number between 1-6
        dice = Math.floor(Math.random() * 6) + 1;

        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            // Add to roundScore
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player  
            nextPlayer();
        }
    } else {
        alert('The game has finished. Please start a new game.')
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isPlaying) {
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isPlaying = false;
        } else {
            nextPlayer();
        }
    } else {
        alert('The game has finished. Please start a new game.')
    }

});

document.querySelector('.btn-new').addEventListener('click', init);


document.querySelector('.btn-rules').addEventListener('click', function () {
    var rules;
    rules = "GAME RULES: \n- The game has 2 players, playing in rounds \n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score \n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn \n- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn \n- The first player to reach 100 points on GLOBAL score wins the game"

    alert(rules);
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    isPlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    player1 = prompt("Hey Player 1! What is your name?", "Player 1");
    player2 = prompt("Hey Player 2! What is your name?", "Player 2");


    document.getElementById('name-0').textContent = player1;
    document.getElementById('name-1').textContent = player2;

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}
