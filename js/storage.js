function drawPlayerCard(){
    let drawn = deck.pop();
    playerCards.innerHTML += `<img class="cardImg" src="${drawn.url}" alt="">`
    if (drawn.value === 11) {
        nrOfAces +=1;
    }
    if (drawn.value != 11 && aces === false){
        playerTotal += drawn.value;
        playerPoints.innerText = playerTotal;
    }
    else if (drawn.value != 11 && aces === true){
        if ((playerTotal+drawn.value) <= 21){
            playerTotal += drawn.value;
            if (nrOfAces > 0){
                playerPoints.innerText = `${playerTotal-10} / ${playerTotal}`;
            }
            else {
                playerPoints.innerText = playerTotal;
            }
        }
        else if((playerTotal+drawn.value) > 21){
            if (nrOfAces > 0){
                playerTotal += drawn.value-10;
                nrOfAces -=1;
                if (nrOfAces > 0){
                playerPoints.innerText = `${playerTotal-10} / ${playerTotal}`;
                }
                else {
                    playerPoints.innerText = playerTotal;
                }
            }
            else {
                playerTotal += drawn.value;
                playerPoints.innerText = playerTotal;
            }
        }
    }
    else if (drawn.value === 11){
        aces = true;
        if ((playerTotal+drawn.value) <=21) {
            playerTotal +=drawn.value;
            playerPoints.innerText = `${playerTotal-10} / ${playerTotal}`;
        }
        else if ((playerTotal+drawn.value) > 21){
            playerTotal += drawn.value-10;
            nrOfAces -=1;
            if (nrOfAces > 0){
                playerPoints.innerText = `${playerTotal-10} / ${playerTotal}`;
                }
            else {
                playerPoints.innerText = playerTotal;
            }
        }
    }
    if (playerTotal === 21){
        playerPoints.innerText = playerTotal;
        messageText.innerText = "Blackjack";
    }
    if (playerTotal > 21){
        messageText.innerText = "Dealer wins!";
        disableHit();
        disableStand();
    }
}