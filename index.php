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
        if($inputNumber % 11 == 0 || $inputNumber <=9) {
            echo 'Returning input number as: ' . $inputNumber . '<br>';
            return $inputNumber;
        } else {
            echo 'Continuing to iterate with: ' .$inputNumber . '<br>';
            return addThese(array_sum(str_split((string)$inputNumber)));
        }
    }

    // $rulingNumber = addThese()
    echo 'Running addThese directly on the set of digits, $dob: ' . addThese($dob) . '<br>';
    echo 'Running addThese on just the day directly from the date: ' . addThese($myDay);
?>

    
</body>
</html>