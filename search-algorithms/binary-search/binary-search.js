// binary search is mostly used when data is in sorted manner. It keeps a range (start, middle, end) and halves it each step (Divide and conquer approach)

// Ques 2: Implement Binary Search in JavaScript
// Given an array of integers nums which is sorted in ascending order, and an integer target,
// Write a function to search target in nums. If target exists, then return its index.
// Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.

// Input: nums = [-1,0,3,5,9,12], target = 9  ----->>>>>  Output:  4
// Input: nums = [-1,0,3,5,9,12], target = 2  ----->>>>>  Output: -1

/* 
  WHERE TO USE
  1. Space Properties: Problems where the space is sorted, monotonic, bounded.
  2. Function trend: Problems mentioning increasing or decreasing function.
  3. Pick an option: Pick an option from a range to satisfy
  4. Minimum Value: Problems asking to find the minimum value.
  5. Achieve Target: Can you achieve X within Y time/budget/resources
  6. Earliest/Latest Point: Problems asking for earliest or latest time.

*/

// O(log n)
function binarySearch(nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (nums[middle] == target) return middle;
    if (target < nums[middle]) end = middle - 1;
    else start = middle + 1;
  }

  return -1
}

// console.log(binarySearch([-1,0,3,5,9,12], 9))

// using recursion - O(log n) time, O(log n) space for the call stack
function binarySearchRec(nums, target, start, end) {
  if(start > end) return -1

  const middle = Math.trunc((start + end) / 2);
  if (nums[middle] == target) return middle;
  
  if (target < nums[middle]) return binarySearchRec(nums, target, start, middle - 1);
  else return binarySearchRec(nums, target, middle + 1, end);
}

console.log(binarySearchRec([-1,0,3,5,9,12], 0, 0, 5))

