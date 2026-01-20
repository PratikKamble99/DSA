/* 
        1
       1 1
      1 2 1
     1 3 3 1
    1 4 6 4 1

*/

/* 
    Problem 1 - Find element at Nth row and c column
    Eg. find at I/P N=5, c=3 --> O/P = 6

    For solving this problem you have to use nCr formula ie. 
    
    nCr = n!/r!*(n-r)!

    10C2 = 10*9*8*7*6*5*4*3*2*1/2*1*(10-2)!
    10C2 = 10*9*8*7*6*5*4*3*2*1/2*1*(8*7*6*5*4*3*2*1)

    On next step you can see 8 to 1 is same in Numerator and denominator so you can remove that
    Eg.- 8*7*6*5*4*3*2*1 present in both side
    10C2 = 10*9/2*1*

    So From this we understand that we have to run loop from only for r times. to get result

    Time Complexity: O(r)
*/

function problem_1(n, c) {
    let res = 1;
    for (let i = 0; i < c; i++) {
        res *= n - i;
        console.log(n - i, i + 1, res);
        res /= i + 1;
    }
    console.log(res);
}
// problem_1(5, 3);

/* 
    Problem_2: Find Nth row from pascals triangle

    you can solve using problem 1 formula on every index but It will take time O(n*r)

    So here other approach with O(n)
    if n = 5 --> O/P = 1, 4, 6, 4, 1

    IE: for above n, every time 
    ans = 1
    at Index 0 = 1
    at Index 1 = ans * (n-i) -> (5-1)/1 
    at Index 2 = ans * (5-2)/2 
    at Index 3 = ans * (5-3)/3 
    at Index 4 = ans * (5-4)/4
*/

function problem_2(n) {
    let ans = 1;
    const res = [];

    for (let i = 1; i <= n; i++) {
        // console.log(ans, "ans");
        res.push(ans);
        ans = (ans * (n - i)) / i;
    }
    return res;
}

problem_2(6);

/* 
    Problem_3: Print pascals triangle
*/

/* 
    Using problem_2 solution.
    Steps:
        1. calculate entire row 
        2. then push into result
*/
function problem_3_1(n) {
    const result = [];

    // start from row 1
    for (let i = 1; i <= n; i++) {
        const row = problem_2(i);
        result.push(row);
    }

    console.log(result);
}

problem_3_1(6);

function problem_3_2(n) {
    const result = [];
    if (n == 0) return result;

    const firstRow = [];
    firstRow.push(1);
    result.push(firstRow);

    // return 0th row because n=1
    if (n == 1) return result;

    // start from row 1
    for (let i = 1; i < n; i++) {
        const nthRow = [];
        const prevRow = result[i - 1]; // fetch prev row data
        nthRow.push(1);

        // calculate middle element based on prev row and indexes
        for (let j = 0; j < i - 1; j++) {
            nthRow.push(prevRow[j] + prevRow[j + 1]);
        }

        nthRow.push(1);
        result.push(nthRow);
    }

    return result;
}
// console.log(problem_3_2(6));
