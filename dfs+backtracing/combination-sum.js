var combinationSum = function (candidates, target) {
    const pairs = [];

    function dfs(i, curr, total) {
        if (total == target) {
            pairs.push([...curr]);
            return;
        }

        if (i >= candidates.length || total > target) {
            return;
        }

        // Add current candidate into curr array
        curr.push(candidates[i]);
        dfs(i, curr, total + candidates[i]);
        curr.pop();
        // don't add  current candidate into curr array
        dfs(i + 1, curr, total);
    }

    dfs(0, [], 0);
    return pairs;
};

const candidates = [2, 3, 6, 7];
const target = 7;

combinationSum(candidates, target);
