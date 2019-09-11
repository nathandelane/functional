function Data() { }

Data.getBackgroundImagePath = () => {
    return "./solitaire-board_640x480.png";
}

Data.getDefaultDeckOfCards = () => {
    return [
        { "suit": "Spades", "face": "A", "valueOfCard": 1 },
        { "suit": "Spades", "face": "2", "valueOfCard": 2 },
        { "suit": "Spades", "face": "3", "valueOfCard": 3 },
        { "suit": "Spades", "face": "4", "valueOfCard": 4 },
        { "suit": "Spades", "face": "5", "valueOfCard": 5 },
        { "suit": "Spades", "face": "6", "valueOfCard": 6 },
        { "suit": "Spades", "face": "7", "valueOfCard": 7 },
        { "suit": "Spades", "face": "8", "valueOfCard": 8 },
        { "suit": "Spades", "face": "9", "valueOfCard": 9 },
        { "suit": "Spades", "face": "10", "valueOfCard": 10 },
        { "suit": "Spades", "face": "J", "valueOfCard": 11 },
        { "suit": "Spades", "face": "Q", "valueOfCard": 12 },
        { "suit": "Spades", "face": "K", "valueOfCard": 13 },
        { "suit": "Clubs", "face": "A", "valueOfCard": 1 },
        { "suit": "Clubs", "face": "2", "valueOfCard": 2 },
        { "suit": "Clubs", "face": "3", "valueOfCard": 3 },
        { "suit": "Clubs", "face": "4", "valueOfCard": 4 },
        { "suit": "Clubs", "face": "5", "valueOfCard": 5 },
        { "suit": "Clubs", "face": "6", "valueOfCard": 6 },
        { "suit": "Clubs", "face": "7", "valueOfCard": 7 },
        { "suit": "Clubs", "face": "8", "valueOfCard": 8 },
        { "suit": "Clubs", "face": "9", "valueOfCard": 9 },
        { "suit": "Clubs", "face": "10", "valueOfCard": 10 },
        { "suit": "Clubs", "face": "J", "valueOfCard": 11 },
        { "suit": "Clubs", "face": "Q", "valueOfCard": 12 },
        { "suit": "Clubs", "face": "K", "valueOfCard": 13 },
        { "suit": "Hearts", "face": "A", "valueOfCard": 1 },
        { "suit": "Hearts", "face": "2", "valueOfCard": 2 },
        { "suit": "Hearts", "face": "3", "valueOfCard": 3 },
        { "suit": "Hearts", "face": "4", "valueOfCard": 4 },
        { "suit": "Hearts", "face": "5", "valueOfCard": 5 },
        { "suit": "Hearts", "face": "6", "valueOfCard": 6 },
        { "suit": "Hearts", "face": "7", "valueOfCard": 7 },
        { "suit": "Hearts", "face": "8", "valueOfCard": 8 },
        { "suit": "Hearts", "face": "9", "valueOfCard": 9 },
        { "suit": "Hearts", "face": "10", "valueOfCard": 10 },
        { "suit": "Hearts", "face": "J", "valueOfCard": 11 },
        { "suit": "Hearts", "face": "Q", "valueOfCard": 12 },
        { "suit": "Hearts", "face": "K", "valueOfCard": 13 },
        { "suit": "Diamonds", "face": "A", "valueOfCard": 1 },
        { "suit": "Diamonds", "face": "2", "valueOfCard": 2 },
        { "suit": "Diamonds", "face": "3", "valueOfCard": 3 },
        { "suit": "Diamonds", "face": "4", "valueOfCard": 4 },
        { "suit": "Diamonds", "face": "5", "valueOfCard": 5 },
        { "suit": "Diamonds", "face": "6", "valueOfCard": 6 },
        { "suit": "Diamonds", "face": "7", "valueOfCard": 7 },
        { "suit": "Diamonds", "face": "8", "valueOfCard": 8 },
        { "suit": "Diamonds", "face": "9", "valueOfCard": 9 },
        { "suit": "Diamonds", "face": "10", "valueOfCard": 10 },
        { "suit": "Diamonds", "face": "J", "valueOfCard": 11 },
        { "suit": "Diamonds", "face": "Q", "valueOfCard": 12 },
        { "suit": "Diamonds", "face": "K", "valueOfCard": 13 }
    ];
}

function loadDeckOfCards () {
    let cardData = Data.getDefaultDeckOfCards();

    var cards = new Array();

    for (var i = 0; i < cardData.length; i++) {
        var nextCardData = cardData[i];

        let nextCard = new Card(nextCardData);

        cards.push(nextCard);
    }

    const deckOfCards = new DeckOfCards();

    deckOfCards.addCards(cards);

    return deckOfCards;
}
