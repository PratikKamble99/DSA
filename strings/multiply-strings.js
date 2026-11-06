/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if ([num1, num2].includes("0")) return "0";

    const res = Array.from({ length: num1.length + num2.length }).fill(0);

    for (let i = num2.length - 1; i >= 0; i--) {
        // console.log('------------------------')
        for (let j = num1.length - 1; j >= 0; j--) {
            const currInx = num2.length - 1 - i + (num1.length - 1 - j);
            const carryInx = num2.length - 1 - i + (num1.length - 1 - j) + 1;
            const result = num1[j] * num2[i] + res[currInx];
            // console.log(num1[j],'*', num2[i], ',result', result,   ',carry', Math.trunc(result / 10), ",last diigit", result % 10, ',curr index', currInx , ',Carry index', carryInx, ',cur value', res[currInx])

            res[currInx] = result % 10;
            if (Math.trunc(result / 10) > 0)
                res[carryInx] += Math.trunc(result / 10);
        }
    }
    res.reverse();
    let i = 0;
    while (res[i] == "0") {
        i++;
    }
    return res.slice(i).join("");
};

// multiply('999', '999')
// multiply('123', '4507')
multiply("2", "3");
