function Card(suit, face, valueOfCard) {

    let card = Object.create(Card.prototype)
    
    card.suit = suit
    
    card.face = face

    card.valueOfCard = valueOfCard

    return card;
}

Card.prototype.equals = function (otherCard) {
    return this.suit === otherCard.suit && this.face === otherCard.face
}

Card.prototype.compareTo = function (otherCard) {
    return this.valueOfCard - otherCard.valueOfCard;
}

function DeckOfCards() {

    let deckOfCards = Object.create(DeckOfCards.prototype)

    deckOfCards.currentIndex = 0;

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

DeckOfCards.prototype.nextCard = function () {
    if (this.cards.length > 0) {
        return this.cards[this.currentIndex++];
    }
    else {
        return undefined;
    }
}
