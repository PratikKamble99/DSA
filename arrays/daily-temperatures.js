function dailyTemperatures(temperatures) {
    const op = new Array(temperatures.length).fill(0);
    for (let i = 0; i < temperatures.length; i++) {
        for (let j = i + 1; j < temperatures.length; j++) {
            if (temperatures[i] < temperatures[j]) {
                op[i] = j - i;
                break;
            }
        }
    }
    return op;
}

function dailyTemperatures(temperatures) {
    const stack = [];
    const results = [];

    for (let i = 0; i < temperatures.length; i++) {
        const curr = temperatures[i];

        // check top of stack index value is < current
        while (temperatures[stack[stack.length - 1]] < curr) {
            // calculate days
            const prev_day = stack.pop();
            const diff = i - prev_day;
            // add diff at top index
            results[prev_day] = diff;
        }
        stack.push(i);
    }
    // add 0 to all not next warmer day
    while (stack.length > 0) {
        results[stack.pop()] = 0;
    }
    return results;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30, 40, 50, 60])); // [1,1,1,0]
console.log(dailyTemperatures([60, 50, 40, 30])); // [0,0,0,0]
console.log(dailyTemperatures([50, 50, 50])); // [0,0,0]
console.log(dailyTemperatures([70])); // [0]
console.log(dailyTemperatures([55, 38, 53, 81, 61, 93, 97, 32, 43, 78]));
// [3,1,1,2,1,1,0,1,1,0]
