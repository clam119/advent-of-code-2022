import { rockPaperScissors } from "../src/02-rock-paper-scissors";

describe('Testing the Rock Paper Scissors Solution', () => {
    it('Part 1 - Test Input should return 15 as the result', async () => {
        const result = await rockPaperScissors('../../test-inputs/02-rock-paper-scissors.txt');
        const partOneResult = result.partOneAnswer;
        expect(partOneResult).toBe(15);
    })
    it('Part 2 - Test Input should return 12 as the result', async () => {
        const result = await rockPaperScissors('../../test-inputs/02-rock-paper-scissors.txt');
        const partTwoResult = result.partTwoAnswer;
        expect(partTwoResult).toBe(12);
    })
})