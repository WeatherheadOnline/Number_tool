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

export const getSoulNumber = (uName, nameOptions, customWs, customYs) => {
    const lowercaseNoWhitespace = uName.replaceAll(" ", "").toLowerCase();
    let nameVowelsOnly;
    if(nameOptions==="vowels-only") {
        nameVowelsOnly = lowercaseNoWhitespace.replaceAll(/[^aeiouAEIOU]/g, "");
    } else if(nameOptions==="some-Ws-Ys") { 
        nameVowelsOnly = optionSomeWYs(lowercaseNoWhitespace);
    } else if(nameOptions==="custom-Ws-Ys") {
        nameVowelsOnly = optionCustomWYs(lowercaseNoWhitespace, customWs, customYs);
    }
    const vowelsAsNumber = lettersToNumber(nameVowelsOnly);
    return addThese(vowelsAsNumber);    
};


    // Support functions
    
const lettersToNumber = (string) => {
    const letterArray = Array.from(string);
    const numberArray = [];
    letterArray.forEach(letter => {
        numberArray.push(alphaSetup.indexOf(letter) + 1);
    });
    let digits = "";
    numberArray.forEach(number => digits += number);
    return digits;
};

const optionSomeWYs = (string) => {  // *** For decision rules, see README.md ***
    const removeYAtStart = string.replaceAll(/^[y](?=[aeiou])/g, "");  // Remove Ys at the start of the name, if they're followed by a vowel
    const removeMoreYs = removeYAtStart.replaceAll(/(?<=![aeiour])[y](?=[aeiou])/g, ""); // Replace Ys preceded by a consonant (but not R) and followed by a vowel
    const saveTheseYs = removeMoreYs.replaceAll(/(?<=ai)[y](?=[aeiou])/g, "#");  // Save Ys for later if followed by a vowel but preceded by AI
    const removeYsAfterI = saveTheseYs.replaceAll(/(?<=i)[y](?=[aeiou])/g, "");  // Remove Ys precede by I and followed by a vowel
    const restoredYs = removeYsAfterI.replaceAll(/#/g, "y");  // Restore the Ys that were saved two steps ago
    return restoredYs;
}

const optionCustomWYs = (string, customWs, customYs) => {
    let addedCustomWYs = string.replaceAll(/[^aeiouAEIOU]/g, "");
    if (customWs > 0 || customYs > 0) {
        for (let i = 1; i <= customWs; i++) {
            addedCustomWYs += "w";
        };
        for (let i = 1; i <= customYs; i++) {
            addedCustomWYs += "y";
        }
    };
    return addedCustomWYs
}