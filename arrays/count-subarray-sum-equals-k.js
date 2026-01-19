/* 
    Count Subarray sum Equals K
    Problem Statement: Given an array of integers and an integer k, return the total number of subarrays whose sum equals k. A subarray is a contiguous non-empty sequence of elements within an array.

    Examples
        Input : N = 4, array[] = {3, 1, 2, 4}, k = 6
        Output: 2
        Explanation: The subarrays that sum up to 6 are [3, 1, 2] and [2, 4].

        Input: N = 3, array[] = {1,2,3}, k = 3
        Output: 2
        Explanation: The subarrays that sum up to 3 are [1, 2], and [3].
*/

function countSubarraySumEqualsKBrute(arr, k) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        // const subArr = [];
        let sum = 0;
        for (let j = i; j < arr.length; j++) {
            //   subArr.push(arr[j]);
            sum += arr[j];
            // if (subArr.reduce((sum, curr) => sum + curr, 0) == k) count += 1;
            if (sum == k) count += 1;
        }
    }

    console.log(count);
}

function countSubarraySumEqualsKOpt(arr, k) {
    const hashMap = {};
    hashMap[0] = 1;

    let count = 0;
    let preSum = 0;
    for (let i = 0; i < arr.length; i++) {
        preSum += arr[i];

        let rem = preSum - k;
        count += hashMap[rem] || 0;

        hashMap[preSum] = hashMap[preSum] + 1 || 1;
    }
    return count;
}

const arr = [0, 0, 0, 0, 0, 0, 0];
const arr2 = [1, 2, 1, 2, 1];

countSubarraySumEqualsKOpt(arr, 0);
