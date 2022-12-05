import { fetchInput } from "./utils/fetch-input";

interface AnswerKey {
    partOneAnswer: number,
    partTwoAnswer: number
}

export async function rockPaperScissors(path: string): Promise<AnswerKey> {
    // Import in the input data & split on each new line
    const gameInput = await fetchInput(path);
    const splitGameInput = gameInput.split('\r\n');

    const answerKey: AnswerKey = {
        partOneAnswer: 0,
        partTwoAnswer: 0,   
    }

    // Iterate through each input to check enemy output and player input
    // A, B, C = Enemy's Rock/Paper/Scissors
    // X, Y, Z = Player's Rock/Paper/Scissors

    //Part 1 - Before the actual guidebooks description is revealed
    splitGameInput.forEach((input) => {
        const opponentChoice = input[0];
        const playerChoice = input[2];

        switch(playerChoice) {
            case 'X':
                answerKey.partOneAnswer += 1;
                if (opponentChoice === 'A') {
                    answerKey.partOneAnswer += 3;
                }
                if (opponentChoice === 'C') {
                    answerKey.partOneAnswer += 6;
                }
                break;
            case 'Y':
                answerKey.partOneAnswer += 2;
                if (opponentChoice === 'A') {
                    answerKey.partOneAnswer += 6;
                }
                if (opponentChoice === 'B') {
                    answerKey.partOneAnswer += 3;
                }
                break;
            case 'Z':
                answerKey.partOneAnswer += 3;
                if (opponentChoice === 'B') {
                    answerKey.partOneAnswer += 6;
                }
                if (opponentChoice === 'C') {
                    answerKey.partOneAnswer += 3;
                }
                break;
            default:
                console.log('That choice does not exist')
        }
    })

    splitGameInput.forEach((input) => {
        const opponentChoice = input[0];
        const playerChoice = input[2];

        switch (playerChoice) {
            case 'X': {
                answerKey.partTwoAnswer += 0; // X is intentionally losing
                if (opponentChoice === 'A') { //Enemy selects Rock
                    answerKey.partTwoAnswer += 3; // You pick scissors and lose
                }
                if (opponentChoice === 'B') { //Enemy selects Paper
                    answerKey.partTwoAnswer += 1; // You pick rock and lose
                }
                if (opponentChoice === 'C') { //Enemy selects Scissors
                    answerKey.partTwoAnswer += 2; // You pick paper and lose
                }
                break;
            }
            case 'Y': {
                answerKey.partTwoAnswer += 3; // Y is intentionally drawing
                if (opponentChoice === 'A') { //Enemy selects Rock
                    answerKey.partTwoAnswer += 1; // You pick scissors and draw
                }
                if (opponentChoice === 'B') { //Enemy selects Paper
                    answerKey.partTwoAnswer += 2; // You pick rock and draw
                }
                if (opponentChoice === 'C') { //Enemy selects Scissors
                    answerKey.partTwoAnswer += 3; // You pick paper and draw
                }
                break;
            }
            case 'Z': {
                answerKey.partTwoAnswer += 6; // Z is intentionally winning
                if (opponentChoice === 'A') { //Enemy selects Rock
                    answerKey.partTwoAnswer += 2; // You pick paper and win
                }
                if (opponentChoice === 'B') { //Enemy selects Paper
                    answerKey.partTwoAnswer += 3; // You pick scissors and win
                }
                if (opponentChoice === 'C') { //Enemy selects Scissors
                    answerKey.partTwoAnswer += 1; // You pick rock and win
                }
                break;
            }
                default:
                    console.log('That choice does not exist')
        }
    })
    return answerKey;
}

rockPaperScissors('../../inputs/02-rock-paper-scissors.txt');