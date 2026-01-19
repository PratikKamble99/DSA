/* 
    Given an m x n matrix, return all elements of the matrix in spiral order.
    
    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    Output: [1,2,3,6,9,8,7,4,5]
*/

var spiralOrder = function (matrix) {
  const result = [];
  let top = 0;
  let right = matrix[0].length - 1;
  let left = 0;
  let bottom = matrix.length - 1;

  while (top <= bottom && left <= right) {
    // console.log(
    //   `top: ${top}, bottom: ${bottom}, left: ${left}, right: ${right}`
    // );
    // move left to right whle top is constant
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++; // move to down

    // move top to bottom while right is constant
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--; // move to left

    if (top <= bottom) {
      // move to left while bottom is constant
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--; // move to bottom up
    }

    console.log(result);

    if (left <= right) {
      // move to up while left is constant
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++; // move to bottom up
    }
  }
};

let matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];

console.log(spiralOrder(matrix));
