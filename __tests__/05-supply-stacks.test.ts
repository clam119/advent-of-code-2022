import { supplyStacks, createStacksObject, insertCratesIntoStack, convertInstructions, partOneMoveCrates, partTwoMoveCrates, partOneAnswer, partTwoAnswer } from "../src/05-supply-stacks";
const testInput = '../../test-inputs/05-supply-stacks.txt'

describe('Testing the supplyStacks Main Function', () => {

    it('Should return an answerKey as its return value', async () => {
        const result = await supplyStacks(testInput);
        expect(result).toMatchObject({
            partOneAnswer: expect.any(String),
            partTwoAnswer: expect.any(String),
        })
    })

    it('Should return CMZ as the partOneAnswer', async() => {
        const result = await supplyStacks(testInput);
        const { partOneAnswer, partTwoAnswer } = result;
        expect(partOneAnswer).toBe('CMZ');
    })

    it('Should return MCD as the partOneAnswer', async() => {
        const result = await supplyStacks(testInput);
        const { partOneAnswer, partTwoAnswer } = result;
        expect(partTwoAnswer).toBe('MCD');
    })

})

describe('Testing the createStacksObject Function', () => {
    
    it('Should return an object with a length matching the number of stacks', async() => {
        const result = await createStacksObject(testInput);
        const stacksObjectKeys = await Object.keys(result)
        expect(stacksObjectKeys.length).toBe(3)
    })

})

describe('Testing the insertCratesIntoStack Function', () => {

    it('Should return a stackObject as its return value.', () => {
        const testStartingIndex = 3;
        const testStackInput = [
            '    [D]    ',
            '[N] [C]    ',
            '[Z] [M] [P]',
            ' 1   2   3 ',
        ]
        const testStackObject = {
            '1': [],
            '2': [],
            '3': [],
        }
        const testStackLookup = {
            '1': 1,
            '5': 2,
            '9': 3,
        }
        const result = insertCratesIntoStack(testStartingIndex, testStackInput, testStackObject, testStackLookup);
        expect(result).toMatchObject({
            '1': expect.any(Array),
            '2': expect.any(Array),
            '3': expect.any(Array)
        })
    })

    it('Should return the expected stackObject when invoked with test values', () => {
        const testStartingIndex = 3;
        const testStackInput = [
            '    [D]    ',
            '[N] [C]    ',
            '[Z] [M] [P]',
            ' 1   2   3 ',
        ]
        const testStackObject = {
            '1': [],
            '2': [],
            '3': [],
        }
        const testStackLookup = {
            '1': 1,
            '5': 2,
            '9': 3,
        }
        const result = insertCratesIntoStack(testStartingIndex, testStackInput, testStackObject, testStackLookup);
        const expectedStackObject = {
            '1': ['N', 'Z'],
            '2': ['D', 'C', 'M'],
            '3': ['P']
        }
        expect(result).toEqual(expectedStackObject);
    })

})

describe('Testing the convertInstructions Function', () => {

    it('Should return an array of arrays', async() => {
        const result = await convertInstructions(testInput);
        expect(Array.isArray(result)).toBe(true);
    })

    it('Should return array of arrays with numbers corresponding to the instructions', async() => {
        const result = await convertInstructions(testInput);
        result.forEach((instruction: number[]) => {
            const [instructionOne, instructionTwo, instructionThree] = instruction;
            expect(typeof instructionOne).toBe('number');
            expect(typeof instructionTwo).toBe('number');
            expect(typeof instructionThree).toBe('number');
        })
    })

})

describe('Testing the partOneMoveCrates Function', () => {

    it('Should return a stackObject as its return value', async() => {
        const result = await partOneMoveCrates(testInput);
        expect(result).toMatchObject({
            '1': expect.any(Array),
            '2': expect.any(Array),
            '3': expect.any(Array),
        })
    })

    it('Should return a stackObject with the crates rearranged based on the instructions', async() => {
        const result = await partOneMoveCrates(testInput);
        expect(result).toMatchObject({
            '1': ['C'],
            '2': ['M'],
            '3': ['Z','N','D','P'],
        })
    })

})


describe('Testing the partOneAnswer Function', () => {

    it('Should return a string as its return value', async() => {
        const result = await partOneAnswer(testInput);
        expect(typeof result).toBe('string')
    })
    
    it('Should return a string as its return value', async() => {
        const result = await partOneAnswer(testInput);
        expect(result).toBe('CMZ')
    })
    
})

describe('Testing the partTwoAnswer Function', () => {

    it('Should return a string as its return value', async() => {
        const result = await partTwoAnswer(testInput);
        expect(typeof result).toBe('string')
    })

    it('Should return a string as its return value', async() => {
        const result = await partTwoAnswer(testInput);
        expect(result).toBe('MCD')
    })

})
