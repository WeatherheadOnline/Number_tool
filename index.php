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

        <label>Date of birth
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

    $radioSelection = $_POST['addition-method'];
    if($radioSelection == 'all-together') {
        echo 'Your ruling number is ' . addThese($dob) . ',<br>';
    } else {
        echo 'Via the alt method, your ruling number is ' . addThese(addThese($myDay) + addThese($myMonth) + addThese($myYear)) . ',<br>';
    };
        echo 'and your day number is ' . addThese($myDay);


    
?>

    
</body>
</html>