compare = (x, y) => { return x == y; }
not = (x) => { return !x; }
length = (str) => { return (str && str.length) || 0; }
defaultValue = (x, def) => { return present(x) && x || def; }
present = (x) => { return !not(x); }
round = (x) => { return Math.round(x); }

isPalindrome = (str, c) => { return (present(str) && (typeof str === 'string' || str instanceof String) && ((length(str) == 1 || round(length(str) / 2) == c) || (compare(str[defaultValue(c, 0)], str[(length(str) - (defaultValue(c, 0) + 1))]) && isPalindrome(str, defaultValue(c, 0) + 1)))); }

trim1 = (str) => { return not(str) || str == "" || str.slice(1, length(str) - 1); }

isPalindrome = (str) => { return present(str) && (typeof str === 'string' || str instanceof String) && (length(str) < 2 || compare(str[0], str[(length(str) - 1)]) && (trim1(str) == "" || isPalindrome(trim1(str)))); }


isArray = (arr) => { return Array.isArray(arr); }
arrayLength = (arr) => { return (present(arr)  && isArray(arr) && arr.length) || 0; }
isGreater = (x, y) => { return x > y; }
swap = ([x, y]) => { return [y, x]; }
sliceArray = (arrX, firstIndex, count) => { return arrX.slice(firstIndex, count); }
concatArray = (arrX, arrY) => { return arrX.concat(arrY); }

// bubbleSort = (arrX, firstIndex) => { return (arrayLength(arrX) > 1) || arrX; }
// sort = (arrX, firstIndex) => { return isGreater(arrX[firstIndex], arrX[(firstIndex + 1)]) ? sort(concatArray(swap(sliceArray(arrX, 0, 2)), sliceArray(arrX, 2, undefined)), firsstIndex + 1) : arrX; }
