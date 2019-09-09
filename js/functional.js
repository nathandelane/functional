areEqual = (x, y) => { return x == y; }

isGreater = (x, y) => { return x > y; }

isLess = (x, y) => { return x < y; }

not = (x) => { return !x; }

length = (str) => { return (str && str.length) || 0; }

defaultValue = (x, def) => { return present(x) && x || def; }

present = (x) => { return !not(x); }

round = (x) => { return Math.round(x); }

conditional = (condition, whenTrue, whenFalse) => { return condition ? whenTrue : whenFalse; }

isPalindrome = (str, c) => { return (present(str) && (typeof str === 'string' || str instanceof String) && ((length(str) == 1 || round(length(str) / 2) == c) || (compare(str[defaultValue(c, 0)], str[(length(str) - (defaultValue(c, 0) + 1))]) && isPalindrome(str, defaultValue(c, 0) + 1)))); }

trim1 = (str) => { return not(str) || str == "" || str.slice(1, length(str) - 1); }

isPalindrome = (str) => { return present(str) && (typeof str === 'string' || str instanceof String) && (length(str) < 2 || compare(str[0], str[(length(str) - 1)]) && (trim1(str) == "" || isPalindrome(trim1(str)))); }


isArray = (arr) => { return Array.isArray(arr); }

arrayLength = (arr) => { return (present(arr)  && isArray(arr) && arr.length) || 0; }

swap = ([x, y]) => { return [y, x]; }

sliceArray = (arrX, firstIndex, lastIndex) => { return conditional(arrayLength(arrX) <= lastIndex, arrX, arrX.slice(firstIndex, lastIndex)); }

concatArray = (arrX, arrY) => { return arrX.concat(arrY); }

// bubbleSort = (arrX, firstIndex) => { return (arrayLength(arrX) > 1) || arrX; }
// sort = (arrX, firstIndex) => { return isGreater(arrX[firstIndex], arrX[(firstIndex + 1)]) ? sort(concatArray(swap(sliceArray(arrX, 0, 2)), sliceArray(arrX, 2, undefined)), firsstIndex + 1) : arrX; }

sortPairs = ([x, y]) => { return conditional(isGreater(x, y), swap([x, y]), [x, y]); }

sliceArrayR = (arr, firstIndex, lastIndex) => {return sliceArray(arr, conditional(isGreater(0, firstIndex), 0, firstIndex), conditional(isGreater(lastIndex, arrayLength(arr) - 1) || areEqual(lastIndex, arrayLength(arr)), undefined, lastIndex));}

sort = (arr) => { return conditional((present(arr) && isArray(arr) && arrayLength(arr) > 1), sortPairs(arr), arr); }

sortByPairs = (arr, p) => { return conditional(arrayLength(arr) >= p, arr, sortByPairs(concatArray(sliceArray(arr, 0, p), sortPairs(sliceArray(arr, p, 2))), p + 1));  }

sortByPairs = (arr, p, acc) => {
  return conditional(
    p < (arrayLength(arr) - 1),
    sortByPairs(
      arr, 
      (p + 1), 
      concatArray(
        defaultValue(acc, []),
        sortPairs(sliceArray(arr, p, p + 2))[0]
      )
    ),
    acc
  );
}

// sorting (array, pointer, accumulator):
  // 0. if accumulator is null initialize it as []
  // 1. if array size = 1 then return
  // 2. if array size > 1 then sort by pairs:
  //   [x, y] = x > y ? [y, x] : [x, y]
  // 3. Add x to accumulator: concatArray(accumulator, [x])
  // 4. increment p

sortByPairs = (arr, p, acc) => {
  if (not(acc)) {
    acc = []
  }
  while (p < arrayLength(arr) - 1) {
    var pair = sliceArray(arr, p, p + 2)
    if (isGreater(pair[p], pair[p + 1])) {
      pair = swap(pair)
    }
  }
  return acc;
}

least = (x, y) => { conditional(isLess(x, y), x, y); }
    
