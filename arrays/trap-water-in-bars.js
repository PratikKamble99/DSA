function trap(height) {
    let total_water = 0;

    for (let i = 0; i < height.length; i++) {
        // find left max
        let left_max = 0;
        let right_max = 0;

        left_max = Math.max(left_max, height[i]) || 0;
        for (let j = 0; j < i; j++) {
            left_max = Math.max(height[j], left_max);
        }

        // find right max
        right_max = Math.max(right_max, height[i]);
        for (let k = i; k < height.length; k++) {
            right_max = Math.max(height[k], right_max);
        }

        let water = Math.min(left_max, right_max) - height[i];

        total_water += water;
    }
    return total_water;
}

function trap(height) {
    let total_water = 0;
    const left_maxes = [];
    const right_maxes = [];
    let leftmax = 0;
    let rightmax = 0;

    for (let j = 0; j < height.length; j++) {
        leftmax = Math.max(height[j], leftmax);
        left_maxes[j] = leftmax;
    }

    for (let j = height.length - 1; j >= 0; j--) {
        rightmax = Math.max(height[j], rightmax);
        right_maxes[j] = rightmax;
    }

    for (let i = 0; i < height.length; i++) {
        let water = Math.min(left_maxes[i], right_maxes[i]) - height[i];

        total_water += water;
    }
    return total_water;
}

function trap(height) {
    let total_water = 0;
    let left_max = 0;
    let right_max = 0;
    let left = 0;
    let right = height.length - 1;

    while (left < right) {
        let water = 0;
        left_max = Math.max(height[left], left_max);
        right_max = Math.max(height[right], right_max);

        if (left_max < right_max) {
            water = left_max - height[left];
            left++;
        } else {
            water = right_max - height[right];
            right--;
        }

        total_water += water;
    }
    return total_water;
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
console.log(trap([4, 2, 0, 3, 2, 5])); // 9
console.log(trap([])); // 0
console.log(trap([3, 0, 3])); // 3
console.log(trap([1, 2, 3, 4, 5])); // 0
console.log(trap([5, 4, 3, 2, 1])); // 0
