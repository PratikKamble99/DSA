/* 
    Find Quads that add up to a target value
    Problem Statement: Given an array of N integers, your task is to find unique quads that add up to give a target value. In short, you need to return an array of all the unique quadruplets [arr[a], arr[b], arr[c], arr[d]] such that their sum is equal to a given target.

    Note: a, b, c and d are also distinct and lies between 0 to n-1 (both inclusive).
*/

// BRUTE FORCE - Use four loop for nums[i], nums[j], nums[k], nums[l] --> Time Complexity O(n^4)

/*  
    BETTER SOL - 
    Use 3 loop for nums[i], nums[j], nums[k] and 
    nums[l] will be -(nums[i]+nums[j]+nums[k])
    And put between nums[j] and nums[k] into hashset to check num[l]
 */

var fourSum = function (nums, target) {
    const result = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            let l = nums.length - 1;
            let k = j + 1;
            while (k < l) {
                const sum = nums[i] + nums[j] + nums[k] + nums[l];
                if (sum > target) {
                    l--;
                } else if (sum < target) {
                    k++;
                } else {
                    result.push([nums[i], nums[j], nums[k], nums[l]]);
                    k++;
                    l--;
                    while (nums[i] == nums[i + 1]) i++;
                    while (nums[j] == nums[j + 1]) j++;
                    while (k < l && nums[k] == nums[k - 1]) k++;
                    while (k < l && nums[l] == nums[l + 1]) l--;
                }
            }
        }
    }
    console.log(result);
};

// const nums = [1, 0, -1, 0, -2, 2];
const nums = [2, 2, 2, 2, 2];
const target = 8;

fourSum(nums, target);
