function Card(cardData) {

    let card = Object.create(Card.prototype);
    
    card.suit = cardData.suit;
    
    card.face = cardData.face;

    card.valueOfCard = cardData.valueOfCard;

    return card;
}

Card.prototype.equals = function (otherCard) {
    return this.suit === otherCard.suit && this.face === otherCard.face
}

Card.prototype.compareTo = function (otherCard) {
    return this.valueOfCard - otherCard.valueOfCard;
}

function DeckOfCards() {

    let deckOfCards = Object.create(DeckOfCards.prototype);

    deckOfCards.currentIndex = -1;

    deckOfCards.cards = new Array();

    return deckOfCards;
}

DeckOfCards.prototype.addCards = function () {
    let cardsArray = arguments[0];

    for (var i = 0; i < cardsArray.length; i++) {
        if (cardsArray[i] instanceof Card) {
            this.cards.push(cardsArray[i]);
        }
    }
}

DeckOfCards.prototype.showNextCard = function (numberOfCards) {
    if (numberOfCards == null) {
        numberOfCards = 1;
    }

    if (this.cards.length > 0) {
        var index = this.currentIndex += numberOfCards;

        return this.cards[index];
    }
    else {
        return undefined;
    }
}

DeckOfCards.prototype.takeCurrentCard = function () {
    if (this.cards.length > 0) {
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }
        else if (this.currentIndex >= this.cards.length) {
            this.currentIndex = (this.cards.length - 1);
        }

        let currentCard = this.cards.splice(this.currentIndex, 1);

        return currentCard[0];
    }
    else {
        return undefined;
    }
}

DeckOfCards.prototype.shuffleDeck = function (numberOfShuffles) {
    var cloneOfCards = this.cards.slice(0);
    var numberOfTimes = (numberOfShuffles == null) ? 1 : numberOfShuffles;
    
    for (var n = 0; n < numberOfTimes; n++) {
        var j, x, i;

        for (i = cloneOfCards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = cloneOfCards[i];
            cloneOfCards[i] = cloneOfCards[j];
            cloneOfCards[j] = x;
        }
    }

    this.cards = cloneOfCards;
}
