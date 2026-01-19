function longestSubarrayWithSumBrute(nums, s) {
    let maxSub = [];
    let max = 0;
    let maxLen = 0;
    for (let i = 0; i < nums.length; i++) {
        let sum = 0;

        let sub = [];
        let len = 0;
        for (let j = i; j < nums.length; j++) {
            sum += nums[j];
            sub.push(nums[j]);
            len++;
            if (max <= sum && sum == s && maxLen <= len) {
                max = sum;
                maxSub = sub;
                maxLen = len;
                break;
            }
        }
    }

    console.log(max, maxSub, maxLen);
}

longestSubarrayWithSumBrute([1, 2, 3, 1, 1, 1, 1, 2, 4], 6);

// Longest subarray with given sum K(positives)

function longestSubarrayWithSumK(arr, k) {
    let maxLen = 0;

    for (let i = 0; i < arr.length; i++) {
        let sum = arr[i];

        for (let j = i + 1; j < arr.length; j++) {
            sum += arr[j];
            if (sum == k) {
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }
    console.log(maxLen);
}

// Using Hashmap and prefix sum

function solution(arr, k) {
    const hashMap = {};

    let maxLength = 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        // calculate prefix sum
        sum += arr[i];

        // if it matched then update max length
        if (sum === k) {
            maxLength = Math.max(maxLength, i + 1);
        }

        // calculate prev part sum from index
        let rem = sum - k;
        // If rem is present into hashmap means till this index k is present after substraction;
        if (hashMap[rem] > -1) {
            // update max length by current index - last (x-k sum) index
            maxLength = Math.max(maxLength, i - hashMap[rem]);
        }

        // add every sum in prefixsum hash if not last sum is same with current sum ( for 0 number cindition )
        if (sum != Object.keys(hashMap)[Object.keys(hashMap).length - 1])
            hashMap[sum] = i;
    }

    console.log(maxLength);
}

solution([1, 2, 0, 0, 1, 1, 1, 1, 2, 1, 4], 4);
// longestSubarrayWithSumK([1, 2, 3, 4, 1, 1, 1, 1,2, 1, 4], 4)
