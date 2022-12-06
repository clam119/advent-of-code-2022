import { fetchInput } from "./utils/fetch-input";
import { AnswerKey } from './interfaces'

export async function campCleanup(path: string): Promise<AnswerKey>{
    const answerKey: AnswerKey = {
        partOneAnswer: 0,
        partTwoAnswer: 0
    }

    const campSectionsInput = await convertInputToNumArr(path);
    
    campSectionsInput.forEach((individualInput) => {
        const [pairOneA, pairOneB, pairTwoA, pairTwoB] = individualInput;
        //Part 1 - Finding how many assignment pairs one range fully contain the other
        if(pairOneA <= pairTwoA && pairTwoB <= pairOneB) {
            answerKey.partOneAnswer++;
        }   else if (pairTwoA <= pairOneA && pairOneB<= pairTwoB) {
            answerKey.partOneAnswer++;
        }

        //Part 2 - Finding how many assignment pairs ranges overlap at all
        if(pairOneA === pairTwoA || pairOneA === pairTwoB || pairTwoA === pairOneA || pairTwoA === pairOneB) {
            answerKey.partTwoAnswer++;
        } else if (pairOneA > pairTwoA && pairOneA < pairTwoB) {
            answerKey.partTwoAnswer++;
        } else if (pairTwoA > pairOneA && pairTwoA < pairOneB) {
            answerKey.partTwoAnswer++;
        }
    })
    return answerKey;
}

export async function convertInputToNumArr(path: string): Promise<number[][]> {
    const campInput = await fetchInput(path);
    const splitCampInput = campInput.split('\r\n')
    const regex = /\d+/g;
    const inputToNumArr:number[][] = [];
    
    splitCampInput.forEach((input) => {
        const inputString:any = input.match(regex);
        const convertElementsToNum:number[] = inputString.map((input: string) => parseInt(input))
        inputToNumArr.push(convertElementsToNum);
    })

    return inputToNumArr;
}


campCleanup('../../inputs/04-camp-cleanup.txt')