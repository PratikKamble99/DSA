/* 
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0
*/

var coinChange = function (coins, amount) {
    const dp_array = Array.from({ length: amount + 1 }).fill(Infinity);
    dp_array[0] = 0;

    for (let amt = 1; amt <= amount; amt++) {
        // loop on all coins
        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j];
            // Check if coin in eligible
            if (coin <= amt) {
                // get how much other coins need to made amount
                let need = dp_array[amt - coin] + 1;
                // set least needed coins
                dp_array[amt] = Math.min(dp_array[amt], need);
            }
        }
    }
    return dp_array[amount] == Infinity ? -1 : dp_array[amount];
};
