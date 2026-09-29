// Unsorted Array
// Brute
function twoSum1(nums, target) {
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j];
            }
        }
    }
    return -1;
}
// console.log(twoSum1([2, 17, 11, 7], 9));

// Optimal
// O(n) = nlogn
var twoSum = function (nums, target) {
    const hash = new Map();

    for (let i = 0; i < nums.length; i++) {
        let sub = target - nums[i];
        if (hash.has(sub)) {
            return [hash.get(sub), i];
        }
        hash.set(nums[i], i);
    }
};

console.log(twoSum([2, 7, 11, 15], 9)); // [1, 2]
console.log(twoSum([2, 3, 4], 6)); // [1, 3]
console.log(twoSum([-1, 0], -1)); // [1, 2]
console.log(twoSum([1, 2, 3, 4, 4, 9], 8)); // [4, 5]

// The positions are 1-indexed, meaning the first element is position 1, not 0. This is how LeetCode asks it, and it's a common trick to check that you read carefully.
// Sorted Array
function twoSum2Pointer(numbers, target) {
    let start = 0;
    let end = numbers.length - 1;

    while (start < end) {
        if (numbers[start] + numbers[end] == target)
            return [start + 1, end + 1];

        if (numbers[start] + numbers[end] < target) start++;
        else end--;
    }

    return [];
}

console.log(twoSum2Pointer([-5, -3, 0, 2, 8], 5)); // [2, 5]
