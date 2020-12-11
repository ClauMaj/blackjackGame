
// create deck:
var suitsArr = ['diamonds', 'clubs', 'hearts', 'spades'];
var rankArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; 
var deck = [];


//select elements
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
var playerPoints;  // node
var dealerPoints;  // node
var bottomText;  // node
var sizeOfDeck = 0;
var dealerTotal = 0;
var playerTotal = 0;
var dealerNrOfAces = 0;
var playerNrOfAces = 0;
var dealerAces = false;
var playerAces = false;
var blackJackConfirm = false;
var cardCalcReturn = [];

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


// shuffle function
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//crete deck function(n=nr of decks)+ shuffle 
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
    return deck;
}


// create the deck depending on nr of decks picked and execute game start sequence
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

//at start remove a few elements and create new ones
function startSequence(decksText){
    logo.remove();
    welcome.remove();
    startButton1.remove();
    startButton2.remove();
    startButton3.remove();
    messageText.innerText = "Good Luck!";
    bottomText = createText('div',`== playing with ${decksText} ==`,'bottom2');
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
    enableStand();
    enableHit();
    enableAgain();
    for (let b=0;b<2;b++){
        drawPlayerCard();
        drawDealerCard();
    }
}

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
            nrOfAces -=1; //problem here with returning this
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
    if (playerTotal > 21){
        messageText.innerText = "Ouch!";
        while (dealerTotal < 17){
            drawDealerCard();
        }
        disableHit();
        disableStand();
    }
}

function drawDealerCard(){
    if(deck.length < 1){
        createDeck(suitsArr,rankArr,sizeOfDeck);
        messageText.innerText = "A new deck has been created!";
    }
    let dDrawn = deck.pop();
    dealerCards.innerHTML += `<img class="cardImg" src="${dDrawn.url}" alt="">`;
    cardCalcReturn = cardCalc(dDrawn.value,dealerTotal,dealerPoints,dealerNrOfAces,dealerAces);
    dealerTotal = cardCalcReturn[0];
    dealerNrOfAces = cardCalcReturn[1];
    dealerAces = cardCalcReturn[2];
    cardCalcReturn = [];
    if (dealerTotal === 21){
        dealerPoints.innerText = dealerTotal;
        messageText.innerText = "Dealer has Blackjack";
    }
}

function compareStand(){
    if (dealerTotal <=21){
        if (playerTotal < dealerTotal){
            dealerPoints.innerText = dealerTotal; 
            topText.innerText = "Dealer wins!";
        }
        else if (dealerTotal < playerTotal){
            messageText.innerText = "Congratulations!!!";
            topText.innerText = "You win!";
        }
        else if (dealerTotal === playerTotal){
            dealerPoints.innerText = dealerTotal; 
            messageText.innerText = "Draw!!!";
            topText.innerText = "Draw!";
        }
    }
    if (dealerTotal > 21){
        messageText.innerText = "Congratulations!!!";
        topText.innerText = "You win!";
    }
}

function compareHit(){
    if (playerTotal>21) {
        disableHit();
        disableStand();
        while (dealerTotal < 17){
            drawDealerCard();
            }
        dealerPoints.innerText = dealerTotal;
        topText.innerText = "Dealer wins!";    
        enableAgain();
    }
}

//listener for loading the game and first selections
messageText.addEventListener('click',function(e){
    let select = e.target.id;
    let decksText = e.target.innerText;
    console.log(e);
    // select deck and start the game
    start(select,decksText);
    console.log(deck);
});

//restart the entire game (reload page)
restart.addEventListener('click',function(e){
    if (e.target.id === 'buttonRestart'){
    location.reload();
    }
});
//main listener for stand, hit and playAgain buttons
mainButtons.addEventListener('click',function(e){
    console.log(e);
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
        enableAgain();
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

function again(){
    dealerTotal = 0;
    playerTotal = 0;
    dealerNrOfAces = 0;
    playerNrOfAces = 0;
    dealerAces = false;
    playerAces = false;
    blackJackConfirm = false;
    cardCalcReturn = [];
    messageText.innerText = "Good Luck!";
    topText.innerText = "";
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    for (let a=0;a<2;a++){
        drawPlayerCard();
        drawDealerCard();
    }
    enableStand();
    enableHit();
}




