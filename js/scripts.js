
// create deck:
var suitsArr = ['diamonds', 'clubs', 'hearts', 'spades'];
var rankArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var deck = [];


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
    for (let i = 0; i < rankArr.length; i++){
        for (let j = 0; j < suitsArr.length; j++){
            let card = {rank: rankArr[i], suit: suitsArr[j], url: `images/${rankArr[i]}_of_${suitsArr[j]}`}
            for (let k = 0; k < n; k++){
                deck.push(card)
            }
        }
    }
    //shuffle deck after created
    shuffleArray(deck);
    return deck;
}


// create the deck depending on the pick and execute game start sequence
function start(pick,decksText){
    if (pick === "startButton1"){
        createDeck(suitsArr,rankArr,1);
        startSequence(decksText);
        //enable listener on game buttons
        mainListener();
    }
    else if (pick === "startButton2"){
        createDeck(suitsArr,rankArr,3);
        startSequence(decksText);
        //enable listener on game buttons
        mainListener();
    }
    else if (pick === "startButton3"){
        createDeck(suitsArr,rankArr,6);
        startSequence(decksText);
        //enable listener on game buttons
        mainListener();
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
    var bottomText = createText('div',`== playing with ${decksText} ==`,'bottom2');
    table.appendChild(bottomText);
    let dealerPoints = createText('p','21','dealerPoints');
    let dealerHas = createText('p','Dealer has:','dealerHas');
    dealerText.appendChild(dealerHas);
    dealerText.appendChild(dealerPoints);
    let playerPoints = createText('p','21','playerPoints');
    let youHave = createText('p','You have:','playerHas');
    playerText.appendChild(youHave);
    playerText.appendChild(playerPoints);
}

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

//listener for loading the game and first selections
messageText.addEventListener('click',function(e){
    let select = e.target.id;
    let decksText = e.target.innerText;
    console.log(select);
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
function mainListener(){
    mainButtons.addEventListener('click',function(e){
        let choice = e.target.id;
        if (choice === "buttonStand"){
            messageText.innerText = "You pressed stand";
        }
        else if (choice === "buttonHit"){
            messageText.innerText = "You pressed hit";
        }
        else if (choice === "buttonAgain"){
            messageText.innerText = "You pressed playAgain";
        }
    });
}













