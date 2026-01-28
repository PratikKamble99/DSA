/* 
    Count the number of subarrays with given xor K
    Problem Statement: Given an array of integers A and an integer B. Find the total number of subarrays having bitwise XOR of all elements equal to k.

    Examples
        Input: A = [4, 2, 2, 6, 4] , k = 6
        Output: 4
        Explanation: The subarrays having XOR of their elements as 6 are  [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], [6]
        
        Input: A = [5, 6, 7, 8, 9], k = 5
        Output: 2
        Explanation: The subarrays having XOR of their elements as 5 are [5] and [5, 6, 7, 8, 9]
*/

function solution(arr, k) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        let xor = 0;
        for (let j = i; j < arr.length; j++) {
            xor = xor ^ arr[j];
            if (xor == k) {
                count += 1;
            }
        }
    }
    console.log(count);
}

function solutionOpt(arr, k) {
    const hashmap = new Map();
    hashmap[0] = 1;

    let count = 0;
    let preXor = 0;
    for (let i = 0; i < arr.length; i++) {
        // calculate pre xor
        preXor = preXor ^ arr[i];
        const x = preXor ^ k;
        // If x is present in hashmap then it must valid subarray
        count += hashmap[x] || 0;
        // if not present so add it into hashmap so you can check later x value
        // If already present then increase count
        hashmap[preXor] = hashmap[preXor] + 1 || 1;
    }
    console.log(count);
}

solution([4, 2, 2, 6, 4], 6);
solution([5, 6, 7, 8, 9], 5);
solutionOpt([4, 2, 2, 6, 4], 6);
solutionOpt([5, 6, 7, 8, 9], 5);
