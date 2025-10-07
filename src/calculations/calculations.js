export const getDayNumber = (dobDay) => {
    return addThese(dobDay);
};

export const getRulingNumber = (dobDay, dobMonth, dobYear) => {
    const allDobDigits = "" + dobDay + dobMonth + dobYear;
    return addThese(allDobDigits);
};

export const getExpressionNumber = (uName) => {
    const letterArray = letterToNumberArray(uName);
    let lettersSum = 0;
    letterArray.forEach(number => lettersSum+= number);
    return addThese(lettersSum);
};

// const getSoulNumber = () {

// };

const addThese = (inputNumber) =>  {
    if(inputNumber % 11 == 0 && inputNumber <= 33 || inputNumber <=9) {
        return inputNumber;
    } else {
        const digitArray = Array.from(inputNumber.toString(), Number);
        let runningTotal = 0;
        digitArray.forEach(digit => runningTotal+= digit);
        return addThese(runningTotal);
    }
};

const emptylettersObject = {length:26};
const alphaSetup = Array.from(emptylettersObject, (element, index) => String.fromCharCode(97 + index));
console.log(alphaSetup);

export const nameToArray = uName => {
    const lowercaseNoWhitespace = uName.replaceAll(" ", "").toLowerCase(); 
    return Array.from(lowercaseNoWhitespace);
}

export const letterToNumberArray = letters => {
    const numberArray = [];
    const letterArray = nameToArray(letters);
    letterArray.forEach((letter) => {
        numberArray.push(alphaSetup.indexOf(letter) + 1);
    });   
    return numberArray;
}