// You are given an array of integers nums, there is a sliding window of size k which is moving from
// the very left of the array to the very right. You can only see the k numbers in the window.
// Each time the sliding window moves right by one position.

// Return the max sliding window.

// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]

function slidingindow(array, k) {
  const newArray = [];
  // for (let i = 0; i <= array.length - k; i++) {
  for (let i = 0; i <= array.length - k; i++) {
    // const tempArray = []
    // for (let j = 0; j < k; j++) {
    // tempArray.push(array.slice(i, k + i)[j])
    // }
    // console.log(array.slice(i, k + i))
    // newArray.push(array.slice(i, k + i).sort((a, b) => b - a)[0])
    newArray.push(Math.max(...array.slice(i, k + i)));
  }

  return newArray;
}

// DOUBLY ENDED QUEUE:- queue in which we can insert and remove element from both side
// (not used above: the solution above is brute force O(n*k); a monotonic deque gives O(n))

console.log(slidingindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
