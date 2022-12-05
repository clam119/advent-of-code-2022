const fs = require('fs/promises');

const elvenRockPaperScissors = async () => {
    // Import in the input data & split on each new line
    const rawGameInput = fs.readFile('./data/challenge-2.txt', 'utf-8')
    const gameInput = await rawGameInput;
    const splitGameInput = gameInput.split('\r\n');
    let playerTotalScore = 0;

    // Iterate through each input to check enemy output and player input
    // A, B, C = Enemy's Rock/Paper/Scissors
    // X, Y, Z = Player's Rock/Paper/Scissors
    splitGameInput.forEach((input) => {
        const opponentChoice = input[0];
        const playerChoice = input[2];

        // switch(playerChoice) {
        //     case 'X':
        //         playerTotalScore += 1;
        //         if (opponentChoice === 'A') {
        //             playerTotalScore += 3;
        //         }
        //         if (opponentChoice === 'C') {
        //             playerTotalScore += 6;
        //         }
        //         break;
        //     case 'Y':
        //         playerTotalScore += 2;
        //         if (opponentChoice === 'A') {
        //             playerTotalScore += 6;
        //         }
        //         if (opponentChoice === 'B') {
        //             playerTotalScore += 3;
        //         }
        //         break;
        //     case 'Z':
        //         playerTotalScore += 3;
        //         if (opponentChoice === 'B') {
        //             playerTotalScore += 6;
        //         }
        //         if (opponentChoice === 'C') {
        //             playerTotalScore += 3;
        //         }
        //         break;
        //     default:
        //         console.log('That choice does not exist')
        // }

        switch (playerChoice) {
            case 'X': {
                playerTotalScore += 0; // X is intentionally losing
                if (opponentChoice === 'A') { //Enemy selects Rock
                    playerTotalScore += 3; // You pick scissors and lose
                }
                if (opponentChoice === 'B') { //Enemy selects Paper
                    playerTotalScore += 1; // You pick rock and lose
                }
                if (opponentChoice === 'C') { //Enemy selects Scissors
                    playerTotalScore += 2; // You pick paper and lose
                }
                break;
            }
            case 'Y': {
                playerTotalScore += 3; // Y is intentionally drawing
                if (opponentChoice === 'A') { //Enemy selects Rock
                    playerTotalScore += 1; // You pick scissors and draw
                }
                if (opponentChoice === 'B') { //Enemy selects Paper
                    playerTotalScore += 2; // You pick rock and draw
                }
                if (opponentChoice === 'C') { //Enemy selects Scissors
                    playerTotalScore += 3; // You pick paper and draw
                }
                break;
            }
            case 'Z': {
                playerTotalScore += 6; // Z is intentionally winning
                if (opponentChoice === 'A') { //Enemy selects Rock
                    playerTotalScore += 2; // You pick paper and win
                }
                if (opponentChoice === 'B') { //Enemy selects Paper
                    playerTotalScore += 3; // You pick scissors and win
                }
                if (opponentChoice === 'C') { //Enemy selects Scissors
                    playerTotalScore += 1; // You pick rock and win
                }
                break;
            }
        }
    })

    console.log(playerTotalScore)
}

elvenRockPaperScissors();