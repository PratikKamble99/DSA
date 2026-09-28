function isAnagram_1(str1, str2) {
    const afterRemoveNonLetterStr1 = [
        ...str1.replace(/[^a-zA-Z]/g, "").toLowerCase(),
    ]
        .sort()
        .join("");
    const afterRemoveNonLettersStr2 = [
        ...str2.replace(/[^a-zA-Z]/g, "").toLowerCase(),
    ]
        .sort()
        .join("");

    if (
        afterRemoveNonLetterStr1.length !== afterRemoveNonLettersStr2.length ||
        afterRemoveNonLetterStr1 !== afterRemoveNonLettersStr2
    ) {
        return false;
    }

    return true;
}

//For the purpose of user debugging.
console.log(isAnagram_1("listen", "silent"));

// ------------------------------------------------------------
function isAnagram_2(s, t) {
    if (s.length !== t.length) return false;

    // return s.split("").sort().join('')== t.split("").sort().join('');

    const s_map = new Map();
    const t_map = new Map();

    for (let i = 0; i < s.length; i++) {
        if (s_map.has(s[i])) s_map.set(s[i], s_map.get(s[i]) + 1);
        else s_map.set(s[i], 1);
    }

    for (let i = 0; i < t.length; i++) {
        if (t_map.has(t[i])) t_map.set(t[i], t_map.get(t[i]) + 1);
        else t_map.set(t[i], 1);
    }

    // let valid = true;

    for (const [key, value] of s_map) {
        // if (!t_map.has(key) || t_map.get(key) !== value) valid = false;
        if (!t_map.has(key) || t_map.get(key) !== value) return false;
    }

    // s_map.forEach((value, key) => {
    //   console.log(`${key}: ${value}`, t_map.has(key));
    //   if( !t_map.has(key) || t_map.get(key) !== value) {
    //     valid=false;
    //     }
    // });

    // return valid
    return true;
}

// With single Map
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const count = new Map();

    for (let i = 0; i < s.length; i++) {
        count.set(s[i], (count.get(s[i]) || 0) + 1);
        count.set(t[i], (count.get(t[i]) || 0) - 1);
    }

    for (const [_, value] of count) {
        if (value !== 0) return false;
    }

    return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("aab", "abb")); // false
console.log(isAnagram("a", "ab")); // false
