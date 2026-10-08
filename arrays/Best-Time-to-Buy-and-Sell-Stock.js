function maxProfit(prices) {
    let max = 0;
    for (let i = 0; i < prices.length; i++) {
        for (let j = i; j < prices.length; j++) {
            max = Math.max(max, prices[j] - prices[i]);
        }
    }
    return max;
}

function maxProfit(prices) {
    let max = 0;
    let min = prices[0];

    for (let price of prices) {
        min = Math.min(min, price);
        max = Math.max(max, price - min);
    }

    return max;
}

function maxProfit(prices) {
    let max = 0;
    let left = 0;
    let right = left + 1;

    while (right < prices.length) {
        if (prices[left] < prices[right]) {
            max = Math.max(max, prices[right] - prices[left]);
        } else {
            left = right;
        }
        right++;
    }

    return max;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1])); // 0
console.log(maxProfit([5])); // 0
console.log(maxProfit([2, 4, 1])); // 2
console.log(maxProfit([3, 3, 3])); // 0
console.log(maxProfit([2, 1, 2, 1, 0, 1, 2])); // 2
console.log(maxProfit([2, 5, 1, 6])); // 6
