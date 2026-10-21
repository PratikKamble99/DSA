// Find missing from array
// Given an array nums containing n distinct numbers in the range [0, n],
// return the only number in the range that is missing from the array.

// Using two for loops
// O(n) = n2

function findMissingBrute(nums) {
  const n = nums.length;

  // loop through 0 to n range numsay
  for (let i = 0; i <= n; i++) {
    let flag = 0;
    // scan all n array items (indexes 0 to n-1)
    for (let j = 0; j < n; j++) {
      if (i == nums[j]) {
        flag = 1;
        break;
      }
    }

    if (flag == 0) {
      return i;
    }
  }
}

// const arr = [0, 1, 3];
// const arr = [9, 6, 4, 2, 3, 5, 7, 0, 1];
const arr = [0, 1];
// console.log(findMissingBrute(arr));

// Using hashing
// O(n) = 2n
function findMissingBetter(nums) {
  const n = nums.length;

  const hash = [];
  for (let i = 0; i < n; i++) {
    hash[nums[i]] = 1
  }

  for(let i = 0; i<=n; i++){
    if(!hash[i]){
        return i
    }
  }
}

// console.log(findMissingBetter(arr));

// using sum
// O(n) = n
function findMissingOpt1(nums) {
    const n = nums.length
    const sum = (n*(n+1))/2

    let arrSum = 0;
    for(let i = 0; i<n; i++){
        arrSum = arrSum+nums[i]
    }
    return sum-arrSum
}

// console.log(findMissingOpt1(arr))

// using xor
// O(n) = n
function findMissingOpt2(nums) {
    const n = nums.length
    let xor1 = 0;
    let xor2 = 0;

    for(let i = 0; i<n; i++){
        xor2 = xor2 ^ nums[i];
        xor1 = xor1 ^ i+1
    }

    return xor1 ^ xor2
}

console.log(findMissingOpt2(arr))
