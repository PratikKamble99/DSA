// START: work only for single word -> skip from .md
function validatePalindrome_1(a) {
    // Space O(1)
    let start = 0;
    let end = a.length - 1;

    while (start < end) {
        // time: O(n/2) ~ O(n)
        if (a[start] !== a[end]) return false;
        start++;
        end--;
    }
    return true;
}

// Recursion - No needed -> skip from .md
function validatePalindrome_2(str) {
    function rec(l, r) {
        if (str[l] != str[r]) return false;
        if (l >= r) return true;
        return rec(l + 1, r - 1);
    }
    return rec(0, str.length - 1);
}

// END: work only for single word

// START: work for string
function isPalindrome_1(str) {
    const str1 = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // O(n) + O(n)
    const reverse = [...str1].reverse().join(""); // O(n) + O(n) + O(n)

    if (str1 === reverse) return true;
    return false;
}

function isPalindrome_2(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, ""); // optional keep numbers if string contains numbers
    let start = 0;
    let end = cleaned.length - 1;
    while (start < end) {
        if (cleaned[start] !== cleaned[end]) return false;
        start++;
        end--;
    }

    return true;
}

function isPalindrome(s) {
    const isAlphaNumeric = (ch) => /[a-zA-Z0-9]/.test(ch); // optional keep numbers if string contains numbers
    let start = 0;
    let end = s.length - 1;
    while (start < end) {
        while (start < end && !isAlphaNumeric(s[start])) start++;
        while (start < end && !isAlphaNumeric(s[end])) end--;

        if (s[start].toLowerCase() !== s[end].toLowerCase()) return false;

        start++;
        end--;
    }

    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
// console.log(isPalindrome("race a car")); // false
// console.log(isPalindrome(" ")); // true
// console.log(isPalindrome("0P")); // false
// console.log(isPalindrome("ab_a")); // true);
