const adj_mat = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
];

const visited_rows = new Array(adj_mat.length + 1).fill(false);
const ans = [];
function bfs(start) {
    console.log("-----------------");
    console.log("CURRENT_NODE", start);
    console.log("VISITED", visited_rows);
    const queue = [start];
    visited_rows[start] = true;
    ans.push(start);

    while (queue.length) {
        const row = queue.shift();
        console.log("current row", start);

        for (let i = 0; i < adj_mat.length + 1; i++) {
            if (adj_mat[row][i] == 1 && !visited_rows[i]) {
                console.log("GOING TO", i, row);
                visited_rows[i] = true;
                bfs(i);
            }
        }
    }
}

bfs(1);

console.log(ans);
