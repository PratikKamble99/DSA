/* 
    Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.
    You must do it in place.

    Input: matrix=[[1,1,1],[1,0,1],[1,1,1]]
    Output: [[1,0,1],[0,0,0],[1,0,1]]
    Explanation: Since matrix[2][2]=0 Therfore the 2nd column and 2nd row wil be set to 0.

    Input: matrix=[[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    Output:[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    Explanation:Since matrix[0][0]=0 and matrix[0][3]=0 Therefore 1st row, 1st column and 4th column will be set to 0

*/

// O(n*m*(n+m)) time as O(n*m) * O(n+m) + O(n*m), O(1) space
var setZeroesBrute = function (matrix) {
  const n = matrix.length; // ROW
  const m = matrix[0].length; // column

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == 0) {
        markRow(matrix, m, i);
        markColumn(matrix, n, j);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == "-") {
        matrix[i][j] = 0;
      }
    }
  }

  console.log(matrix);
};

function markRow(matrix, m, i) {
  for (let j = 0; j < m; j++) {
    if (matrix[i][j] !== 0) matrix[i][j] = "-";
  }
}
function markColumn(matrix, n, j) {
  for (let i = 0; i < n; i++) {
    if (matrix[i][j] !== 0) matrix[i][j] = "-";
  }
}

// O(n*m) time and O(n + m) space
var setZeroesBetter = function (matrix) {
  const n = matrix.length; // ROW
  const m = matrix[0].length; // column
  const rows = Array.from({ length: n }).fill(0);
  const cols = Array.from({ length: m }).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] == 0) {
        rows[i] = 1;
        cols[j] = 1;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i] == 1 || cols[j] == 1) {
        matrix[i][j] = 0;
      }
    }
  }

  console.log(matrix);
};

// O(k*n*m) time (full grid walk per zero) and O(k) space where k is number of zeros in the matrix
var setZeroesWithHash = function (matrix) {
  const hashMap = new Map();
  const n = matrix[0].length;
  const m = matrix.length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == 0) {
        hashMap.set(i + "," + j, 0);
      }
    }
  }

  console.log(hashMap);

  hashMap.keys().forEach((key) => {
    const [row, col] = key.split(",").map(Number);
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (row == i) {
          matrix[i][j] = 0;
        }
        if (col == j) {
          matrix[i][j] = 0;
        }
      }
    }
  });

  console.log(matrix);
};

// O(n*m) time and O(1) space
var setZeroesOpt = function (matrix) {
  const n = matrix.length; // ROW
  const m = matrix[0].length; // column

  let ColZero = false;

  // use 0th col and row as marker
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0; // set 0th col index value as zero

        if (c !== 0) matrix[0][c] = 0; // set row index value as zero
        else ColZero = true;
      }
    }
  }

  // Exclude first row and column for marking zero
  for (let r = 1; r < n; r++) {
    for (let c = 1; c < m; c++) {
      if (matrix[0][c] === 0 || matrix[r][0] === 0) {
        matrix[r][c] = 0;
      }
    }
  }

  if (matrix[0][0] === 0) {
    for (let c = 0; c < m; c++) {
      matrix[0][c] = 0;
    }
  }

  // if col0 == 0 is zero them mark entire col as zero
  if (ColZero) {
    for (let r = 0; r < n; r++) {
      matrix[r][0] = 0;
    }
  }
};
