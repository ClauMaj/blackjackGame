
// create deck:
var suitsArr = ['diamonds', 'clubs', 'hearts', 'spades'];
var rankArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var deck = []; // stores the deck after created


//select elements from DOM
var table = document.querySelector('#tableDiv');
var logo = document.querySelector('#logo');
var welcome = document.querySelector('#welcome');
var startButton1 = document.querySelector('#startButton1');
var startButton2 = document.querySelector('#startButton2');
var startButton3 = document.querySelector('#startButton3');
var messageText = document.querySelector('#messageText');
var dealerText = document.querySelector('#dealerText');
var playerText = document.querySelector('#playerText');
var playerCards = document.querySelector('#playerCards');
var dealerCards = document.querySelector('#dealerCards');
var mainButtons = document.querySelector('#buttons');
var restart = document.querySelector('#bottom1');
var buttonStand = document.querySelector('#buttonStand');
var buttonHit = document.querySelector('#buttonHit');
var buttonAgain = document.querySelector('#buttonAgain');
var topText = document.querySelector('#topText');
var playerCreditsElement = document.querySelector('#playerCreditsElement');
var dealerCreditsElement = document.querySelector('#dealerCreditsElement');
var playerWinsElement = document.querySelector('#playerWinsElement');
var dealerWinsElement = document.querySelector('#dealerWinsElement');

//assign initial values for tracking variables and ON/OFF switches
var playerPoints;  // node
var dealerPoints;  // node
var bottomText;  // node
var sizeOfDeck = 0; // remember nr.of decks for case when all cards are used
var dealerTotal = 0;
var playerTotal = 0;
var dealerNrOfAces = 0;
var playerNrOfAces = 0;
var dealerAces = false;
var playerAces = false;
var blackJackConfirm = false;
var flipIt = false;
var cardCalcReturn = [];
var playerCredits = 1000;
var dealerCredits = 1000;
var playerNrOfWins = 0;
var dealerNrOfWins = 0;
var backOfCardValue = 0;
var backOfCardUrl = '';


// enable\disable functions for main buttons
// add/remove enable\disable styles
function disableStand(){
    buttonStand.disabled = true;
    buttonStand.innerHTML = `<p>Stand</p> <img style='margin-left:10px;' height = 30%; width=auto; src='images/not.png'>`;
};
function enableStand(){
    buttonStand.disabled = false;
    buttonStand.innerHTML = '';
    buttonStand.innerText = 'Stand';
};
function disableHit(){
    buttonHit.disabled = true;
    buttonHit.innerHTML = `<p>Hit</p> <img style='margin-left:10px;' height = 30%; width=auto; src='images/not.png'>`
};
function enableHit(){
    buttonHit.disabled = false;
    buttonHit.innerHTML = '';
    buttonHit.innerText = 'Hit';
};
function disableAgain(){
    buttonAgain.disabled = true;
    buttonAgain.innerHTML = `<p>Again</p> <img style='margin-left:10px;' height = 30%; width=auto; src='images/not.png'>`
};
function enableAgain(){
    buttonAgain.disabled = false;
    buttonAgain.innerHTML = '';
    buttonAgain.innerText = 'Play again';
};
disableStand();
disableHit();
disableAgain();


// shuffle deck function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//createDeck => cretes a deck(n=nr of decks) + shuffle
//each card is an object that is placed in the deck array
//each card will be create n times(based on player selection for nr. of decks) 
function createDeck(suitsArr,rankArr,n){
    deck = [];
    let card = '';
    for (let i = 0; i < rankArr.length; i++){
        for (let j = 0; j < suitsArr.length; j++){
            if (rankArr[i] >=2 && rankArr[i] <= 10){
                card = {value: rankArr[i], rank: rankArr[i], suit: suitsArr[j], url: `images/${rankArr[i]}_of_${suitsArr[j]}.png`}
            }
            else if (rankArr[i] === 1) {
                card = {value: 11, rank: rankArr[i], suit: suitsArr[j], url: `images/${rankArr[i]}_of_${suitsArr[j]}.png`}
            }
            else if (rankArr[i] > 10) {
                card = {value: 10, rank: rankArr[i], suit: suitsArr[j], url: `images/${rankArr[i]}_of_${suitsArr[j]}.png`}
            }
            for (let k = 0; k < n; k++){
                deck.push(card);
            }
        }
    }
    //shuffle deck after created
    shuffleArray(deck);
}


// create the deck depending on nr of decks picked and call game start sequence
function start(pick,decksText){
    if (pick === "startButton1"){
        sizeOfDeck = 1;
        createDeck(suitsArr,rankArr,sizeOfDeck);
        startSequence(decksText);
    }
    else if (pick === "startButton2"){
        sizeOfDeck = 3;
        createDeck(suitsArr,rankArr,sizeOfDeck);
        startSequence(decksText);
    }
    else if (pick === "startButton3"){
        sizeOfDeck = 6;
        createDeck(suitsArr,rankArr,sizeOfDeck);
        startSequence(decksText);
    }
}
// function to create container with text and ID
function createText(name,text,idName) {
    let cont = document.createElement(name);
    cont.textContent = text;
    cont.setAttribute('id', idName);
    return cont;
}

//startSequence => remove the presentation elements and create new ones
//enable play buttons and draw 2 cards for player and dealer
// this fnct is called after player selects the nr. of decks
function startSequence(decksText){
    welcome.remove();
    startButton1.remove();
    startButton2.remove();
    startButton3.remove();
    dealerCards.innerHTML = '';
    messageText.innerText = "Good Luck!";
    bottomText = createText('div',`playing with ${decksText} of cards`,'bottom2');
    table.appendChild(bottomText);
    dealerPoints = createText('p','','dealerPoints');
    let dealerHas = createText('p','Dealer has:','dealerHas');
    dealerText.appendChild(dealerHas);
    dealerText.appendChild(dealerPoints);
    playerPoints = createText('p','','playerPoints');
    let youHave = createText('p','You have:','playerHas');
    playerText.appendChild(youHave);
    playerText.appendChild(playerPoints);
    playerCards.innerHTML = '';
    playerCreditsElement.innerText = playerCredits;
    dealerCreditsElement.innerText = dealerCredits;
    playerWinsElement.innerText = playerNrOfWins;
    dealerWinsElement.innerText = dealerNrOfWins;
    enableStand();
    enableHit();
    enableAgain();
    drawPlayerCard();
    drawDealerCard();
    drawPlayerCard();
    createFlipedCard();
    flipIt = true;
}


//cardCalc => calculates the new Total after player/dealer draws a card
//  aces can be either 1 or 11 depending on case total <,=,>  21
//  for dealer and player - if the ace(11) goes over 21 it will transform to ace(1)
//  for dealer - if the ace(11) add up to >= 17 but <= 21 it will count as 11
//  nrOfAces keeps track of the aces(11) in the deck that have not been transformed to ace(1)
//  if aces = true - means there was an ace drawn at some point and this affects points display and future calc in corelation with nrOfAces
//returns the new Total, nrOfAces and aces to keep track of the variables
// this fnct is called from drawPlayerCard() and drawDealerCard().
function cardCalc(value,total,element,nrOfAces,aces){
    if (value === 11) {
        nrOfAces +=1;
    }
    if (value != 11 && aces === false){
        total += value;
        element.innerText = total;
    }
    else if (value != 11 && aces === true){
        if ((total+value) <= 21){
            total += value;
            if (nrOfAces > 0){
                element.innerText = `${total-10} / ${total}`;
            }
            else {
                element.innerText = total;
            }
        }
        else if((total+value) > 21){
            if (nrOfAces > 0){
                total += value-10;
                nrOfAces -=1;
                if (nrOfAces > 0){
                element.innerText = `${total-10} / ${total}`;
                }
                else {
                    element.innerText = total;
                }
            }
            else {
                total += value;
                element.innerText = total;
            }
        }
    }
    else if (value === 11){
        aces = true;
        if ((total+value) <=21) {
            total +=value;
            element.innerText = `${total-10} / ${total}`;
        }
        else if ((total+value) > 21){
            total += value-10;
            nrOfAces -=1;
            if (nrOfAces > 0){
                element.innerText = `${total-10} / ${total}`;
                }
            else {
                element.innerText = total;
            }
        }
    }
    cardCalcReturn.push(total);
    cardCalcReturn.push(nrOfAces);
    cardCalcReturn.push(aces);
    return cardCalcReturn;
}


//drawPlayerCard => pulls a card from the deck and displays it on the screen
// call cardCalc function to process the value drawn
// this fnct is called when player presses the Hit button and  during the startSequence()
function drawPlayerCard(){
    if(deck.length < 1){
        createDeck(suitsArr,rankArr,sizeOfDeck);
        messageText.innerText = "A new deck has been created!";
    }
    let drawn = deck.pop();
    playerCards.innerHTML += `<img class="cardImg" src="${drawn.url}" alt="">`;
    cardCalcReturn = cardCalc(drawn.value,playerTotal,playerPoints,playerNrOfAces,playerAces);
    playerTotal = cardCalcReturn[0];
    playerNrOfAces = cardCalcReturn[1];
    playerAces = cardCalcReturn[2];
    cardCalcReturn = [];
    if (playerTotal === 21){
        playerPoints.innerText = playerTotal;
        messageText.innerText = "Blackjack";
    }
}


//drawDealerCard => pulls a card from the deck and displays it on the screen
//call cardCalc function to process the value drawn
//this fnct is called when player presses the Stand button, when playerPoints > 21 and during the start sequence
function drawDealerCard(){
    if(deck.length < 1){
        createDeck(suitsArr,rankArr,sizeOfDeck);
        messageText.innerText = "A new deck has been created!";
    }
    if (flipIt === true){
        flipCard()
        dealerCards.innerHTML += `<img class="cardImg" src="${backOfCardUrl}" alt="">`;
        cardCalcReturn = cardCalc(backOfCardValue,dealerTotal,dealerPoints,dealerNrOfAces,dealerAces);
        flipIt = false;
    }
    else {
        let dDrawn = deck.pop();
        dealerCards.innerHTML += `<img class="cardImg" src="${dDrawn.url}" alt="">`;
        cardCalcReturn = cardCalc(dDrawn.value,dealerTotal,dealerPoints,dealerNrOfAces,dealerAces);
    }
    dealerTotal = cardCalcReturn[0];
    dealerNrOfAces = cardCalcReturn[1];
    dealerAces = cardCalcReturn[2];
    cardCalcReturn = [];
    if (dealerTotal === 21){
        dealerPoints.innerText = dealerTotal;
        messageText.innerText = "Dealer has Blackjack";
    }
}

//function to create a fliped card:
//  draw a card from the deck
// store the atributes of the card
// show the backOfCard image instead of the real URL
function createFlipedCard(){
    if(deck.length < 1){
        createDeck(suitsArr,rankArr,sizeOfDeck);
        messageText.innerText = "A new deck has been created!";
    }
    let flipDrawn = deck.pop();
    backOfCardValue = flipDrawn.value;
    backOfCardUrl = flipDrawn.url;
    dealerCards.innerHTML += `<img class="cardImg" src="images/back.png" alt="">`;
}

// remove the back of card img from the screen
// when dealer's turn to draw
function flipCard(){
    let toRemove = dealerCards.childNodes[1];
    toRemove.parentNode.removeChild(toRemove);
}

// compareStand => compares scores when player hits Stand button, after the dealer has finished drawin cards too
// this fnct is called when player hits Stand button
function compareStand(){
    if (dealerTotal <=21){
        if (playerTotal < dealerTotal){
            dealerPoints.innerText = dealerTotal; 
            topText.innerText = "Dealer wins!";
            dealerWins();
        }
        else if (dealerTotal < playerTotal){
            dealerPoints.innerText = dealerTotal;
            messageText.innerText = "Congratulations!!!";
            topText.innerText = "You win!";
            playerWins()
            if (playerTotal === 21) {
                playerNrOfWins -= 1; // used to avoid addin 2 wins when player has blackjack
                playerWins();
            };
        }
        else if (dealerTotal === playerTotal){
            dealerPoints.innerText = dealerTotal; 
            messageText.innerText = "Draw!!!";
            topText.innerText = "Draw!";
            enableAgain();
        }
    }
    if (dealerTotal > 21){
        messageText.innerText = "Congratulations!!!";
        topText.innerText = "You win!";
        playerWins();
        if (playerTotal === 21) {
            playerNrOfWins -= 1; // used to avoid addin 2 wins when player has blackjack
            playerWins();
        };
    }
}
// compareHit => function triggers when playerPoints > 21 
// if playerPoints > 21 dealer wins regardless of his points.
// (blackjack rule) - if the player > 21 and daeler > 21 => dealer wins
// calls drawDealerCard() so dealer round executes even if player lost already
function compareHit(){
    if (playerTotal>21) {
        messageText.innerText = "Ouch!";
        disableHit();
        disableStand();
        while (dealerTotal < 17){
            drawDealerCard();
            }
        dealerPoints.innerText = dealerTotal;
        topText.innerText = "Dealer wins!";
        dealerWins();    
        enableAgain();
    }
}

// again => is a new game sequence
//check if enough credits <=> for case when play again was hit before the end of previous round
// reset tracking variables
// reset the screen
// draw 2 cards for player and dealer
function again(){
    if (checkCredits() === true){
        return;
    }
    if (topText.innerText === ""){
        dealerWins();
    }
    dealerTotal = 0;
    playerTotal = 0;
    dealerNrOfAces = 0;
    playerNrOfAces = 0;
    backOfCardValue = 0;
    backOfCardUrl = 0;
    dealerAces = false;
    playerAces = false;
    blackJackConfirm = false;
    flipIt = false;
    cardCalcReturn = [];
    messageText.innerText = "Good Luck!";
    topText.innerText = "";
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    drawPlayerCard();
    drawDealerCard();
    drawPlayerCard();
    createFlipedCard();
    flipIt = true;
    enableStand();
    enableHit();
}

//fncts to add/substract points depending on the winner
//called in the compare functions
function playerWins(){
    playerCredits += 30;
    dealerCredits -= 30;
    playerCreditsElement.innerText = playerCredits;
    dealerCreditsElement.innerText = dealerCredits;
    playerNrOfWins += 1;
    playerWinsElement.innerText = playerNrOfWins;
    enableAgain(); // default - enable again button
    checkCredits(); //check if players have enough credits => disable again if not
}
function dealerWins(){
    dealerCredits += 30;
    playerCredits -= 30;
    playerCreditsElement.innerText = playerCredits;
    dealerCreditsElement.innerText = dealerCredits;
    dealerNrOfWins += 1;
    dealerWinsElement.innerText = dealerNrOfWins;
    enableAgain(); // default - enable again button
    checkCredits(); //check if enough credits and disable again if not
}

// checks if both players have enough credits for a new round
// called after winner is declared and points processed
function checkCredits(){
    if (playerCredits < 60) {
        messageText.innerText = "Not enough credit :( ...Restart the game!";
        disableAgain();
        disableHit();
        disableStand();
        return true;
    }
    else if (dealerCredits < 60){
        messageText.innerText = "Congratulations!!! ...Dealer not enough credits!Restart the game!";
        disableAgain();
        disableHit();
        disableStand();
        return true;
    }
}

//listener for loading the game and first selections
messageText.addEventListener('click',function(e){
    let select = e.target.id;
    let decksText = e.target.innerText;
    // select deck and start the game
    start(select,decksText);
    messageText.removeEventListener('click', arguments.callee);
});

//restart the entire game (reload page)
restart.addEventListener('click',function(e){
    if (e.target.id === 'buttonRestart'){
    location.reload();
    }
});

console.time(start);
console.timeEnd(start);

//main listener for stand, hit and playAgain buttons
// if Stand is pressed call drawDealerCard() untill dealer >=17
// if Hit is pressed check if the score is 21 and ask for confirmation then drawPlayerCard()
// if Play again is pressed => again() is called and a new game begins
mainButtons.addEventListener('click',function(e){
    let choice = e.target.id;
    if (choice === "buttonStand"){
        playerPoints.innerText = playerTotal;
        disableHit();
        disableStand();
        disableAgain();
        while (dealerTotal < 17){
        drawDealerCard();
        }
        compareStand();
    }
    else if (choice === "buttonHit"){
        if (playerTotal === 21 && blackJackConfirm ===false){
            messageText.innerText = "Blackjack! Are you sure you want to draw another card?";
            blackJackConfirm = true;
        }
        else {
            drawPlayerCard();
        }
        compareHit();
    }
    else if (choice === "buttonAgain"){
        again();
    }
});







