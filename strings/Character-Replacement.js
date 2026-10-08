/* 
Problem:
You're given a string s of uppercase letters and a number k. You can change any character into any other uppercase letter, at most k times.
Return the length of the longest substring that can be made of all the same letter after your changes.

Example 1:
Input:  s = "ABAB", k = 2
Output: 4
Why:    Change both A's to B's → "BBBB" (or both B's to A's)

Example 2:
Input:  s = "AABABBA", k = 1
Output: 4
Why:    Change the middle A → "AABBBBA"
                                ^^^^
        The 4 B's in a row = length 4

*/

function characterReplacement(s, k) {
    const count = new Map();
    let left = 0;
    let best = 0;

    for (let right = 0; right < s.length; right++) {
        count.set(s[right], (count.get(s[right]) || 0) + 1);

        if (right - left + 1 - Math.max(...count.values()) > k) {
            // current_substring_length - max count > k -> left forward and minus 1 from s[left] count
            count.set(s[left], (count.get(s[left]) || 0) - 1);
            left += 1;
        }

        best = Math.max(right - left + 1, best);
    }
    return best;
}

console.log(characterReplacement("ABAB", 2)); // 4
console.log(characterReplacement("AABABBA", 1)); // 4
console.log(characterReplacement("AAAA", 0)); // 4
console.log(characterReplacement("ABCD", 0)); // 1
console.log(characterReplacement("ABCD", 4)); // 4
console.log(characterReplacement("A", 1)); // 1
console.log(characterReplacement("ABBB", 0)); // 3
