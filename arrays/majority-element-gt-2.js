// LEETCODE:- https://leetcode.com/problems/majority-element/submissions/1734830719/

function majorityElement(nums) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) map.set(nums[i], 1);
        else map.set(nums[i], map.get(nums[i]) + 1);
    }

    let maxKey = -1;
    map.forEach((value, key) => {
        if (value > Math.floor(nums.length / 2)) return (maxKey = key);
    });
    return maxKey;
}

const nums = [2, 2, 1, 1, 1, 2, 2];

console.log(majorityElement(nums));
