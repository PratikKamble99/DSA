/* 
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.
Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.
*/

var change = function (amount, coins) {
    const dp = Array.from({ length: amount + 1 }).fill(0);
    dp[0] = 1;

    for (let coin of coins) {
        for (let amt = coin; amt <= amount; amt++) {
            dp[amt] += dp[amt - coin];
        }
    }
    return dp[amount];
};
