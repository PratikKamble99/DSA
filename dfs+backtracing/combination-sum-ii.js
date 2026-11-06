var combinationSum2 = function (candidates, target) {
    const pairs = [];
    candidates.sort((a, b) => a - b);
    // [1, 1, 2, 5, 6, 7, 10]

    function backtrack(curr, curPos, target) {
        // If sum exact same
        if (target == 0) {
            pairs.push([...curr]);
            return;
        }

        // If sum greater
        if (target <= 0) {
            console.log("less");
            return;
        }

        let prev = -1;
        for (let i = curPos; i < candidates.length; i++) {
            if (candidates[i] == prev) continue;
            curr.push(candidates[i]);
            backtrack(curr, i + 1, target - candidates[i]);
            curr.pop();
            prev = candidates[i];
        }
    }
    backtrack([], 0, target);
    return pairs;
};

const candidates = [10, 1, 2, 7, 6, 1, 5];
const target = 8;
combinationSum2(candidates, target);
