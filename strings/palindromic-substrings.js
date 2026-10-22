/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        // calculate odd pallindrom substrings
        count += countPalindrome(s, i, i);
        // calculate even pallindrome substrings
        count += countPalindrome(s, i, i + 1);
    }
    return count;
};

function countPalindrome(s, left, right) {
    let count = 0;

    while (left >= 0 && right < s.length && s[left] == s[right]) {
        count++;
        left--;
        right++;
    }
    return count;
}
