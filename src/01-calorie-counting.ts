import { fetchInput } from "./utils/fetch-input";

export function getTopThreeElves(elfArr: number[]): number[] {
    elfArr.sort((a, b) => b - a)
    return [elfArr[0], elfArr[1], elfArr[2]];
}

interface AnswerKey {
    topCalorieHoardingElf: number;
    topThreeElves: number[];
    topThreeElvesTotal: number;
}
export async function countCalories(path: string) {
    const elvesCalorieTotals = await readInputConvertNumber(path);
    const topThreeElves = getTopThreeElves(elvesCalorieTotals);
    const answerKey: AnswerKey = {
        topCalorieHoardingElf: topThreeElves[0],
        topThreeElves: topThreeElves,
        topThreeElvesTotal: sum(topThreeElves)
    };

    //Part 1 - Getting Elf /w Highest calorie count
    console.log(answerKey.topCalorieHoardingElf);

    //Part 2 - Sum of Top Three Calorie Hoarding Elves
    console.log(answerKey.topThreeElvesTotal);
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
    return elfSnackList;
}

export function sum(numArray: number[]): number {
    return numArray.reduce(
        (accumulator: number, currentValue: number): number =>
        accumulator + currentValue
    );
}

countCalories('../../inputs/01-calorie-counting.txt')