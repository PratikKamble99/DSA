/* 


    Given an array of strings, group the anagrams together.

    Input: ["eat","tea","tan","ate","nat","bat"]

    Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
    
*/

let Input = ["eat", "tea", "tan", "ate", "nat", "bat"];
// let Input=  [""]

// Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

const hash = new Map();

function group_anagram_1(input) {
    for (let i = 0; i < input.length; i++) {
        const sorted = input[i].split("").sort().join(""); //O(nlog(n))

        // if (!hash.has(sorted)) hash.set(sorted, [input[i]]);
        // else hash.set(sorted, hash.get(sorted).concat(input[i]));
        if (!hash.has(sorted)) hash.set(sorted, []);
        hash.get(sorted).push(input[i]);
    } // O(input.length * nlog(n) --> n = word length

    const result = [];
    for (let [key, value] of hash) {
        result.push(value);
    }

    console.log(result);
}

function group_anagram(input) {
    const map = new Map();

    for (let word of input) {
        const arr = new Array(26).fill(0);
        for (let char of word) {
            const index = char.charCodeAt(0) - "a".charCodeAt(0);
            arr[index]++;
        }

        const key = arr.join("#");

        // if (!map.has(key)) {
        //     map.set(key, [word]);
        // } else {
        //     map.set(key, map.get(key).concat(word));
        // }
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(word);
    }

    return Array.from(map.values());
}

group_anagram(Input);
