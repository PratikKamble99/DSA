const add_5 = (a) => a + 5;
const sub_5 = (a) => a - 5;
const mult_5 = (a) => a * 2;

const compose = (...functions) => {
    return (value) => functions.reduceRight((acc, curr) => curr(acc), value);
};

const pipe = (...functions) => {
    return (value) => functions.reduce((acc, curr) => curr(acc), value);
};

const res = compose(add_5, mult_5, sub_5);
console.log(res(5));

const res_2 = pipe(add_5, mult_5, sub_5);
console.log(res_2(5));
