/* 
    Majority Elements(&gt;N/3 times) | Find the elements that appears more than N/3 times in the array
 */

var majorityElement = function (nums) {
    const hashmap = new Map();
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (hashmap.has(nums[i])) {
            hashmap.set(nums[i], hashmap.get(nums[i]) + 1);
        } else {
            hashmap.set(nums[i], 1);
        }

        // If latest count of key is greater than N/3 push it into result
        // This eliminates extra for of hashmap check
        if (hashmap.get(nums[i]) == Math.floor(nums.length / 3) + 1) {
            result.push(nums[i]);
        }
    }

    // for (let [key, value] of hashmap) {
    //     if (value > nums.length / 3) result.push(key);
    // }
    return result;
};

console.log(majorityElement([3, 2, 3]));
