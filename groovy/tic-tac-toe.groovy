def shell = new GroovyShell()
def g = shell.parse(new File("user_input.groovy"))

class Board {

    def boardArray = [
        [ ' ', ' ', ' ' ],
        [ ' ', ' ', ' ' ],
        [ ' ', ' ', ' ' ]
    ]

}

def drawBoard(def boardArray) {
    println "  A   B   C"
    println "A ${boardArray[0][0]} │ ${boardArray[0][1]} │ ${boardArray[0][2]}"
    println "────┼───┼───"
    println "B ${boardArray[1][0]} │ ${boardArray[1][1]} │ ${boardArray[1][2]}"
    println "────┼───┼───"
    println "C ${boardArray[2][0]} │ ${boardArray[2][1]} │ ${boardArray[2][2]}"
}

def convertToNumeric(def alpha) {
    if (alpha == 'A' || alpha == 'a') {
        0
    }
    else if (alpha == 'B' || alpha == 'b') {
        1
    }
    else if (alpha == 'C' || alpha == 'c') {
        2
    }
}

def applyMove(def boardArray, def userToken, def row, def column) {
    def numericRow = convertToNumeric row
    def numericColumn = convertToNumeric column

    if (boardArray[numericRow][numericColumn] == ' ') {
        boardArray[numericRow][numericColumn] = userToken
    }
    else {
        null
    }
}

def swapUser(def currentUser) {
    if (currentUser == 'X') {
        'Y'
    }
    else {
        'X'
    }
}

def isCurrentUserWinner(def currentUser, def boardArray) {
    (boardArray[0][0] == currentUser && boardArray[0][1] == currentUser && boardArray[0][2] == currentUser) ||
    (boardArray[1][0] == currentUser && boardArray[1][1] == currentUser && boardArray[1][2] == currentUser) ||
    (boardArray[2][0] == currentUser && boardArray[2][1] == currentUser && boardArray[2][2] == currentUser) ||
    (boardArray[0][0] == currentUser && boardArray[1][0] == currentUser && boardArray[2][0] == currentUser) ||
    (boardArray[0][1] == currentUser && boardArray[1][1] == currentUser && boardArray[2][1] == currentUser) ||
    (boardArray[0][2] == currentUser && boardArray[1][2] == currentUser && boardArray[2][2] == currentUser) ||
    (boardArray[0][0] == currentUser && boardArray[1][1] == currentUser && boardArray[2][2] == currentUser) ||
    (boardArray[2][0] == currentUser && boardArray[1][1] == currentUser && boardArray[0][2] == currentUser)
}

def board = new Board()
def currentUser = 'X'

while(true) {
    drawBoard(board.boardArray)

    def userInput = g.gets "Enter a coordinate ${currentUser} (<row> <col>, q to exit): "

    if (userInput == "q") {
        break;
    }
    else {
        def rowAndCol = userInput.split " "

        if (applyMove(board.boardArray, currentUser, rowAndCol[0], rowAndCol[1])) {
            if (!isCurrentUserWinner(currentUser, board.boardArray)) {
                currentUser = swapUser currentUser
            }
            else {
                drawBoard(board.boardArray)
                println "${currentUser} wins!"
                break
            }
        }
        else {
            println "That space is already taken"
        }
    }
}