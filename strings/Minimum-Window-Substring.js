function minWindow(s, t) {
    if (s.length < t.length) {
        return "";
    }

    const need = {};

    for (let i of t) {
        need[i] = (need[i] || 0) + 1;
    }

    const need_length = Object.keys(need).length;

    let left = 0;
    const window = {};
    let best = Infinity;
    let best_start = 0;
    let required = 0;

    for (let right = 0; right < s.length; right++) {
        const current = s[right];
        window[current] = (window[current] || 0) + 1;

        if (need[current] && need[current] == window[current]) {
            required++;
        }

        while (required == need_length) {
            if (right - left < best) {
                best = right - left;
                best_start = left;
            }

            window[s[left]] = window[s[left]] - 1;

            if (need[s[left]] && window[s[left]] < need[s[left]]) {
                required -= 1;
            }
            left++;
        }
    }
    return best === Infinity
        ? ""
        : s.substring(best_start, best_start + best + 1);
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a")); // "a"
console.log(minWindow("a", "aa")); // ""
console.log(minWindow("ab", "b")); // "b"
console.log(minWindow("aa", "aa")); // "aa"
console.log(minWindow("abc", "d")); // ""
console.log(minWindow("bba", "ab")); // "ba"
