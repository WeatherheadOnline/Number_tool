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
            <input type="radio" id="all-together" name="addition-method" value="all-together" checked <?php if (isset($_POST['addition-method'])) {if($_POST['addition-method']=='all-together'){echo 'checked';}} ?>>
            Add all digits together at once (default)
        </label>
        <label>
            <input type="radio" id="individually" name="addition-method" value="individually" <?php if (isset($_POST['addition-method'])) {if($_POST['addition-method']=='individually'){echo 'checked';}} ?>>
            Add the day, month and year separately first 
        </label>

        <legend>Enter a name:</legend>
        <label>Text:
            <input type="text" name="user-name">
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

    # Set up the alphabet lookup array:    
    function addOne($value) {return $value + 1;}
    $alphaSetup = range("a","z");
    $alphaSetup = array_flip($alphaSetup);
    $alphaLookup = array_map("addOne", $alphaSetup); # This works
    $alphaLookup = array_flip($alphaLookup); # get it back to the original format of number:letter so I can use array_search

// ~~~~ Get the numbers from the person's name ("The Expression Number") ~~~ //

    # Turn the name input into an array of characters: 
    // $strippedString = preg_replace("/[^A-Za-z]/", '', $userName);
    $lowercaseString = strtolower($userName);
    $strippedString = preg_replace("/[^a-z]/", '', $lowercaseString);
    $nameArray = str_split($strippedString);

    # Turn the array of characters into an array of corresponding numbers, then add them:
    $nameNumberArray = array();
    foreach ($nameArray as $letter) {
        $nextNumber = array_search($letter, $alphaLookup);
        array_push($nameNumberArray, $nextNumber);
    }
    $fullNameNumber = (addThese(array_sum($nameNumberArray)));
    // print_r($fullNameNumber);

// ~~~~ Get the number from just the natural vowels in the person's name ~~~ //

    $vowelString = preg_replace("/[^aeiou]/", '', $strippedString);
    $vowelArray = str_split($vowelString);
    $vowelNumberArray = array();
    foreach ($vowelArray as $letter) {
        $nextNumber = array_search($letter, $alphaLookup);
        array_push($vowelNumberArray, $nextNumber);
    }
    $vowelNumber = addThese(array_sum($vowelNumberArray));
    // print_r($vowelNumber);

// ~~~~ Get the number from just the EXTRA vowels in the person's name ~~~ //

        # Eliminate Y if it's followed by a vowel, and its either the first letter, or preceded by a consonant (but not R)
    $vowelString = preg_replace("/(?<![aeiour])[y](?=[aeiou])/", '', $strippedString);
        # Save Y if it's preceded by AI,
    $vowelString = preg_replace("/(?<=ai)[y]/", "#", $vowelString);
        # then get rid of any other Y that's preceded by I.
    $vowelString = preg_replace("/(?<=i)[y]/", '', $vowelString);
        # Revert the Ys preceded by AI that were saved:
    $vowelString = preg_replace("/#/", 'y', $vowelString);
    
        # Now any remaining Ys can be counted as vowels.
    // print_r($vowelString);

        # Eliminate W if it's preceded by I, or a consonant, or if it's the first letter:
    $vowelString = preg_replace("/(?<![aeou])w/", '', $strippedString);
        # or if it appears in the pattern "A - W - vowel" (but not if ending in E)
    $vowelString = preg_replace("/(?<=a)w(?=[aiou])/", '', $vowelString);

        # Now any remaining Ws can be counted as vowels. 
    // print_r($vowelString);


// ~~~~ Get the number from all the vowels in the person's name ("The Soul Number") ~~~ //

        #Eliminate everything except the vowels plus W and Y:
    $vowelString = preg_replace("/[^aeiouwy]/", '', $strippedString);
        # Test for Ys that should be counted as vowels, and discard the rest:
    $vowelString = preg_replace("/(?<![aeiour])[y](?=[aeiou])/", '', $vowelString);
    $vowelString = preg_replace("/(?<=ai)[y]/", "#", $vowelString);
    $vowelString = preg_replace("/(?<=i)[y]/", '', $vowelString);
    $vowelString = preg_replace("/#/", 'y', $vowelString);
        # Test for Ws that should be counted as vowels, and discard the rest:
    $vowelString = preg_replace("/(?<![aeou])w/", '', $vowelString);
    $vowelString = preg_replace("/(?<=a)w(?=[aiou])/", '', $vowelString);
        # Calculate based on the remaining letters:
    $vowelArray = str_split($vowelString);
    $vowelNumberArray = array();
    foreach ($vowelArray as $letter) {
        $nextNumber = array_search($letter, $alphaLookup);
        array_push($vowelNumberArray, $nextNumber);
    }
    $vowelNumber = addThese(array_sum($vowelNumberArray));
    print_r($vowelNumber);


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

    # Print the person's ruling number (calculated depending on their selection) and day number
    // $radioSelection = $_POST['addition-method'];
    // if($radioSelection == 'all-together') {
    //     echo 'Your ruling number is ' . addThese($dob) . ',<br>';
    // } else {
    //     echo 'Via the alt method, your ruling number is ' . addThese(addThese($myDay) + addThese($myMonth) + addThese($myYear)) . ',<br>';
    // };
    //     echo 'and your day number is ' . addThese($myDay);  
?>
</body>
</html>