function checkPalindrome(s) {
    let i = 0;
    let j = s.length - 1;

    while (i < j) {
        if (s[i] !== s[j]) return false;
        i++;
        j--;
    }
    return true;
}

function longestPalindrome_brute(s) {
    let maxLStr = "";
    for (let i = 0; i < s.length; i++) {
        let subString = "";
        for (let j = i; j < s.length; j++) {
            subString += s[j];
            if (
                checkPalindrome(subString) &&
                subString.length > maxLStr.length
            ) {
                maxLStr = subString;
            }
        }
    }
    return maxLStr;
}

function longestPalindrome() {
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        // calculate odd palindrome substrings
        maxLength = Math.max(
            maxLength,
            countPalindromeLength(s, i, i, maxLength),
        );
        // calculate even palindrome substrings
        maxLength = Math.max(
            maxLength,
            countPalindromeLength(s, i, i + 1, maxLength),
        );
    }
    return maxLength;
}

function countPalindromeLength(s, left, right, max) {
    let maxL = 0;

    while (left >= 0 && right < s.length && s[left] == s[right]) {
        maxL = Math.max(max, right - left + 1);
        left--;
        right++;
    }
    return maxL;
}

function countLengthPalindrome(s, left, right, maxL) {
    let l = left;
    let r = right;

    // This will direct longest palindrome string
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }

    // The pointers moved one step beyond the palindrome
    l = left + 1;
    r = right - 1;

    const length = r - l + 1;

    if (length > maxL) {
        return [length, l, r];
    }

    return [maxL, l, r];
}

// get string
var longestPalindrome = function (s) {
    let maxLength = 0;
    let left = 0;
    let right = 0;

    for (let i = 0; i < s.length; i++) {
        const [oddLength, left1, right1] = countLengthPalindrome(
            s,
            i,
            i,
            maxLength,
        );

        if (oddLength > maxLength) {
            maxLength = oddLength;
            left = left1;
            right = right1;
        }

        const [evenLength, left2, right2] = countLengthPalindrome(
            s,
            i,
            i + 1,
            maxLength,
        );

        if (evenLength > maxLength) {
            maxLength = evenLength;
            left = left2;
            right = right2;
        }
    }

    return s.substring(left, right + 1);
};
