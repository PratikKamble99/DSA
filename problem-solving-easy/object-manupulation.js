const obj = {
    a_b_c: 1,
    a_b_d: 2,
};

//  Output - a: { b: { c: 1, d: 2 } }

function solution(obj) {
    let result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const keys = key.split("_");
        let newRes = result;

        keys.slice(0, keys.length - 1).forEach((_key) => {
            if (!newRes[_key]) newRes[_key] = {};
            newRes = newRes[_key];
        });

        newRes[keys[keys.length - 1]] = value;
    });

    console.log(result);
}

solution(obj);
