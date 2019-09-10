function Card(suit, face) {

    let card = Object.create(Card.prototype)
    
    card.suit = suit
    
    card.face = face

    return card;
}

Card.prototype.equals = function (otherCard) {
    return this.suit === otherCard.suit && this.face === otherCard.face
}

function DeckOfCards() {

    let deckOfCards = Object.create(DeckOfCards.prototype)

    deckOfCards.cards = [
        new Card("spades", "A"),
        new Card("spades", "2"),
        new Card("spades", "3")
    ]

    return deckOfCards;
}

var hiddenCanvas = document.getElementById("canvas0");

hiddenCanvas.width = 640;
hiddenCanvas.height = 480;
