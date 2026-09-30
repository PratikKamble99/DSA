/* 
    3 Sum : Find triplets that add up to a zero
    Problem Statement: Given an array of N integers, your task is to find unique triplets that add up to give a sum of zero. In short, you need to return an array of all the unique triplets [arr[a], arr[b], arr[c]] such that i!=j, j!=k, k!=i, and their sum is equal to zero.

    Example 1:
        Input:
        nums = [-1,0,1,2,-1,-4]

        Output:
        [[-1,-1,2],[-1,0,1]]
        Explanation:
            Out of all possible unique triplets possible, [-1,-1,2] and [-1,0,1] satisfy the condition of 
            summing up to zero with i!=j!=k

        NOTE: Same indexes element in one triplet must not in another triplet which form by same indexes elements.
*/

var threeSumBrute = function (nums) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    const validArr = [nums[i], nums[j], nums[k]];
                    validArr.sort((a, b) => a - b);
                    set.add(validArr.join(","));
                }
            }
        }
    }
    console.log(Array.from(set).map((ele) => ele.split(",").map(Number)));
    return Array.from(Array.from(set).map((ele) => ele.split(",").map(Number)));
};

var threeSumBetter = function (nums) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
        const tempSet = new Set();
        for (let j = i + 1; j < nums.length; j++) {
            // K is third number in Triplet
            const k = -(nums[i] + nums[j]);
            if (tempSet.has(k)) {
                const validArr = [nums[i], nums[j], k];
                validArr.sort((a, b) => a - b);
                set.add(validArr.join(","));
            }
            tempSet.add(nums[j]);
            // WE HAVE ELIMINATE THIS
            // for (let k = j + 1; k < nums.length; k++) {
            //     // console.log(i, j, k, "i, j, k");
            //     if (nums[i] + nums[j] + nums[k] == 0) {
            //         const validArr = [nums[i], nums[j], nums[k]];
            //         validArr.sort((a, b) => a - b);
            //         set.add(validArr.join(","));
            //     }
            // }
        }
    }
    return Array.from(Array.from(set).map((ele) => ele.split(",").map(Number)));
};

function threeSumBest(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < sorted.length - 2; i++) {
        // after sorting check first number
        if (sorted[i] > 0) break;

        // skip duplicate numbers
        if (i > 0 && sorted[i] === sorted[i - 1]) continue;

        let left = i + 1;
        let right = sorted.length - 1;

        while (left < right) {
            const sum = sorted[left] + sorted[right] + sorted[i];

            if (sum === 0) {
                result.push([sorted[i], sorted[left], sorted[right]]);

                // if next left if same as current left skip next lrft numbers
                while (left < right && sorted[left] === sorted[left + 1])
                    left++;
                // if prev right if same as current right skip next prev right numbers
                while (left < right && sorted[right] === sorted[right - 1])
                    right--;

                left++;
                right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}

const arr = [-1, 0, 1, 2, -1, -4];
// threeSumBetter(arr);
threeSumBest(arr);
