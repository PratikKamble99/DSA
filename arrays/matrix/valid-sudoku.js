var isValidSudoku = function (board) {
    // Check in current row if value present
    // Check in current col if value present
    // check in current 3X3 sqaure if value present

    // const rows = new Set()
    // const cols = new Set()
    const sqaure = new Set(); // KEY is r/3, c/3 which is current outer cell
    const rows = Array.from({ length: 9 }).map((x) => new Set());
    const cols = Array.from({ length: 9 }).map((x) => new Set());

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board.length; c++) {
            if (board[r][c] == ".") continue;

            // if( (rows[r] && rows[r].includes(board[r][c]) )|| // check in row
            //     (cols[c] && cols[c].includes(board[r][c])) || // check in current col
            //     ( sqaure[`${r/3},${c/3}`] && sqaure[`${r/3},${c/3}`].includes(board[r][c])) // check in current 3X3 sqaure
            // ) return false

            if (
                (rows[r] && rows[r].has(board[r][c])) || // check in row
                (cols[c] && cols[c].has(board[r][c])) || // check in current col
                (sqaure[`${r / 3},${c / 3}`] &&
                    sqaure[`${r / 3},${c / 3}`].includes(board[r][c])) // check in current 3X3 sqaure
            )
                return false;

            // rows[r] = [...rows[r]||[], board[r][c]]
            // cols[c] = [...cols[c]||[], board[r][c]]
            rows[r].add(board[r][c]);
            cols[c].add(board[r][c]);
            sqaure[`${Math.trunc(r / 3)},${Math.trunc(c / 3)}`] = [
                ...(sqaure[`${Math.trunc(r / 3)},${Math.trunc(c / 3)}`] || []),
                board[r][c],
            ];
        }
    }
    return true;
};

isValidSudoku([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
]);
