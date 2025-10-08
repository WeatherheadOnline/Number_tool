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

export const getSoulNumber = (uName, nameOptions) => {
    let nameVowelsOnly;
    if(nameOptions==="vowels-only") {
        nameVowelsOnly = uName.replaceAll(/[^aeiouAEIOU]/g, "");
    } else if(nameOptions==="some-Ws-Ys") { // *** For decision rules, see this file: 'scratch/Vowel rules for W and Y.txt' ***
        const removeYAtStart = uName.replaceAll(/^[y](?=[aeiou])/g, "");  // Remove Ys at the start of the name, if they're followed by a vowel
        const removeMoreYs = removeYAtStart.replaceAll(/(?<=![aeiour])[y](?=[aeiou])/g, ""); // Replace Ys preceded by a consonant (but not R) and followed by a vowel
        const saveTheseYs = removeMoreYs.replaceAll(/(?<=ai)[y](?=[aeiou])/g, "#");  // Save Ys for later if followed by a vowel but preceded by AI
        const removeYsAfterI = saveTheseYs.replaceAll(/(?<=i)[y](?=[aeiou])/g, "");  // Remove Ys precede by I and followed by a vowel
        const restoreYs = removeYsAfterI.replaceAll(/#/g, "y");  // Restore the Ys that were saved two steps ago
        nameVowelsOnly = restoreYs;
    } else {

        // Change this once the custom W and Y input fields are in place

        nameVowelsOnly = uName.replaceAll(/[^aeiouAEIOU]/g, "");
    }
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