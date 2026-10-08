// max subArray sum from integer array

// input:- [-2, 1, -3, 4, -1, 2, 1, -5, 4] = o/p = 6 => [4, -1, 2, 1]

// input:- [5, 4, -1, 7, 8] = o/p = 23 => [5, 4, -1, 7, 8]

// Appraoach 1
function maxSubArray(nums) {
    let largestSum = nums[0];
    let startI = 0;
    let endI = 0;

    for (let i = 0; i < nums.length; i++) {
        let currentSum = nums[i];

        for (let j = i + 1; j < nums.length; j++) {
            currentSum = currentSum + nums[j];
            if (currentSum > largestSum) {
                startI = i;
                endI = j;
                largestSum = currentSum;
            }
        }
    }
    console.log(largestSum, nums.slice(startI, endI + 1));
}

// Appraoach 2
function maxSubArray2(nums) {
    let sum = 0;
    let largestSum = nums[0];

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (sum > largestSum) largestSum = sum;
        else if (sum < 0) sum = 0;
    }
    console.log(largestSum);
}

maxSubArray2([5, 4, -1, 7, 8]);
maxSubArray2([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
