import { sum, countCalories, readInputConvertNumber} from '../src/01-calorie-counting'

    describe('Testing the Sum Function', () => {
        it('Should return 6 for the provided total', () => {
            const numArray = [1, 2, 3];
            expect(sum(numArray)).toBe(6);
        })
    })

    describe('Testing the readInputConvertNumber Function',  () => {
        it('Should return an array of numbers with each individual elf\'s calorie count', async () => {
            const testInput = await readInputConvertNumber('../../test-inputs/01-calorie-counting.txt');
            expect(testInput).toEqual([
                6000, 4000, 11000, 24000, 10000
            ])
        })

    describe('Testing the countCalories Function', () => {
        it('Should return the elf with the highest calorie count', async () => {
            const testInput = '../../test-inputs/01-calorie-counting.txt';
            const calorieCount = await countCalories(testInput);
            expect(typeof calorieCount.topCalorieHoardingElf).toBe('number')
            expect(calorieCount.topCalorieHoardingElf).toBe(24000);
        })
        it('Should return the top three elves with highest calories', async () => {
            const testInput = '../../test-inputs/01-calorie-counting.txt';
            const calorieCount = await countCalories(testInput);
            expect(Array.isArray(calorieCount.topThreeElves)).toBe(true)
            expect(calorieCount.topThreeElves).toEqual([24000, 11000, 10000]);
        })
        it('Should return the top three elves with highest calories total', async () => {
            const testInput = '../../test-inputs/01-calorie-counting.txt';
            const calorieCount = await countCalories(testInput);
            expect(typeof calorieCount.topThreeElvesTotal).toBe('number');
            expect(calorieCount.topThreeElvesTotal).toBe(45000);
        })
    })
})