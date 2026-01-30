/* 
    Merge two Sorted Arrays Without Extra Space
    Problem Statement: Given two sorted integer arrays nums1 and nums2, merge both the arrays into a single array sorted in non-decreasing order.
    The final sorted array should be stored inside the array nums1 and it should be done in-place.
    Array nums1 has a length of m + n, where the first m elements denote the elements of nums1 and rest are 0s whereas nums2 has a length of n.

    Input : nums1 = [-5, -2, 4, 5, 0, 0, 0], nums2 = [-3, 1, 8]
    Output : [-5, -3, -2, 1, 4, 5, 8]
    Explanation : The merged array is: [-5, -3, -2, 1, 4, 5, 8], where [-5, -2, 4, 5] are from nums1 and [-3, 1, 8] are from nums2
*/

function mergeArray(arr1, arr2) {
    const merge = [];
    let start_1 = 0;
    let start_2 = 0;

    while (start_1 <= arr1.length - 1 && start_2 <= arr2.length - 1) {
        if (arr1[start_1] < arr2[start_2]) {
            merge.push(arr1[start_1]);
            start_1++;
        } else {
            merge.push(arr2[start_2]);
            start_2++;
        }
    }

    while (start_1 <= arr1.length - 1) {
        merge.push(arr1[start_1]);
        start_1++;
    }

    while (start_2 <= arr2.length - 1) {
        merge.push(arr2[start_2]);
        start_2++;
    }

    for (let i = 0; i < merge.length; i++) {
        if (i >= arr1.length) {
            let _i = i - arr1.length;
            arr2[_i] = merge[i];
        } else {
            arr1[i] = merge[i];
        }
    }

    console.log(nums1, nums2);
}

function mergeArrayOpt(arr1, arr2) {
    let end = arr1.length - 1;
    let start = 0;

    while (end >= 0 && start <= arr2.length - 1) {
        // CHECK IF SECOND ARRAY FIRST IS SMALLER THAT FIRST ARRAY LAST ELEMENT
        // THEN SWAP AND CHANGE POINTER
        if (arr1[end] > arr2[start]) {
            const temp = arr2[start];
            arr2[start] = arr1[end];
            arr1[end] = temp;

            end--;
            start++;
        } else {
            // MEANS SECOND ARRAY ALL ELEMENTS ARE LARGER THAN FIRST ARRAY
            // SO BREAK
            break;
        }
    }
    // SORT BOTH ARRAYS
    console.log(...arr1.sort((a, b) => a - b), ...arr2.sort((a, b) => a - b));
}

const nums1 = [-5, -2, 0, 0, 0, 4, 5];
const nums2 = [-3, 1, 8];

mergeArrayOpt(nums1, nums2);
