const fs = require('fs/promises');

const rucksackOrganisation = async () => {
    const elfRucksackInput = fs.readFile('./data/challenge-3.txt', 'utf-8')
    const resolvedRucksackInput = await elfRucksackInput;
    const splitRucksackInput = resolvedRucksackInput.split('\r\n')
    const commonItemList = [];
    const partTwocommonItemList = []
    const partTwoList = [];

    const alphabetLookup = {};

    let partOnesumOfPriorities = 0;
    let partTwoSumOfPriorities = 0;

    // Create a single Alphabet Lookup Object that contains a-z & A-Z with indexes
    for (let i = 1; i <= 26; i++) {
        let startingLowercaseCharCode = String.fromCharCode(i + 97 - 1);
        alphabetLookup[startingLowercaseCharCode] = i;
    }

    for (let i = 1; i <= 26; i++) {
        let startingUppercaseCharCode = String.fromCharCode(i + 65 - 1)
        alphabetLookup[startingUppercaseCharCode] = i + 26;
    }

    splitRucksackInput.forEach((rucksack) => {
        const numberOfItems = rucksack.length
        const firstCompartment = rucksack.slice(0, numberOfItems/2);
        const secondCompartment = rucksack.slice(numberOfItems/2);

        //Part 1 - Checks to see if SecondCompartment includes characters from first
        for (let c of firstCompartment) {
            if(secondCompartment.includes(c)) {
                commonItemList.push(c);
                break;
            }
        }
    })

    commonItemList.forEach((item) => {
        const sum = alphabetLookup[item];
        partOnesumOfPriorities += sum;
    })

    for (let i = 0; i < splitRucksackInput.length; i += 3) {
        const tripleGroupElves = [splitRucksackInput[i], splitRucksackInput[i + 1], splitRucksackInput[[i + 2]]]
        partTwoList.push(tripleGroupElves)
    }

    partTwoList.forEach((group) => {
        const [firstCompartment, secondCompartment, thirdCompartment] = group;
        for (let c of firstCompartment) {
            if (secondCompartment.includes(c) && thirdCompartment.includes(c)) {
                partTwocommonItemList.push(c);
                break;
            }
        }
    })

    partTwocommonItemList.forEach((item) => {
        const sum = alphabetLookup[item];
        partTwoSumOfPriorities += sum;
    })
    console.log(partTwoSumOfPriorities)
}

rucksackOrganisation()