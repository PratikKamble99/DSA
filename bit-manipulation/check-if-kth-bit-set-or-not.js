// Check if Kth Bit is Set or not

// Using left shift
function checkKthBit(n, k) {
    /* 
        (1 << 2) --> 0100

        1101
      &
        0100
       ------
        0100 --> if this is greater than 0 means set
                 else unset

    */
    if (n & (1 << k)) {
        console.log(true);
    } else {
        console.log(false);
    }
}

// Using right shift
function checkithBitSetOrNot(n, k) {
    /* 
        n >> k --> 13 >> 2 = 0011

        0011
      &
        0001
       ------
        0001 --> if this is == 0 means unset
                 else set

    */
    if (((n >> k) & 1) == 0) {
        console.log(false);
    } else {
        console.log(true);
    }
}

checkithBitSetOrNot(13, 2);
