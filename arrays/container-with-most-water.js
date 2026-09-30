// Approach 1 - using two for loops - O(n^2)

// Approach 2 - using two pointers - O(n)
function maxArea(height) {
    // Edge cases (write these FIRST, NEW ones please 🙂):
    // 1. if both same height move both
    // 2. if start is smaller move start ++
    // 3. if end is smaller move end--

    let max = 0;
    let start = 0;
    let end = height.length - 1;

    while (start < end) {
        const w = end - start;
        const min_height = Math.min(height[start], height[end]);
        const total_water = w * min_height;

        if (height[start] < height[end]) start++;
        else if (height[start] > height[end]) end--;
        else {
            start++;
            end--;
        }
        max = Math.max(total_water, max);
    }
    return max;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1])); // 1
console.log(maxArea([4, 3, 2, 1, 4])); // 16
console.log(maxArea([1, 2, 1])); // 2
console.log(maxArea([0, 0, 0])); // 0
