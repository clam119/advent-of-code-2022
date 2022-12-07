import { fetchInput } from "./utils/fetch-input";
import { StackObject, StackLookUp }from "./interfaces";

interface AnswerKey {
    partOneAnswer: string,
    partTwoAnswer: string
}

export async function supplyStacks(path: string): Promise<AnswerKey> {
    const answerKey: AnswerKey = {
        partOneAnswer: await partOneAnswer(path),
        partTwoAnswer: 'N/A'
    }
    return answerKey;
}

export async function partOneAnswer(path: string): Promise<string> {
    const stackObject = await moveCratesByInstructions(path);
    const stackObjectKeys = Object.values(stackObject);
    let answerKey = '';

    for(let i = 0; i < stackObjectKeys.length; i++) {
        answerKey += stackObjectKeys[i][0];
    }
    console.log(answerKey)
    return answerKey;
}

export async function moveCratesByInstructions(path: string): Promise<StackObject> {
    const stackObject = await createStacksObject(path);
    const instructions = await convertInstructions(path);

    instructions.forEach((instruction: number[]) => {
        const [cratesToMove, previousStack, nextStack] = instruction;
        for(let i = 0; i < cratesToMove; i++) {
            let shiftedCrate:any = stackObject[previousStack].shift();
            let placedCrate = stackObject[nextStack].unshift(shiftedCrate);
        }

    })
    return stackObject;
}

export async function convertInstructions(path: string): Promise<number[]| any> {
    const stackInput = await fetchInput(path);
    const splitStackInput = stackInput.split('\r\n');
    const rawInstructions = splitStackInput.filter(line => line.includes('move'));
    const convertedInstructions = rawInstructions.map((instruction) => {
        const regex = /\d+/g;
        const foundNumbers = instruction.match(regex);
        const stringToNum = foundNumbers?.map(instruction => parseInt(instruction))
        return stringToNum;
    })
    return convertedInstructions;
}

export function findNumOfStacks(stackInput: string[]): number {
    let numberOfStacks = 0;
    // The first line to contain numbers will be used to find out number of stacks
    for (let i = 0; i < stackInput.length; i++) {
        const regex = /\d+/g;
        if(regex.test(stackInput[i])) {
            const inputLineLength = stackInput[i].length-2;
            const numOfStacks = stackInput[i].charAt(inputLineLength);
            numberOfStacks = parseInt(numOfStacks);
            break;
        }
    }
    return numberOfStacks;
} 

export async function createStacksObject(path: string): Promise<StackObject> {
    const stackInput = await fetchInput(path);
    const splitStackInput = stackInput.split('\r\n');
    const stackObject: StackObject = {}
    const stackPositionLookup: StackLookUp = {};
    
    let numberOfStacks = findNumOfStacks(splitStackInput);

    // Number of stacks confirmed - add to Stack Object
    for (let i = 1; i <= numberOfStacks; i++) {
        stackObject[i] = [];
    }

    // Build up stackObject, key is the index & value is which stack it belongs in
    for (let i = 1; i <= numberOfStacks; i++) {
        if(i === 1) {
            stackPositionLookup[1] = 1;
        }
        else {
            stackPositionLookup[4 * i - 3] = i; 
        }
    }

    const stackObjectWithCrates = insertCratesIntoStack(numberOfStacks, splitStackInput, stackObject, stackPositionLookup)
    return stackObjectWithCrates;
}

export function insertCratesIntoStack (startingIndex: number, stackInput: string[], stackObject: StackObject, stackPositionLookup: StackLookUp): StackObject {
    const returnStackObject: StackObject = stackObject;
    for(let i = 0; i < startingIndex; i++) {
        const regex = /[A-Z]/g;
        if(regex.test(stackInput[i])) {
            const individualStackLine = stackInput[i].split('');
            individualStackLine.forEach((character, index) => {
                if(regex.test(character)) {
                    const stackInsertLine = stackPositionLookup[index];
                    returnStackObject[stackInsertLine].push(character);
                }
            })
        }
    }
    
    return returnStackObject;
}


supplyStacks('../../inputs/05-supply-stacks.txt')