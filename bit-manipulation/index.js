// NOTES:- https://www.notion.so/Bit-Manipulation-33be1a7b4e6380858ed3f20bd687d15e

function decimalToBinary(number) {
    let str = "";
    while (number != 1) {
        str = str.concat(number % 2);
        number = Math.trunc(number / 2);
    }

    // console.log(str.concat(1));
    return str.concat(1);
}

function binaryToDecimal(binary) {
    res = 0;
    console.log(binary);

    for (let i = binary.length - 1; i >= 0; i--) {
        if (binary[i] == 1) {
            // console.log(binary[i], i);
            res += 2 ** i;
        }
    }
    console.log(res);
}

binaryToDecimal(decimalToBinary("99"));
