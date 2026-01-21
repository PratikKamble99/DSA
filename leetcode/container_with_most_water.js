var maxArea = function (heights) {
    let maxWater = 0;

    for (let i = 0; i < heights.length; i++) {
        let waterInCurrent = 0;
        for (let j = i + 1; j < heights.length; j++) {
            const min = Math.min(heights[i], heights[j]);
            waterInCurrent = min * (j - i);
            maxWater = Math.max(waterInCurrent, maxWater);
        }
        waterInCurrent = 0;
    }
    return maxWater;
};

// maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);

var maxAreaOptimal = function (heights) {
    let maxWater = 0;
    let left = 0;
    let right = heights.length - 1;

    while (left < right) {
        const min = Math.min(heights[left], heights[right]);
        maxWater = Math.max(maxWater, min * (right - left));
        if (heights[left] < heights[right]) left++;
        else right--;
    }
    // console.log(maxWater);
    return maxWater;
};

maxAreaOptimal([1, 8, 6, 2, 5, 4, 8, 3, 7]);
