/* 
    Length of the longest subarray with zero Sum
    Problem Statement: Given an array containing both positive and negative integers, we have to find the length of the longest subarray with the sum of all elements equal to zero.
    Example 1:
        Input: N = 6, array[] = {9, -3, 3, -1, 6, -5}  
        Result: 5  
        Explanation:
            The following subarrays sum to zero:
            - {-3, 3}
            - {-1, 6, -5}
            - {-3, 3, -1, 6, -5}
            The length of the longest subarray with sum zero is 5.
*/

function solution(arr) {
    let maxLen = 0;
    for (let i = 0; i < arr.length; i++) {
        // const subArr = [];
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            // subArr.push(arr[j]);
            // const sum = subArr.reduce((acc, curr) => curr + acc, 0);
            sum += arr[j];

            if (sum == 0) {
                // maxLen = Math.max(subArr.length, maxLen);
                maxLen = Math.max(j - i + 1, maxLen);
            }
        }
    }
    console.log(maxLen);
}

function solutionOpt(arr) {
    const hashMap = new Map();
    let maxLen = 0;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];

        if (sum != 0 && !hashMap.has(sum)) {
            hashMap.set(sum, i);
        } else if (hashMap.has(sum)) {
            maxLen = Math.max(i - hashMap.get(sum), maxLen);
        } else {
            maxLen = Math.max(i - 0, maxLen) + 1;
        }
    }
    console.log(maxLen);
}

solutionOpt([6, -2, 2, -8, 1, 7, 4, -10]);
solutionOpt([9, -3, 3, -1, 6, -5]);
solutionOpt([15, -2, 2, -8, 1, 7, 10, 23]);
solutionOpt([1, 2, 3]);
