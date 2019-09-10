function loadDeckOfCards () {
    const initialDeckCsv = "Spades,ace,1\nSpades,2,2\nSpades,3,3\nSpades,4,4\nSpades,5,5\nSpades,6,6\nSpades,7,7\n"
        + "Spades,8,8\nSpades,9,9\nSpades,10,10\nSpades,J,11\nSpades,Q,12\nSpades,K,13\nClubs,ace,1\nClubs,2,2\nClubs,3,3\n"
        + "Clubs,4,4\nClubs,5,5\nClubs,6,6\nClubs,7,7\nClubs,8,8\nClubs,9,9\nClubs,10,10\nClubs,J,11\nClubs,Q,12\nClubs,K,13\n"
        + "Hearts,ace,1\nHearts,2,2\nHearts,3,3\nHearts,4,4\nHearts,5,5\nHearts,6,6\nHearts,7,7\nHearts,8,8\nHearts,9,9\n"
        + "Hearts,10,10\nHearts,J,11\nHearts,Q,12\nHearts,K,13\nDiamonds,ace,1\nDiamonds,2,2\nDiamonds,3,3\nDiamonds,4,4\n"
        + "Diamonds,5,5\nDiamonds,6,6\nDiamonds,7,7\nDiamonds,8,8\nDiamonds,9,9\nDiamonds,10,10\nDiamonds,J,11\nDiamonds,Q,12\nDiamonds,K,13";
    
    var lines = initialDeckCsv.split("\n");

    var cards = new Array();

    for (var i = 0; i < lines.length; i++) {
        var nextLine = lines[i];
        var csvOfLine = nextLine.split(",");
        var suit = csvOfLine[0];
        var face = csvOfLine[1];
        var valueOfCard = csvOfLine[2];

        let nextCard = new Card(suit, face, valueOfCard);

        cards.push(nextCard);
    }

    const deckOfCards = new DeckOfCards();

    deckOfCards.addCards(cards);

    return deckOfCards;
}
