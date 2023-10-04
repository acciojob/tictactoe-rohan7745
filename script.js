//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const submitButton = document.getElementById("submit");
    const gameBoard = document.querySelector(".board");
    const messageDiv = document.querySelector(".message");

    let currentPlayer = "Player 1";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameWon = false;

    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return board.every(cell => cell !== "");
    }

    function handleCellClick(e) {
        const cellIndex = e.target.id - 1;

        if (board[cellIndex] === "" && !gameWon) {
            board[cellIndex] = currentPlayer === "Player 1" ? "X" : "O";
            e.target.textContent = board[cellIndex];

            if (checkWin()) {
                gameWon = true;
                messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            } else if (checkDraw()) {
                gameWon = true;
                messageDiv.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
                messageDiv.textContent = `${currentPlayer}, you're up`;
            }
        }
    }

    submitButton.addEventListener("click", function () {
        const player1Name = player1Input.value;
        const player2Name = player2Input.value;

        if (player1Name && player2Name) {
            player1Input.disabled = true;
            player2Input.disabled = true;
            submitButton.disabled = true;

            // Display the game board
            gameBoard.style.display = "grid";
            messageDiv.textContent = `${currentPlayer}, you're up`;
            gameBoard.addEventListener("click", handleCellClick);
        }
    });
});
