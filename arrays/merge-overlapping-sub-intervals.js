/* 
    Merge Overlapping Sub-intervals
    Problem Statement: Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.

    Examples
        Input : intervals=[[1,3],[2,6],[8,10],[15,18]]
        Output : [[1,6],[8,10],[15,18]]
        Explanation : Since intervals [1,3] and [2,6] are overlapping we can merge them to form [1,6] intervals.
        
        Input : [[1,4],[4,5]]
        Output :  [[1,5]]
        Explanation :  Since intervals [1,4] and [4,5] are overlapping we can merge them to form [1,5].
*/

function mergeIntervals(intervals) {
    const result = [];
    intervals.sort((a, b) => a[0] - b[0]);
    // console.log(intervals);
    for (let i = 0; i < intervals.length; i++) {
        // GET CURRENT START AND END
        let start = intervals[i][0];
        let end = intervals[i][1];

        // CHECK IF CURRENT END IS OVERLAPPING WITH PREV INTERVAL
        if (result.length != 0 && result[result.length - 1][1] >= end) {
            continue;
        }
        // CHECK NEXT INTERVAL IF OVERLAPPING WITH CURRENT INTERVAL
        for (let j = i + 1; j < intervals.length; j++) {
            if (intervals[j][0] <= end) {
                end = Math.max(end, intervals[j][1]);
            } else {
                break;
            }
        }
        result.push([start, end]);
    }
    console.log(result);
}

function mergeIntervalsOpt(intervals) {
    const result = [];
    intervals.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < intervals.length; i++) {
        // CHECK IF RESULT ARRAY IS EMPTY
        // OR LAST ELEMENT IN RESULT IS LESS THAT CURRENT ELEMENT FIRST INDEX
        if (
            result.length == 0 ||
            intervals[i][0] > result[result.length - 1][1]
        ) {
            result.push(intervals[i]);
        } else {
            result[result.length - 1][1] = Math.max(
                result[result.length - 1][1],
                intervals[i][1],
            );
        }
    }
    console.log(result);
}

const intervals = [
    [1, 3],
    [2, 6],
    [8, 10],
    [9, 11],
    [2, 4],
    [8, 9],
    [15, 18],
    [16, 17],
];
mergeIntervalsOpt(intervals);
