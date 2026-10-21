/* 
CASES
1. if Array length is ODD - median = array[mid] --> Middle element
2. array length is EVEN - median = (array[mid]+array[mid-1])/2 --> Middle two elements sum / 2
*/

function findMedianSortedArrays(nums1, nums2) {
    const mergedArray = [...nums1, ...nums2].sort((a, b) => a - b);
    if (mergedArray.length % 2 == 1) {
        return mergedArray[Math.round(mergedArray.length / 2) - 1];
    }

    const mid = mergedArray.length / 2;
    return (mergedArray[mid] + mergedArray[mid - 1]) / 2;
}

function findMedianSortedArrays(nums1, nums2) {
    let start1 = 0;
    let start2 = 0;

    const n = nums1.length + nums2.length;
    const mid = Math.floor(n / 2);

    let prev = 0;
    let curr = 0;

    for (let i = 0; i <= mid; i++) {
        prev = curr;
        // check valid start1++ case
        // 1. if start1 < nums1.length -> start1++ &&
        // 2. if start2 > nums2.length -> start1++ ||
        // 3. if nums1[start1] < nums2[start2] -> start1++
        if (
            (start1 < nums1.length && start2 >= nums2.length) ||
            nums1[start1] < nums2[start2]
        ) {
            curr = nums1[start1];
            start1++;
        } else {
            curr = nums2[start2];
            start2++;
        }
    }

    if (n % 2 == 1) {
        return curr;
    }
    return (curr + prev) / 2;
}

findMedianSortedArrays([1, 3], [2]);
findMedianSortedArrays([1, 2], [3, 4]);
