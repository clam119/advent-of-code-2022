import { rucksackOrganisation } from "../src/03-rucksack-reorganisation";

describe('Testing the Rucksack Reorganisation Solution', () => {

    it('Should always return an AnswerKey with partOne and partTwo answer keys', async () => {
        const result = await rucksackOrganisation('../../test-inputs/03-rucksack-reorganisation.txt')
        expect(result).toMatchObject({
            partOneAnswer: expect.any(Number),
            partTwoAnswer: expect.any(Number)
        })
    })

    it('Should return 157 for partOne with the test input', async () => {
        const result = await rucksackOrganisation('../../test-inputs/03-rucksack-reorganisation.txt')
        const partOneResult = result.partOneAnswer;
        expect(partOneResult).toBe(157)
    })

    it('Should return 70 for partOne with the test input', async () => {
        const result = await rucksackOrganisation('../../test-inputs/03-rucksack-reorganisation.txt')
        const partTwoResult = result.partTwoAnswer;
        expect(partTwoResult).toBe(70)
    })
})