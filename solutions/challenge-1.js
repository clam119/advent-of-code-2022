const fs = require('fs/promises');

const calorieCounting = async () => {
    const elvesSnackList = fs.readFile('../data/challenge-1.txt', 'utf-8')
    const elvesSnackListCalories = await elvesSnackList;
    const elvesSplitSnackList = elvesSnackListCalories.split(/\r?\n/)
    const elvesCalorieTotals = [];

    let currentElfCalorieCount = 0;

    elvesSplitSnackList.forEach((snack) => {
        const nanChecker = parseInt(snack);
        if(isNaN(nanChecker)) {
            elvesCalorieTotals.push(currentElfCalorieCount);
            currentElfCalorieCount = 0;
        }
        else {
            currentElfCalorieCount += parseInt(snack);
        }
    })

    const topThreeCalorieHoarders = elvesCalorieTotals.sort((a, b) => b - a).slice(0, 3)
    const topThreeCalorieHoardersTotal = topThreeCalorieHoarders.reduce((acc, curr) => {
        return acc + curr;
    })
    
}


calorieCounting();