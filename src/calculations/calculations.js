    // Set up an alphabet-to-number lookup table:
const emptylettersObject = {length:26};
const alphaSetup = Array.from(emptylettersObject, (element, index) => String.fromCharCode(97 + index));


    // Where the magic happens: adding the individual digits of a number
export const addThese = (inputNumber) =>  {
    if(inputNumber % 11 == 0 && inputNumber <= 33 || inputNumber.toString().length <= 1) {
        return inputNumber;
    } else {
        const digitArray = Array.from(inputNumber.toString(), Number);
        let runningTotal = 0;
        digitArray.forEach(digit => runningTotal+= digit);
        return addThese(runningTotal);
    }
};


    // The four calculations to be returned:
export const getDayNumber = (dobDay) => {
    return addThese(dobDay);
};
export const getRulingNumber = (dobDay, dobMonth, dobYear, dateOptions) => {
    if(dateOptions === "date-all-together") {
        const allDobDigits = "" + dobDay + dobMonth + dobYear;
        return addThese(allDobDigits);
    } else if (dateOptions === "date-individually") {
        const allDobDigits = addThese( addThese(dobDay) + addThese(dobMonth) + addThese(dobYear) );
        return addThese(allDobDigits);
    }
};
export const getExpressionNumber = (uName) => {
    const nameAsNumber = lettersToNumber(uName);
    return addThese(nameAsNumber);
};
export const getSoulNumber = (uName) => {
    const nameVowelsOnly = uName.replaceAll(/[^aeiouAEIOU]/g, "");
    const vowelsAsNumber = lettersToNumber(nameVowelsOnly);
    return addThese(vowelsAsNumber);    
};


    // Support function: turns string into digits
const lettersToNumber = (string) => {
    const lowercaseNoWhitespace = string.replaceAll(" ", "").toLowerCase();
    const letterArray = Array.from(lowercaseNoWhitespace);
    const numberArray = [];
    letterArray.forEach(letter => {
        numberArray.push(alphaSetup.indexOf(letter) + 1);
    });
    let digits = "";
    numberArray.forEach(number => digits += number);
    return digits;
};