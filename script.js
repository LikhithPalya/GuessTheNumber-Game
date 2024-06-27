// we are using let because we have to reset the value as well later on to start a new game  
let randomNumber = (parseInt(Math.random()*100+1));
// generates random numbers, the "+1" is to skip the output of 1

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot  = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.lowOrHi')

const p= document.createElement('p')

let prevGuess = []
let numGuess = 1

let playgame = true;

// to check if you are available to play the game
if(playgame){
    submit.addEventListener('click', (e)=>{
        e.preventDefault(); 
        // to prevent lose of data
        const guess = parseInt(userInput.value)
        console.log(guess);
        validateGuess(guess);

    });
}

function validateGuess(guess){
    // to check if the input is a number or a non number
     if(isNaN(guess)){
        alert('Please enter a valid number');
     }else if(guess<1){
        alert('Please enter a number greate than 1');
     }else if(guess>100){
        alert('Please enter a number less than 100');
     }else{
        prevGuess.push(guess);

        if(numGuess==11){
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
     }
}

function checkGuess(guess){
    // to check if the no is equal to random number or tell if its higher or lower than the random number

    if(guess == randomNumber){
        displayMessage(`You guessed it right!! ${guess} is the right answer!
        The number of tries you took is ${remaining.innerHTML = `${11-numGuess}`-11}`);
        endGame();
    }else if(guess<randomNumber){
            displayMessage(`Number is too low`)
    }else if(guess> randomNumber){
            displayMessage(`Number is too high`);
    }
   

}

function displayGuess(guess){
    // to update the remaining guesses or even to indicate the number of gusses left

    userInput.value='';
     guessSlot.innerHTML += `${guess} `;
     numGuess++;
     remaining.innerHTML = `${11-numGuess}`;
}

function displayMessage(message){
    // interacts with the dom
    lowOrHi.innerHTML = `<h2> ${message}</h2>`
}


function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button')
    p.innerHTML = `<button id="newGame" >Start New Game</button>`
    startOver.appendChild(p)
    playgame = false;
    newGame();
}

function newGame(){
    // to start a new game
    const newGameBtn = document.querySelector('#newGame');
    newGameBtn.addEventListener('click', (e)=>{
        randomNumber = (parseInt(Math.random()*100+1));
        prevGuess = [];
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11-numGuess}`;

        userInput.removeAttribute('disables', '')
        startOver.removeChild(p);

        playgame = true;
    })
}