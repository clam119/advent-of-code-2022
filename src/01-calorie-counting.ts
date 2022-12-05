import { fetchInput } from "./utils/fetch-input";

interface AnswerKey {
    topCalorieHoardingElf: number;
    topThreeElves: number[];
    topThreeElvesTotal: number;
}

export function getTopThreeElves(elfArr: number[]): number[] {
    elfArr.sort((a, b) => b - a)
    return [elfArr[0], elfArr[1], elfArr[2]];
}

export async function countCalories(path: string) {
    const elvesCalorieTotals = await readInputConvertNumber(path);
    const topThreeElves = getTopThreeElves(elvesCalorieTotals);
    const answerKey: AnswerKey = {
        topCalorieHoardingElf: topThreeElves[0],
        topThreeElves: topThreeElves,
        topThreeElvesTotal: sum(topThreeElves)
    };

    return answerKey;
}

export async function readInputConvertNumber(path: string): Promise<number[]>{
    //Reads input, splits & converts to array of numbers
    const rawInput = await fetchInput(path);
    const splitInput = rawInput.split('\r\n');
    const elfSnackList: number[] = [];
    let currentCalorieCount = 0;

    splitInput.forEach((snack: string) => {
        const nanChecker = parseInt(snack);
        if(isNaN(nanChecker)) {
            elfSnackList.push(currentCalorieCount);
            currentCalorieCount = 0;
        }
        else {
            currentCalorieCount += parseInt(snack);
        }
    })

    //As this function doesnt include final value, final check to add last calorie
    if(currentCalorieCount !== 0) {
        elfSnackList.push(currentCalorieCount)
    }

    return elfSnackList;
}

export function sum(numArray: number[]): number {
    return numArray.reduce(
        (accumulator: number, currentValue: number): number =>
        accumulator + currentValue
    );
}

countCalories('../../inputs/01-calorie-counting.txt')