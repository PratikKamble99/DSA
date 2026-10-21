const nums = [11, 20, -12, -5, 1, 3, 4, 8];

/* 
Idea is
One half around mid is always sorted.
If the left part is sorted, check if target is in that left range:
yes -> search left, no -> discard the left half.
Otherwise the right part is sorted, so do the same check on the right range.
*/
function solution(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.trunc((left + right) / 2);
    if (nums[mid] == target) return mid;

    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
  }
  return -1;
}

console.log(solution(nums, -12));
