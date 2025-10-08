## This describes the logic behind the vowel calculations (for soul number) when the "Some Ws and Ys" option is selected.
Note: more names were assessed than shown here; these lists are representative.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
### Y: Guidelines from the textbook:
- Y is a vowel when there is no other vowel in a syllable.
- Y is a vowel when it is preceded by a natural vowel and pronounced together as one sound

- Y is going to almost always be a vowel.

- When Y is NOT a vowel: 
// Sawyer
// Aliya(h)
// Maliya(h)
// Youssef
// Ilya

- When Y IS a vowel:
// Ryan
// Aryan
// Maya (?)
// Freya (?)
// Maryam (?)
// Arya (?)
// Ayan (?)
// Alaiya

Y is NOT a vowel if: 
// If the first letter is Y and it's followed by a vowel (eg Youssef - but in Yvonne it IS a vowel)
// if the Y is preceded by a consonant (but not an R in Ryan it IS a vowel) and followed by a vowel
// if the Y is preceded by I (but not AI) and followed by a vowel (eg Aliya - but for Iyla or Alaiya in IS a vowel)

These regex rules can be used in code:
/^[y](?=[aeiou])/, ""  // Y at the start of the name, followed by a vowel

/(?<=![aeiour])[y](?=[aeiou])/, ""  // Y preceded by a consonont (except R) and followed by a vowel

/(?<=ai)[y](?=[aeiou])/, "#"  // *** Save the Y for later if it's followed by a vowel but preceded by AI (as in Alaiya)

/(?<=i)[y](?=[aeiou])/, ""  // Remove all remaining Ys that are preceded by I and followed by a vowel

/#/, "y"  // Restore the Ys that were saved for later

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
### W: Guidelines from the textbook:
- W is a vowel when it is preceded by a natural vowel and pronounced together as one sound

- These Ws are counted as vowels:
// Matthew 
// Owen
// Sawyer 
// Aws
// Hawk
// Shawn
// Lewis    E - W - I
// Rowan    O - W - A
// Calloway O - W - A

- These Ws are NOT counted as vowels:
// Wyatt
// Maxwell
// Wren
// Edward
// Gwen
// Jawad    A - W - A
// Hawa     A - W - A
// Zorawa   A - W - A
// Callaway A - W - A
// Hawi     A - W - I
// Dawud    A - W - U
// Dawoud   A - W - O

- Rules:
// Yes if it appears as [E|O|U] - W.
// Yes if it appears as A - W - consontant or A - W at end of name.

// Not if it's the first letter.
// Not if it appears as I - W.
// Not if it's preceded by a consonant (consonant - W).
// Not if it appears as A - W - vowel.

These regex rules can be used in code:
/^w/, ""  // Remove it if it's the first letter
/(?<=[i])[w]/, ""  // Remove it if it appears as I - W
/(?<=![aeiou])[w]/, ""  // Remove it if it's preceded by a consonant
/(?<=[a])[w](?=[aeiou])/, ""  // Remove it if it appears as A - W - vowel

