// https://leetcode.com/problems/single-number/description/

// Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
// You must implement a solution with a linear runtime complexity and use only constant extra space.

const nums = [4,1,2,1,2, 4, 5]

// using map
function numberAppearOnce(nums){
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        if(map.get(nums[i])){
            map.set(nums[i], map.get(nums[i])+1)
        }else{
            map.set(nums[i], 1)
        }
    }

    let num;

    map.forEach((value, key) => {
        if(value == 1) {
            num = key
        }
    });

    return num
}

console.log(numberAppearOnce(nums))

// using xor
function numberAppearOnceOpt(nums){
    let xor = 0

    for (let i = 0; i < nums.length; i++) {
        xor^= nums[i] // xor of two numbers = 2 ^ 2 = 0 ie --> 2 in binary 10 so xor of two binary is if 1^1 = 0, 1^0 = 1, 0^1 = 1, 0^0 = 0
    }
    return xor
}

console.log(numberAppearOnceOpt(nums))
