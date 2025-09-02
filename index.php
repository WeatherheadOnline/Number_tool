<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First PHP</title>
</head>
<body>

<form name="dob-entry-form" method="POST" action="">
    <fieldset>
        <legend>Enter information to find out the numbers</legend>

        <label>Enter a date of birth:
            <input type="date" id="dob" name="dob" />
        </label>
        
        <label>
            <input type="radio" id="addition-all-together" name="addition-method" value="all-together" checked <?php if (isset($_POST['addition-method'])) {if($_POST['addition-method']=='all-together'){echo 'checked';}} ?>>
            Add all digits together at once (default)
        </label>
        <label>
            <input type="radio" id="addition-individually" name="addition-method" value="individually" <?php if (isset($_POST['addition-method'])) {if($_POST['addition-method']=='individually'){echo 'checked';}} ?>>
            Add the day, month and year separately first 
        </label>

        <legend>Enter a name:</legend>
        <label>Text:
            <input type="text" name="user-name" value="<?php echo isset($_POST['user-name']) ? $_POST['user-name'] : ''; ?>">
        </label>
        <label>
            <input type="radio" id="vowels-strict" name="which-vowels" value="strict" checked <?php if (isset($_POST['which-vowels'])) {if($_POST['which-vowels']=='strict'){echo 'checked';}} ?>>
            Only include A-E-I-O-U
        </label>
        <label>
            <input type="radio" id="vowels-w-y" name="which-vowels" value="w-y" <?php if (isset($_POST['which-vowels'])) {if($_POST['which-vowels']=='w-y'){echo 'checked';}} ?>>
            Include some Ws and Ys
        </label>
        <label>
            <input type="radio" id="vowels-custom" name="which-vowels" value="custom" <?php if (isset($_POST['which-vowels'])) {if($_POST['which-vowels']=='custom'){echo 'checked';}} ?>>
            Custom:
        </label>
        <label>Add this many Ws:
            <!-- <input type="number" min="0" max="10" name="numberOfWs"> -->
            <input type="number" min="0" max="10" name="numberOfWs" value="<?php echo isset($_POST['numberOfWs']) ? $_POST['numberOfWs'] : ''; ?>">
        </label>
        <label>Add this many Ys:
            <!-- <input type="number" min="0" max="10" name="numberOfYs"> -->
            <input type="number" min="0" max="10" name="numberOfYs" value="<?php echo isset($_POST['numberOfYs']) ? $_POST['numberOfYs'] : ''; ?>">
        </label>
        
        <input type="reset" value="Reset" />
        <input type="submit" value="Submit" />
    </fieldset>
</form>

<?php
    function dataFilter($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

// ~~~~ Setting up to get the numbers from the person's name ~~~ //

    $userName = dataFilter($_POST['user-name']);
   
    function addOne($value) {return $value + 1;}    # Setting up the alphabet lookup array
    $alphaSetup = range("a","z");
    $alphaSetup = array_flip($alphaSetup);
    $alphaLookup = array_map("addOne", $alphaSetup); 
    $alphaLookup = array_flip($alphaLookup);   # revert to the original format of number:letter, to facilitate using array_search

    function getNumberArray($inputArray, $alphaLookup) {   # Takes an array of characters and returns an array of the corresponding numbers
        $numberArray = array();
        foreach ($inputArray as $letter) {
            $nextNumber = array_search($letter, $alphaLookup);
            array_push($numberArray, $nextNumber);
        }
        return $numberArray;
    }

// ~~~~ Get the numbers from the person's whole name ("The Expression Number") ~~~ //
 
    $lowercaseString = strtolower($userName);   # Turn the name input into an array of characters
    $strippedString = preg_replace("/[^a-z]/", '', $lowercaseString);
    $nameArray = str_split($strippedString);
    $nameNumberArray = getNumberArray($nameArray, $alphaLookup);
    $fullNameNumber = (addThese(array_sum($nameNumberArray)));  // *** This is the Expression Number ***

// ~~~~ Get the number from all the vowels in the person's name ("The Soul Number") ~~~ //

    function vowelNumberDescision($strippedString) {
        if ($_POST['which-vowels'] == 'strict') {  # call getVowelStringStrict, which delivers a string
            return getVowelStringStrict($strippedString); 
        } elseif ($_POST['which-vowels'] == 'w-y') {  # call getVowelStringWY, which delivers a string
            return getVowelStringWY($strippedString);
        } else {
            return getVowelStringCustom($strippedString);
        };
    }

    function getVowelStringStrict($strippedString) {    # Option 1: generate a string containing only A,E,I,O,U
        return preg_replace("/[^aeiou]/", '', $strippedString);
    }

    function getVowelStringWY($strippedString) {   # Option 2: include Ws and Ys under specific conditions 
        $vowelString = preg_replace("/[^aeiouwy]/", '', $strippedString);   #Eliminate everything except the vowels plus W and Y
        $vowelString = preg_replace("/(?<![aeiour])[y](?=[aeiou])/", '', $vowelString);    # Test for Ys that should be counted as vowels, and discard the rest
        $vowelString = preg_replace("/(?<=ai)[y]/", "#", $vowelString);                    # For decision rules, see "Vowel rules for W and Y.txt"
        $vowelString = preg_replace("/(?<=i)[y]/", '', $vowelString);
        $vowelString = preg_replace("/#/", 'y', $vowelString);
        $vowelString = preg_replace("/(?<![aeou])w/", '', $vowelString);    # Test for Ws that should be counted as vowels, and discard the rest
        $vowelString = preg_replace("/(?<=a)w(?=[aiou])/", '', $vowelString);  # For decision rules, see "Vowel rules for W and Y.txt"
        return $vowelString;
    }

    function getVowelStringCustom($strippedString) {  # Option 3: allow the user to dictate how any Ws and Ys are included in the string
        $baseString = preg_replace("/[^aeiou]/", '', $strippedString);
        $numberOfWs = isset($_POST['numberOfWs']) ? dataFilter($_POST['numberOfWs']) : 0;
        $numberOfYs = isset($_POST['numberOfYs']) ? dataFilter($_POST['numberOfYs']) : 0;
        $addTheseWs = str_repeat('w', $numberOfWs);
        $addTheseYs = str_repeat('y', $numberOfYs);
        $vowelString = $baseString . $addTheseWs . $addTheseYs;
        return $vowelString;
    }

    $vowelString = vowelNumberDescision($strippedString);
    $vowelArray = str_split($vowelString);    
    $vowelNumberArray = getNumberArray($vowelArray, $alphaLookup);
    $vowelNumber = addThese(array_sum($vowelNumberArray));  // *** This is the Soul Number ***
 
// ~~~ Get the person's ruling and day numbers ("Life Path numbers") from their date of birth ~~~ //

    $input = new DateTime(dataFilter($_POST['dob']));
    $dob = $input->format('Ynj');
    $myDay = $input->format('j'); # day of month without a leading zero
    $myMonth = $input->format('n'); # month number withoun a leading zero
    $myYear = $input->format('Y'); # year in four-digit format 

    function addThese($inputNumber) {
        if($inputNumber % 11 == 0 && $inputNumber <= 33 || $inputNumber <=9) {
            return $inputNumber;
        } else {
            return addThese(array_sum(str_split((string)$inputNumber)));
        }
    }

    # Find the person's ruling number (calculated depending on their selection) and day number
    $dobSelection = $_POST['addition-method'];
    if($dobSelection == 'all-together') {
         $rulingNumber = addThese($dob);
    } else {
         $rulingNmuber = addThese(addThese($myDay) + addThese($myMonth) + addThese($myYear));
    };
    $dayNumber = addThese($myDay);
?>
</body>
</html>