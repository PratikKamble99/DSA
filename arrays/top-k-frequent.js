const nums = [1, 1, 1, 2, 2, 3];
const k = 2;
// Output: [1, 2]
// Why:    1 appears 3 times, 2 appears 2 times, 3 appears 1 time. The top 2 most frequent are 1 and 2

function topKFrequent(nums, k) {
    const map = new Map();

    for (let num of nums) {
        if (!map.has(num)) map.set(num, 0);
        map.set(num, map.get(num) + 1);
    }

    return Array.from(map)
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map((a) => a[0]);
}

console.log(topKFrequent([2, 2, 3, 3, 3, 4, 4, 4], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]
console.log(topKFrequent([4, 4, -1, -1, -1, 7], 1)); // [-1]
console.log(topKFrequent([5, 5, 6, 6, 6, 7], 2)); // [6, 5]

// The faster way: bucket approach, O(n)
function topKFrequent(nums, k) {
    // 1. Count (same as yours)
    const count = new Map();
    for (const num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }

    // 2. Buckets: index = frequency, value = numbers with that frequency
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of count) {
        buckets[freq].push(num);
    }

    // 3. Walk from highest frequency down, collect k numbers
    const result = [];
    for (let freq = buckets.length - 1; freq > 0 && result.length < k; freq--) {
        for (const num of buckets[freq]) {
            result.push(num);
            if (result.length === k) return result;
        }
    }
    return result;
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([1], 1)); // [1]
console.log(topKFrequent([4, 4, -1, -1, -1, 7], 1)); // [-1]
console.log(topKFrequent([5, 5, 6, 6, 6, 7], 2)); // [6, 5]

/* 
sort version --> O(n log n)	Sorting the unique values
Bucket version --> O(n)	Counting is O(n), and walking the buckets is O(n)
Min-heap (a structure that always keeps the smallest item on top) --> O(n log k)	Common in Java/Python. JavaScript has no built-in heap, so it's rarely expected in JS interviews.
*/
