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

var threeSumBest = function (nums) {
    const result = [];

    // SORT ARRAY
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        let j = i + 1;
        let k = nums.length - 1;

        while (j < k) {
            // CALCULATE  SUM
            const sum = nums[j] + nums[k] + nums[i];

            // IF SUM IS GREATER THAN 0 THEN SUM NEED TO BE INCREASE so INCREASE J
            if (sum < 0) {
                j++;
            } else if (sum > 0) {
                // IF SUM IS LESS THAN 0 THEN SUM NEED TO BE DECREASE so REDUCE K
                k--;
            } else {
                // IF SUM IS ZERO THEN ADD INTO RESULT AND J INCREASE BY 1 And REDUCE K BY 1
                result.push([nums[i], nums[j], nums[k]]);
                k--;
                j++;

                // if prev and current j ele is same skip
                while (j < k && nums[j] == nums[j - 1]) j++;
                // if prev and current k ele is same skip
                while (j < k && nums[k] == nums[k + 1]) k--;
            }
        }
    }
    console.log(result);
    return result;
};

const arr = [-1, 0, 1, 2, -1, -4];
// threeSumBetter(arr);
threeSumBest(arr);
