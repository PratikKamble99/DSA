def letterCombinations(digits: str) -> list[str]:
        res = []
        phoneMap = {
            '2': "abc",
            '3': "def",
            '4': "ghi",
            '5': "jkl",
            '6': "mno",
            '7': "pqrs",
            '8': "tuv",
            '9': "wxyz"
        }

        def backtrack(i, currstr):
            if len(currstr) == len(digits):
                res.append(currstr)
                return 
            
            for char in phoneMap[digits[i]]:
                backtrack(i+1, currstr+char)
            
        if digits: 
            backtrack(0, '')
        
        return res

print(letterCombinations('23'))