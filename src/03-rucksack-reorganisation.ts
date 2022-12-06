import { fetchInput } from "./utils/fetch-input";
import { AnswerKey } from './interfaces'

export async function rucksackOrganisation(path: string): Promise<AnswerKey> {
    const elfRucksackInput = await fetchInput(path)
    const splitRucksackInput = elfRucksackInput.split('\r\n')

    const partOneCommonItemList: string[] = [];
    const partTwoCommonItemList: string[] = []
    const partTwoList = [];

    //Currently using 'any since the lookup object is empty until runtime
    const alphabetLookup: any = {};

    const answerKey: AnswerKey = {
        partOneAnswer: 0,
        partTwoAnswer: 0,
    }

    // Create a single Alphabet Lookup Object that contains a-z & A-Z with indexes
    for (let i = 1; i <= 26; i++) {
        let startingLowercaseCharCode = String.fromCharCode(i + 97 - 1);
        alphabetLookup[startingLowercaseCharCode] = i;
    }

    for (let i = 1; i <= 26; i++) {
        let startingUppercaseCharCode = String.fromCharCode(i + 65 - 1)
        alphabetLookup[startingUppercaseCharCode] = i + 26;
    }

    //Part 1 - Checks to see if secondCompartment includes characters from firstCompartment
    splitRucksackInput.forEach((rucksack) => {
        const numberOfItems = rucksack.length
        const firstCompartment = rucksack.slice(0, numberOfItems/2);
        const secondCompartment = rucksack.slice(numberOfItems/2);

        for (let c of firstCompartment) {
            if(secondCompartment.includes(c)) {
                partOneCommonItemList.push(c);
                break;
            }
        }
    })

    partOneCommonItemList.forEach((item) => {
        const sum:number = alphabetLookup[item];
        answerKey.partOneAnswer += sum;
    })

    //Part 2 - Checks for the common character for groups of elves in threes
    for (let i = 0; i < splitRucksackInput.length; i += 3) {
        const tripleGroupElves:any = [splitRucksackInput[i], splitRucksackInput[i + 1], splitRucksackInput[i + 2]]
        if(tripleGroupElves.includes(undefined)) {
            break;
        }
        partTwoList.push(tripleGroupElves)
    }

    partTwoList.forEach((group) => {
        const [firstCompartment, secondCompartment, thirdCompartment] = group;
        for (let c of firstCompartment) {
            if (secondCompartment.includes(c) && thirdCompartment.includes(c)) {
                partTwoCommonItemList.push(c);
                break;
            }
        }
    })

    partTwoCommonItemList.forEach((item) => {
        const sum = alphabetLookup[item];
        answerKey.partTwoAnswer += sum;
    })

    return answerKey;
}

rucksackOrganisation('../../inputs/03-rucksack-reorganisation.txt')