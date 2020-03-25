/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentScore, scores, dice, activePlayer, gamePlaying, finalScore;

// scores = [0,0]; // to store the scores of both players
// currentScore = 0; // to store the score of the current player
// activePlayer = 0; // to see which player is currently active

init();

// random fucntion gives random number between 0 and 1
// by multiplying with 6 we get different numbers from 0 to 6
// ceil gives the ceiling value of the floating point number
// thus we will always get a random number between 1 and 6 inclusive of both

//document.querySelector("#current-"+activePlayer).textContent = dice; // this sets the current score of the player in thr current panel

// document.querySelector("#current-"+activePlayer).innerHTML = "<em>"+dice+"</em>"; 
// above method can also be used to give some html to the text



// document.querySelector(".btn-roll").addEventListener("click",btn);
// function btn()
// {
//     // something
// }

// another way of doing above thing by anonymous fucntion :
document.querySelector(".btn-roll").addEventListener("click",function(){
    if(gamePlaying)
    {
         //1. random number. 
        dice1 = Math.ceil(Math.random() * 6); 
        dice2 = Math.ceil(Math.random() * 6);     

        //2. display the result.
        var diceDOM1 = document.querySelector(".dice1");// getting the element by using the querySelector method 
        diceDOM1.style.display = "block"; // this will display the dice again
        diceDOM1.src = "dice-"+dice1+".png"; // this will display the dice image according to the number generated

        var diceDOM2 = document.querySelector(".dice2");// getting the element by using the querySelector method 
        diceDOM2.style.display = "block"; // this will display the dice again
        diceDOM2.src = "dice-"+dice2+".png"; // this will display the dice image according to the number generated

        //3. update the round score only if the score was not 1.
        if(dice1 != 1 && dice2 !=1)
        {
            currentScore += dice1 + dice2;
            document.querySelector('#current-'+activePlayer).textContent = currentScore;  
        }
        else
        {
            // next player
            nextPlayer();

            // we can also use toggle method as a different approach
            
            // document.querySelector('#current-0').textContent = '0';
            // document.querySelector('#current-1').textContent = '0';
            // document.querySelector(".player-0-panel").classList.toggle("active");
            // document.querySelector(".player-1-panel").classList.toggle("active");
        }
    }
});
document.querySelector(".btn-hold").addEventListener("click",function(){

   if(gamePlaying)
   {
        // adding current score to global score
        scores[activePlayer] += currentScore;
        document.querySelector("#score-"+activePlayer).textContent = scores[activePlayer];

        // deciding the winner
        finalScore = document.getElementById("final").value;
        if(scores[activePlayer] >= finalScore)
        {
            document.querySelector("#name-"+activePlayer).textContent = "Winner !";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            gamePlaying = false;
        }
        else
        {
            // changing active player
            nextPlayer();
        } 
   }
  
});

function nextPlayer()
{

    //making current score 0 before switching
    currentScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    if(activePlayer === 1)
         activePlayer = 0;
    else
        activePlayer = 1;

    // we can use toggle method to add and remove "active" class
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //another approach
    //document.querySelector(".player-0-panel").classList.remove("active");
    //document.querySelector(".player-1-panel").classList.add("active");

    // making dice invisible as the current player switched
    document.querySelector('.dice1').style.display = "none";
    document.querySelector('.dice2').style.display = "none";

}

// new game function
document.querySelector(".btn-new").addEventListener("click",init); // we have to provide only the name of the function thats why without parentheses

function init()
{

    gamePlaying = true;

    // making the current and global score 0
    currentScore = 0;
    scores = [0,0];
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // changing active player to player 1
    activePlayer = 0;

    // adding and removing classes to bring back to the default state
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active"); 

    // changing names incase new game is clicked after someone wins
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";

    //making dice invisible
    document.querySelector(".dice1").style.display = "none"; // this will not display the cube when we load the page
    document.querySelector(".dice2").style.display = "none"; // this will not display the cube when we load the page

}


