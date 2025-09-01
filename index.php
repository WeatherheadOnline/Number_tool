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
        <legend>Enter your date of birth:</legend>

            <!-- <label for="dob">Date of birth
                <input type="text" id="dob" name="dob" maxlength="10" size="10" pattern="[0-9]{1,2}[/-]?[0-9]{1,2}"/>
            </label> -->

        <!-- <label for="dob-day">Day (DD)</label>
            <input type="number" id="dob-day" name="dob-day" min="1" max="31" size="4" maxlength="2" required />
        <label for="dob-month">Month (MM)</label>
            <input type="number" id="dob-month" name="dob-month" min="1" max="12" size="4" maxlength="2" required />
        <label for="dob-year">Year (YYYY)</label>
            <input type="number" id="dob-year" name="dob-year" min="1" max="2999" size="6" maxlength="4" required /> -->

        <label for="dob">Date of birth
            <input type="date" id="dob" name="dob" />
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

    $input = new DateTime(dataFilter($_POST['dob']));
    $dob = $input->format('Ynj');
    $myYear = $input->format('Y');
    $myMonth = $input->format('n'); # month number without a leading zero
    $myDay = $input->format('j'); # day of month without a leading zero

    $allDigits = str_split((string)$dob);  # "digits" suffix denotes an array
    $allSum = array_sum($allDigits);       # "sum" suffix denotes the sum of an array
    $yearDigits = str_split((string)$myYear);
    $yearSum = array_sum($yearDigits);
    $monthDigits = str_split((string)$myMonth);
    $monthSum = array_sum($monthDigits);
    $dayDigits = str_split((string)$myDay);
    $daySum = array_sum($dayDigits);

    function addThese($inputNumber) {
        if($inputNumber <=9 || $inputNumber % 11 == 0) {
            echo 'Result: ' . $inputNumber . '<br>';
            return $inputNumber;
        } else {
            echo 'Going to keep adding ' . $inputNumber . '<br>';
            return addThese(array_sum(str_split((string)$inputNumber)));
        }
    }

    echo "Your ruling number is " . addThese($allSum) . '<br>';
    echo "Your day number is " . addThese($daySum);

?>

    
</body>
</html>