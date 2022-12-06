import { campCleanup, convertInputToNumArr } from "../src/04-camp-cleanup";
const testInput = '../../test-inputs/04-camp-cleanup.txt'

describe('Testing the Camp Cleanup Solution', () => {
    
    it('CampCleanup function should always return an AnswerKey object with partOne and partTwo keys', async() => {
        const result = await campCleanup(testInput);
        expect(result).toMatchObject({
            partOneAnswer: expect.any(Number),
            partTwoAnswer: expect.any(Number)
        })
    })

    it('Should return the value of 2 for the partOne with test input', async() => {
        const result = await campCleanup(testInput);
        const partOneAnswer = result.partOneAnswer;
        expect(partOneAnswer).toBe(2);
    })

    it('Should return the value of 4 for the partTwo with test input', async() => {
        const result = await campCleanup(testInput);
        const partTwoAnswer = result.partTwoAnswer;
        expect(partTwoAnswer).toBe(4)
        
    })
})

describe('Testing the convertInputToNumArr Function', () => {

    it('Should return an array when invoked with valid path.', async() => {
        const result = await convertInputToNumArr(testInput);
        expect(Array.isArray(result)).toBe(true);
    })

    it('Should return an array with the length matching the input, test input is 6.', async() => {
        const result = await convertInputToNumArr(testInput);
        expect(result.length).toBe(6);
    })

    it('Should return an array of arrays', async() => {
        const result = await convertInputToNumArr(testInput);
        result.forEach((nestedArrElement) => {
            expect(Array.isArray(nestedArrElement)).toBe(true);
        })
    })

    it('Should return an array of arrays with numbers & length of 4 for each array', async() => {
        const result = await convertInputToNumArr(testInput);
        result.forEach((nestedArrElement) => {
            nestedArrElement.forEach((element) => {
                expect(typeof element).toBe('number');
            })
        })
    })

})