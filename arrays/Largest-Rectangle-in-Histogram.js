function largestRectangleArea(heights) {
    let best = 0;

    for (let i = 0; i < heights.length; i++) {
        let minHeight = Infinity;
        for (let j = i; j < heights.length; j++) {
            minHeight = Math.min(minHeight, heights[j]);
            best = Math.max(best, minHeight * (j - i + 1));
        }
    }
    return best;
}

function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        let start = i;
        while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
            // console.log('stack', stack)
            const [idx, height] = stack.pop();
            const area = height * (i - idx);
            maxArea = Math.max(area, maxArea);
            // console.log('pop currentidx:', i, ' index:', idx, 'height:', height)
            // console.log('area', area)

            start = idx;
        }
        // console.log(i,'-->', start)
        stack.push([start, heights[i]]);
    }

    // console.log(stack)
    while (stack.length > 0) {
        const [idx, height] = stack.pop();
        const area = (heights.length - idx) * height;
        maxArea = Math.max(area, maxArea);
    }

    return maxArea;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleArea([2, 4])); // 4
console.log(largestRectangleArea([5])); // 5
console.log(largestRectangleArea([3, 3, 3])); // 9
console.log(largestRectangleArea([1, 2, 3, 4, 5])); // 9
console.log(largestRectangleArea([5, 4, 3, 2, 1])); // 9
console.log(largestRectangleArea([2, 1, 2])); // 3
