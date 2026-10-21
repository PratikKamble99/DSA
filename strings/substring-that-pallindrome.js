// Find all distinct substrings that are palindromes.

var countSubstrings = function (s) {
  const result = [];

    for (let i = 0; i < s.length; i++) {
        let sub = ''

        for (let j = i; j < s.length; j++) {
            sub+=s[j]

            if(sub == sub.split('').reverse().join('') && !result.includes(sub)) 
              result.push(sub)   
        }
        
    }
    return result
};
