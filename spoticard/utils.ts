export function generateRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffleArray(array: Array<any>){
    // Knuth Shuffle
    // https://github.com/Daplie/knuth-shuffle/blob/master/index.js

    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = generateRandomInteger(0, currentIndex - 1);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}