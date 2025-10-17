// I give up, I'm not going to write a whole statistics library from scratch.
// Will use some help for complex distributions, CDFs, inverse CDFs, etc.
var { jStat } = require('jStat');


const TAU = 2 * Math.PI;
const SQRT_TAU = Math.sqrt(TAU);
const SQRT_PI = Math.sqrt(Math.PI);
const SQRT_2 = Math.sqrt(2);

const print = console.log;



//  █████╗ ██████╗ ██╗████████╗██╗  ██╗███╗   ███╗███████╗████████╗██╗ ██████╗
// ██╔══██╗██╔══██╗██║╚══██╔══╝██║  ██║████╗ ████║██╔════╝╚══██╔══╝██║██╔════╝
// ███████║██████╔╝██║   ██║   ███████║██╔████╔██║█████╗     ██║   ██║██║     
// ██╔══██║██╔══██╗██║   ██║   ██╔══██║██║╚██╔╝██║██╔══╝     ██║   ██║██║     
// ██║  ██║██║  ██║██║   ██║   ██║  ██║██║ ╚═╝ ██║███████╗   ██║   ██║╚██████╗
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝
//                                                                            

/**
 * A function that given an array of values, returns another 
 * array with the [min, max] values
 * @param {*} array 
 * @returns 
 */
function extremes(array) {
  let min = array[0];
  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < min) min = array[i];
    if (array[i] > max) max = array[i];
  }
  return [min, max];
}

/**
 * A function that given an array of values, returns an array
 * with all its unique values. Useful for categorical data.
 * @param {*} array An array of categorical values
 * @returns 
 */
function unique(array) {
  // Manual way
  let unique = [];
  for (let i = 0; i < array.length; i++) {
    if (unique.indexOf(array[i]) == -1) {
      unique.push(array[i]);
    }
  }

  // // Modern JS way
  // let unique = [...new Set(array)];
  
  // A quick comparison of the two methods showed that the
  // manual way is faster.
  
  return unique;
}


/**
 * A function that given an array of objects, and an array of keys for those objects,
 * returns the count of objects for each combination of keys.
 * For example, given the following data:
 *   `data = [{'foo': 'a', 'bar': 'x'}, {'foo': 'a', 'bar': 'y'}, {'foo': 'b', 'bar': 'x'}]`
 *   `keys = ['foo', 'bar']`
 * The function will return:
 *   `{'a': {'x': 1, 'y': 1}, 'b': {'x': 1, 'y': 0}}`
 * Another example, given the following data:
 *   `data = [{'foo': 'a'}, {'foo': 'a'}, {'foo': 'b'}]`
 *   `keys = ['foo']`
 * The function will return:
 *   `{'a': 2, 'b': 1}`
 * The function will nest the counts for all possible combinations of keys,
 * and add zeros for missing combinations.
 * @param {*} data An array of objects
 * @param {*} keys The keys to use for combination counting
 * @returns 
 */
function countByValueCombination(data, keys) {
  let uniquevalues = [];
  for (let i = 0; i < keys.length; i++) {
    uniquevalues.push(unique(data.map(x => x[keys[i]])).toSorted());
  }

  // Initialize the counts object with all the nested keys
  // and set all values to zero.
  let counts = {};
  function initialize(ref, keys, i) {
    if (i == keys.length - 1) {
      for (let j = 0; j < keys[i].length; j++) {
        ref[keys[i][j]] = 0;
      }
    } else {
      for (let j = 0; j < keys[i].length; j++) {
        ref[keys[i][j]] = {};
        initialize(ref[keys[i][j]], keys, i + 1);
      }
    }
  }
  initialize(counts, uniquevalues, 0);

  // Iterate over all the objects in the data array
  // and increment the counts for each combination of keys.
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    let ref = counts;
    for (let j = 0; j < keys.length; j++) {
      let key = keys[j];
      let value = obj[key];
      if (j == keys.length - 1) {
        ref[value]++;
      } else {
        ref = ref[value];
      }
    }
  }

  return counts;
}





/**
 * Computes the sum of a list of numbers as Σxi.
 * @param {*} x 
 * @returns 
 */
function sum(x) {
  return x.reduce((acc, val) => acc + val, 0);
}

/**
 * Computes the average of a list of numbers, 
 * computed as x̄ = Σxi / n.
 * @param {*} x 
 * @returns 
 */
function mean(x) {
  return sum(x) / x.length;
}

/**
 * Computes the mean of a probability distribution, 
 * i.e. the weighted mean of a list of numbers.
 * @param {*} P A probability distribution as a list of [x, p] pairs.
 * @returns 
 */
function meanDistribution(P) {
  return P.reduce((acc, [x, p]) => acc + x * p, 0);
}

/**
 * Computes the difference of the means of two lists of numbers,
 * i.e. x̄ - ȳ.
 * @param {*} vars Array of two random variables [x, y]
 * @returns 
 */
function meanDifference(vars) {
  return mean(vars[0]) - mean(vars[1]);
}

/**
 * Returns the median of a list of numbers.
 * @param {*} x 
 * @returns 
 */
function median(x) {
  const sorted = x.toSorted((a, b) => b - a);
  const length = sorted.length;
  if (length % 2 == 0) {
    return (sorted[length / 2] + sorted[(length / 2) - 1]) / 2;
  } else {
    return sorted[Math.floor(length / 2)];
  }
}

/**
 * Returns the mode of a list of elements, i.e. the element that appears
 * the most times in the list, and the number of times it appears.
 * @param {*} array 
 * @returns 
 */
function mode(array) {
  let counter = {};
  let mode = [];
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    let el = array[i];
    if (counter[el] == null) counter[el] = 1;
    else counter[el]++;
    if (counter[el] > max) {
      mode = [el];
      max = counter[el];
    } else if (counter[el] === max) {
      mode.push(el);
      max = counter[el];
    }
  }
  return {
    mode,
    max
  };
}


/**
 * Computes the average deviation of a list of numbers,
 * computed as Σ|xi - x̄| / n
 * @param {*} x 
 * @returns 
 */
function meanDeviation(x) {
  const avg = mean(x);
  // return mean(array.map(value => Math.abs(value - avg)));

  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += Math.abs(x[i] - avg);
  }
  return sum / x.length;
}

/**
 * Returns the _sample variance_ `s²` or `var` of a list of values,
 * computed as s² = Σ(x - x̄)² / (n - 1). 
 * @param {*} x 
 * @returns 
 */
function variance(x) {
  // Diff between _sample_ and _polulation_ variance:
  // https://www.ncl.ac.uk/webtemplate/ask-assets/external/maths-resources/statistics/descriptive-statistics/variance-and-standard-deviation.html
  const avg = mean(x);
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += Math.pow(x[i] - avg, 2);
  }
  return sum / (x.length - 1);

  // // Or using the sum of squares total: (untested)
  // const sst = sumOfSquaresTotal(x);
  // return sst / (x.length - 1);
}

/**
 * Computes the variance of a probability distribution,
 * i.e. the weighted variance of a list of numbers.
 * @param {*} P A probability distribution as a list of [x, p] pairs.
 * @returns 
 */
function varianceDistribution(P) {
  const avg = meanDistribution(P);
  return P.reduce((acc, [x, p]) => acc + p * Math.pow(x - avg, 2), 0);
}

/**
 * Returns the _sample standard deviation_ `s` or `σ` of a list of values,
 * computed as σ = √(Σ(x - x̄)² / (n - 1)).
 * @param {*} array 
 * @returns 
 */
function standardDeviation(array) {
  return Math.sqrt(variance(array));
}

/**
 * Computes the standard deviation of a probability distribution,
 * i.e. the weighted standard deviation of a list of numbers.
 * @param {*} P A probability distribution as a list of [x, p] pairs.
 * @returns 
 */
function standardDeviationDistribution(P) {
  return Math.sqrt(varianceDistribution(P));
}


// /**
//  * Returns a list of unique elements in an array.
//  * @param {*} array 
//  * @returns 
//  */
// function unique(array) {
//   // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
//   // If the index of the element is not itself, it must be a duplicate
//   return array.filter((value, index, self) => self.indexOf(value) === index);
// }


/**
 * Returns the proportion of a value in an array, i.e. the ratio of the
 * number of times the value appears in the array to the total number of
 * elements in the array.
 * @param {*} array 
 * @param {*} value 
 * @returns 
 */
function ratio(array, value) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) count++;
  }
  return count / array.length;
}


/**
 * Returns the quantile of a list of numbers, i.e. the value below which
 * a given proportion of the data falls. It will interpolate between the
 * two closest values if the quantile does not fall on an integer index.
 * @param {*} array 
 * @param {*} q 
 * @returns 
 */
function quantile(array, q) {
  const sorted = array.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    // This interpolates between the two closest values?
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
}



// A function that takes an array of numbers and returns a histogram
// of the data. The histogram should be an array of arrays, where each
// subarray represents a bin, and contains the number of elements in
// that bin. The bins should be of equal width, and the range of the
// data should be divided into bins of that width.


/**
 * A function that takes an array of numbers and returns a histogram
 * of the data. The histogram should be an array of arrays, where each
 * subarray represents a bin, and contains the number of elements in
 * that bin. The bins should be of equal width, and the range of the
 * data should be divided into bins of that width.
 * @param {*} array 
 * @param {*} binWidth 
 * @param {*} binStart 
 * @param {*} binEnd 
 * @param {*} options 
 * @returns 
 */
function histogram(array, options) {
  const ends = extremes(array);
  const min = options.binStart === undefined ? ends[0] : options.binStart;
  const max = options.binEnd === undefined ? ends[1] : options.binEnd;
  const width = options.binWidth || (max - min) / 10;

  // Init all bins to 0
  let bins = [];
  let binCount = Math.ceil((max - min) / width);
  for (let i = 0; i < binCount; i++) {
    bins.push(0);
  }

  // Fill them
  let outOfBounds = [];
  for (let i = 0; i < array.length; i++) {
    const binIndex = Math.floor((array[i] - min) / width);
    if (bins[binIndex] != null) bins[binIndex]++;
    else outOfBounds.push(array[i]);
  }
  if (outOfBounds.length > 0 && options.logErrors) console.log("WARNING: " + outOfBounds.length + " values were outside of set histogram bounds: ", outOfBounds);

  // Structure the data as { label: "x", value: y }
  let factor = options.decimals !== undefined ? Math.pow(10, options.decimals) : 1;
  let valArray = bins.map((value, index) => {
    return {
      label: Math.round(factor * (min + index * width)) / factor + "",
      value: value
    };
  });

  // Trim the ends from empty values if necessary
  if (options.trimEnds) {
    let it = valArray.length - 1;
    while (valArray[it].value === 0) {
      valArray.pop();
      it--;
    }
    while (valArray[0].value === 0) {
      valArray.shift();
    }
  }

  return valArray;
}


/**
 * Computes the factorial n! of a number n.
 * @param {*} n 
 * @returns 
 */
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}


/**
 * Computes Σ(xi - x̄)²
 * @param {*} array An array of numbers
 * @returns 
 */
function sumOfSquaresTotal(array) {
  // SST = Σ(xi - x̄)²
  const avg = mean(array);
  const sst = array.reduce((acc, xi) => acc + Math.pow(xi - avg, 2), 0);
  return sst;
}


/**
 * Computes the sum of squares between groups, i.e. Σni(x̄i - x̄)²,
 * where ni is the number of elements in group i, 
 * x̄i is the mean of group i, and x̄ is the overall mean.
 * This is a measure of the variability between groups.
 * @param {*} data An array of objects with key-value pairs. 
 * @param {*} opts An object with the following keys:
 * - variable: The key of the variable to analyze
 * - category: The key of the variable to group by
 * - groups: An array of group names to use. If not provided, 
 * the unique values of the category variable will be used.
 * @returns 
 */
function sumOfSquaresGroup(data, opts) {
  // First compute the mean of the variable across groups
  const totalMean = mean(data.map(d => d[opts.variable]));

  // Use optional group names or use unique values of the category variable
  const groupValues = opts.groups || unique(data.map(d => d[opts.category]));

  // Compute the sum of squares between groups
  // SSG = Σni(x̄i - x̄)²
  const ssg = groupValues.reduce((acc, group) => {
    const groupData = data.filter(d => d[opts.category] === group);
    const avg = mean(groupData.map(d => d[opts.variable]));
    const n = groupData.length;
    return acc + n * Math.pow(avg - totalMean, 2);
  }, 0);
  
  return ssg;
}


/**
 * Computes the sum of squares within groups, i.e. Σ(xi - x̄i)²,
 * where xi is an element in group i and x̄i is the mean of group i.
 * This is a measure of variability within groups.
 * @param {*} data An array of objects with key-value pairs. 
 * @param {*} opts An object with the following keys:
 * - variable: The key of the variable to analyze
 * - category: The key of the variable to group by
 * - groups: An array of group names to use. If not provided, 
 * the unique values of the category variable will be used.
 * @returns 
 */
function sumOfSquaresError(data, opts) {
  // Use optional group names or use unique values of the category variable
  const groupValues = opts.groups || unique(data.map(d => d[opts.category]));

  // Compute the sum of squares within groups
  // SSE = Σ(xi - x̄i)²
  const sse = groupValues.reduce((acc, group) => {
    const groupData = data.filter(d => d[opts.category] === group);
    const avg = mean(groupData.map(d => d[opts.variable]));
    return acc + groupData.reduce((accG, d) => accG + Math.pow(d[opts.variable] - avg, 2), 0);
  }, 0);

  return sse;
}



/**
 * Compute the mean square between groups, i.e. SSG / (k - 1).
 * This is the mean variability between groups. * 
 * @param {*} data An array of objects with key-value pairs. 
 * @param {*} opts An object with the following keys:
 * - variable: The key of the variable to analyze
 * - category: The key of the variable to group by
 * - groups: An array of group names to use. If not provided, 
 * the unique values of the category variable will be used.
 * @returns 
 */
function meanSquareGroup(data, opts) {
  const ssg = sumOfSquaresGroup(data, opts);
  const groupValues = opts.groups || unique(data.map(d => d[opts.category]));
  return ssg / (groupValues.length - 1);
};

/**
 * Compute the mean square error, i.e. SSE / (n - k).
 * This is the mean variability within groups.
 * @param {*} data An array of objects with key-value pairs. 
 * @param {*} opts An object with the following keys:
 * - variable: The key of the variable to analyze
 * - category: The key of the variable to group by
 * - groups: An array of group names to use. If not provided, 
 * the unique values of the category variable will be used.
 * @returns 
 */
function meanSquareError(data, opts) {
  const sse = sumOfSquaresError(data, opts);
  const groupValues = opts.groups || unique(data.map(d => d[opts.category]));
  return sse / (data.length - groupValues.length);
};

/**
 * Computes the F-value, i.e. MSG / MSE.
 * This is the ratio of the mean variability between groups 
 * to the mean variability within groups.
 * @param {*} data An array of objects with key-value pairs. 
 * @param {*} opts An object with the following keys:
 * - variable: The key of the variable to analyze
 * - category: The key of the variable to group by
 * - groups: An array of group names to use. If not provided, 
 * the unique values of the category variable will be used.
 * @returns 
 */
function fValue(data, opts) {
  const msg = meanSquareGroup(data, opts);
  const mse = meanSquareError(data, opts);
  return msg / mse;
};




/**
 * Computes the chi-squared statistic χ² for a given dataset and options.
 * This is a measure of the association between two categorical variables.
 * The formula is χ² = Σ((O - E)² / E), where O is the observed count for 
 * a particular combination of values, and E is the expected count under the
 * null hypothesis of independence.
 * @param {*} data An array of objects with key-value pairs.
 * @param {*} opts An options object with the following keys:
 * - explanatory: The key of the explanatory variable
 * - response: The key of the response variable
 * @returns 
 */
function chiSquared(data, opts) {
  const explanatoryKey = opts.explanatory;
  const responseKey = opts.response;

  // Checks
  if (!explanatoryKey || !responseKey) {
    throw new Error('Both explanatory and response keys are required');
  }
  
  // Get the count of each unique value of the variables
  const n = data.length;
  const responseCounts = countByValueCombination(data, [responseKey]);
  const explanatoryCounts = countByValueCombination(data, [explanatoryKey]);
  const observedCounts = countByValueCombination(data, [responseKey, explanatoryKey]);
  // print(observedCounts);

  // Now, compute the expected counts for each combination.
  // This is basically creating the null hypothesis of independence, 
  // by distributing the counts of each variable proportionally.

  // const expectedCounts = {};
  // const z_scores = {};
  let chiSquared = 0;
  for (let resKey in responseCounts) {
    // expectedCounts[resKey] = {};
    // z_scores[resKey] = {};
    for (let expKey in explanatoryCounts) {
      const expected = responseCounts[resKey] * explanatoryCounts[expKey] / n;
      const observed = observedCounts[resKey][expKey] || 0;
      const z = (observed - expected) / Math.sqrt(expected);
      chiSquared += z * z;
      
      // expectedCounts[resKey][expKey] = expected;
      // z_scores[resKey][expKey] = z;
    }
  }
  // print(expectedCounts);
  // print(z_scores);

  return chiSquared;
}





/**
 * An alias for sumOfSquaresTotal()
 */
const SST = sumOfSquaresTotal;

/**
 * An alias for sumOfSquaresGroup()
 */
const SSG = sumOfSquaresGroup;

/**
 * An alias for sumOfSquaresError()
 */
const SSE = sumOfSquaresError;

/**
 * An alias for meanSquareGroup()
 */
const MSG = meanSquareGroup;

/**
 * An alias for meanSquareError()
 */
const MSE = meanSquareError;

/**
 * An alias for fValue()
 */
const F = fValue;





// ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ██║  ██║███████║   ██║   ███████║
// ██║  ██║██╔══██║   ██║   ██╔══██║
// ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
//                                  


/**
 * Creates an array of objects from an array of keys and an array of
 * arrays of corresponding values.
 * @param {*} keys An array of keys, e.g. ['Genre', 'Rating']
 * @param {*} values An array of arrays, e.g. [['Action', 'Comedy'], [4.5, 3.5]]
 * @returns An array of objects, e.g. [{Genre: 'Action', Rating: 4.5}, {Genre: 'Comedy', Rating: 3.5}]
 */
function createObjectArray(keys, values) {
  // Co-pilot generated
  return values[0].map((_, i) => Object.fromEntries(keys.map((k, j) => [k, values[j][i]])));
}







// ███╗   ███╗ ██████╗ ██████╗ ███████╗██╗     ██╗███╗   ██╗ ██████╗ 
// ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██║     ██║████╗  ██║██╔════╝ 
// ██╔████╔██║██║   ██║██║  ██║█████╗  ██║     ██║██╔██╗ ██║██║  ███╗
// ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██║     ██║██║╚██╗██║██║   ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗███████╗██║██║ ╚████║╚██████╔╝
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
//                                                                   

/**
 * Returns the _sample_ covariance `cov` of two lists of values,
 * computed as cov(x, y) = Σ(xi - x̄)(yi - ȳ) / (n - 1).
 * The covariance value can range from -∞ to +∞, 
 * with a negative value indicating a negative relationship 
 * and a positive value indicating a positive relationship.
 * See more here: https://www.simplilearn.com/covariance-vs-correlation-article
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function covariance(x, y) {
  if (x.length !== y.length) {
    throw new Error('Arrays must have the same length');
  }
  const avg1 = mean(x);
  const avg2 = mean(y);
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += (x[i] - avg1) * (y[i] - avg2);
  }
  return sum / (x.length - 1);
}


/**
 * Returns the _sample_ coefficient of correlation `cor` or `r` of two lists of values,
 * computed as cor(x, y) = cov(x, y) / (σx * σy).
 * The correlation value can range from -1 to +1, 
 * with sign indicates the direction of the relationship,
 * and the magnitude indicates the strength of the linear relationship:
 * - 1: perfect positive linear relationship
 * - 0: no linear relationship
 * - -1: perfect negative linear relationship
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function correlation(x, y) {
  return covariance(x, y) / (standardDeviation(x) * standardDeviation(y));
}


/**
 * Returns the _least squares linear regression_ of two lists of values,
 * computed as y = mx + b, where:
 * - `m` is the **slope of** the line
 * - `b` is the **y-intercept** of the line
 * - `x` is the **independent/explanatory** variable
 * - `y` is the **dependent/response** variable
 * @param {*} x The independent/explanatory variable
 * @param {*} y The dependent/response variable
 * @returns 
 */
function leastSquaresRegression(x, y) {
  if (x.length !== y.length) {
    throw new Error('Arrays must have the same length');
  }

  // This responds to the formula:
  // m = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²
  // b = ȳ - m * x̄
  const avgX = mean(x);
  const avgY = mean(y);
  const sumXY = x.reduce((acc, xi, i) => acc + (xi - avgX) * (y[i] - avgY), 0);
  const sumX2 = x.reduce((acc, xi) => acc + Math.pow(xi - avgX, 2), 0);

  const m = sumXY / sumX2;
  const b = avgY - m * avgX;

  // // Slope can also be computed as:
  // // m = cor(x, y) * (σy / σx)
  // console.log("Alt B1: " + (correlation(x, y) * (standardDeviation(y) / standardDeviation(x))));

  return {
    m,
    b
  };
}


/**
 * Create a linear regression model from a set of coefficients.
 * The result is a function that takes an input `x` and 
 * returns the predicted value `y`.
 * @param {*} coefficients An object with `m` and `b` properties. 
 * @returns 
 */
function linearRegressionModel(coefficients) {
  return x => coefficients.b + coefficients.m * x;
}



/**
 * Returns the R-squared and adjusted R-squared values of a 
 * linear regression model. The R-squared value is a measure of
 * how well the model fits the data, and the adjusted R-squared
 * value adjusts the R-squared value for the number of predictors.
 * The R-squared value can range from 0 to 1, with 1 indicating
 * a perfect fit, and 0 indicating no fit.
 * The adjusted R-squared value can range from 0 to 1, with 1
 * indicating a perfect fit, and 0 indicating no fit.
 * R2 = 1 - Σ(yi - ŷi)² / Σ(yi - ȳ)²
 * R2adj = 1 - (Σ(yi - ŷi)² / Σ(yi - ȳ)²) * ((n - 1) / (n - k - 1))
 * where: 
 * - `yi` is the observed value
 * - `ŷi` is the predicted value
 * - `ȳ` is the mean of the observed values
 * - `n` is the number of observations
 * - `k` is the number of predictors 
 * @param {*} x 
 * @param {*} y 
 * @param {*} model 
 * @returns 
 */
function rSquared(x, y, model) {
  if (x.length !== y.length) {
    throw new Error('Arrays must have the same length');
  }

  const avgY = mean(y);
  const sumY2 = y.reduce((acc, yi) => acc + Math.pow(yi - avgY, 2), 0);
  const sumResiduals2 = y.reduce((acc, yi, i) => {
    const predictedY = model(x[i]);
    return acc + Math.pow(yi - predictedY, 2);
  }, 0);

  const adjustFactor = (x.length - 1) / (x.length - 1 - 1);  // (n - 1) / (n - k - 1) where k = 1 for simple linear regression model

  const r2 = 1 - (sumResiduals2 / sumY2);
  const r2adj = 1 - (sumResiduals2 / sumY2) * adjustFactor;

  // // R2 can also be computed as:
  // // r2 = var(ŷ) / var(y)
  // const r2Alt = variance(x.map(model)) / variance(y);
  // console.log("R2: " + r2);
  // console.log("R2 alt: " + r2Alt);

  return {
    r2,
    r2adj
  };
}



// ███████╗ █████╗ ███╗   ███╗██████╗ ██╗     ██╗███╗   ██╗ ██████╗ 
// ██╔════╝██╔══██╗████╗ ████║██╔══██╗██║     ██║████╗  ██║██╔════╝ 
// ███████╗███████║██╔████╔██║██████╔╝██║     ██║██╔██╗ ██║██║  ███╗
// ╚════██║██╔══██║██║╚██╔╝██║██╔═══╝ ██║     ██║██║╚██╗██║██║   ██║
// ███████║██║  ██║██║ ╚═╝ ██║██║     ███████╗██║██║ ╚████║╚██████╔╝
// ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
//                                                                  

/**
 * Returns a random sample of `n` elements from an array.
 * No element will be repeated in the sample.
 * @param {*} array 
 * @param {*} n 
 * @returns 
 */
function sample(array, n) {
  const shuffled = array.slice(0);
  let i = array.length;
  let temp;
  let index;
  while (i--) {
    index = Math.floor((i + 1) * random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, n);
}

/**
 * Returns a random sample of `n` elements from an array, 
 * allowing elements to be repeated in the sample.
 * @param {*} array 
 * @param {*} n 
 * @returns 
 */
function sampleWithReplacement(array, n) {
  return Array.from({
    length: n
  }, () => array[Math.floor(random() * array.length)]);
}


/**
 * Returns an array of `reps` bootstapped samples from the array.
 * @param {*} array 
 * @param {*} reps 
 * @returns 
 */
function bootstrapSamples(array, reps) {
  return Array.from({
    length: reps
  }, () => sampleWithReplacement(array, array.length));
}


/**
 * Returns an array of values obtained by applying the `statistic` function
 * to a set of bootstrapped samples from the array.
 * @param {*} array 
 * @param {*} reps 
 * @param {*} statistic 
 * @returns 
 */
function bootstrap(array, reps, statistic) {
  return bootstrapSamples(array, reps).map(statistic);
}


/**
 * Takes an array of arrays, and returns a copy where each array
 * has been shuffled.
 * @param {*} samples An array of arrays, like [resData, expData]
 * @returns 
 */
function _permuteSamples(samples) {
  return samples.map(arr => sample(arr, arr.length));
}






//  ██████╗ ██████╗ ███╗   ██╗███████╗██╗██████╗ ███████╗███╗   ██╗ ██████╗███████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ██║█████╗  ██╔██╗ ██║██║     █████╗  
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██╔══╝  
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║██████╔╝███████╗██║ ╚████║╚██████╗███████╗
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
//                                                                                 

/**
 * Returns the confidence interval of a statistic.
 * The confidence interval is computed as the `level` quantile
 * of the sorted array of statistics. This is equivalent to
 * the percentile method of computing confidence intervals.
 * NOTE: not sure if this is working well actually.
 * @param {*} array 
 * @param {*} level A number between 0 and 1, typically 0.95
 * @param {*} direction "two-sided", "lower", or "upper"
 * @returns 
 */
function confidenceInterval(array, level, direction = "two-sided") {
  // JL: I don't think this is correct. This is simply
  // returning the level-th element in the array...
  // But wait, isn't that the definition of a quantile?

  const sorted = array.slice().sort((a, b) => a - b);
  
  let lowerI, lower, upperI, upper;
  if (direction === "two-sided") {
    lowerI = Math.max(Math.floor((1 - level) / 2 * array.length), 0);
    lower = sorted[lowerI];
    upperI = Math.min(Math.floor((1 + level) / 2 * array.length), array.length - 1);
    upper = sorted[upperI];
  } else if (direction === "lower") {
    lowerI = 0;
    lower = sorted[lowerI];
    upperI = Math.min(Math.floor(level * array.length), array.length - 1);
    upper = sorted[upperI];
  } else if (direction === "upper") {
    lowerI = Math.max(Math.floor((1 - level) * array.length), 0);
    lower = sorted[lowerI];
    upperI = array.length - 1;
    upper = sorted[upperI];
  } else {
    throw new Error("Invalid direction");
  }
  
  return {
    lower,
    upper,
    level
  };
}



/**
 * Returns the confidence interval of a statistic computed from 
 * a set of bootstrapped samples around a given value. 
 * It uses 2 * $\widehat{SE}$ of the statistic as the margin of error.
 * @param {*} array Array of bootstrapped statistics.
 * @param {*} level At this time, it must be 0.95
 * @param {*} pointEstimate The point estimate of the statistic to compute the confidence interval around. If no value is provided, the mean of the array is used.
 * @returns 
 */
function confidenceIntervalSE(array, level, pointEstimate) {
  if (level != 0.95) console.log("Warning: This function currently only works for 95% confidence intervals");

  const meanValue = mean(array);
  const stdError = standardDeviation(array);
  const marginError = 2 * stdError;
  return {
    lower: meanValue - marginError,
    upper: meanValue + marginError,
    pointEstimate: pointEstimate || meanValue,
    level,
    marginError
  };
}












// ██████╗  █████╗ ███╗   ██╗██████╗  ██████╗ ███╗   ███╗
// ██╔══██╗██╔══██╗████╗  ██║██╔══██╗██╔═══██╗████╗ ████║
// ██████╔╝███████║██╔██╗ ██║██║  ██║██║   ██║██╔████╔██║
// ██╔══██╗██╔══██║██║╚██╗██║██║  ██║██║   ██║██║╚██╔╝██║
// ██║  ██║██║  ██║██║ ╚████║██████╔╝╚██████╔╝██║ ╚═╝ ██║
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═╝     ╚═╝
//                                                       

// Local var for seed state and init it. 
let currentSeed = Date.now() * Math.random();

/**
 * A function that generates uniformly distributed pseudo-random numbers
 * using the SplitMix32 algorithm. As opposed to Math.random(), 
 * it can be controlled by a seed. See `randomSeed()`.
 * See https://stackoverflow.com/a/47593316/1934487
 * @returns 
 */
function random() {
  currentSeed |= 0;
  currentSeed = currentSeed + 0x9e3779b9 | 0;
  let t = currentSeed ^ currentSeed >>> 16;
  t = Math.imul(t, 0x21f0aaad);
  t = t ^ t >>> 15;
  t = Math.imul(t, 0x735a2d97);
  return ((t = t ^ t >>> 15) >>> 0) / 4294967296;
}

/**
 * Sets the seed for the this module's pseudo-random number generators (PRNGs),
 * including `random()` and `randomSN()`.
 * @param {*} seed 
 */
function randomSeed(seed) {
  currentSeed = seed;
}


/**
 * Returns a random number from a standard normal distribution.
 * Values will have a mean of 0, a standard deviation of 1, and will follow
 * a bell-shaped curve. The range is theoretically unbound, but most values (99.7%)
 * will be between -3 and 3.
 * Internally, uses the Box-Muller transform to go from a uniform random number
 * in the range (0, 1) to a standard normal random number.
 * @returns 
 */
function randomStandardNormal() {
  let u1 = 0,
    u2 = 0;

  // Avoid the zero endpoint
  while (u1 === 0) u1 = random();
  while (u2 === 0) u2 = random();

  let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  // let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2); 
  // z1 can be used if generating pairs but for simplicity, we use z0

  return z0; // This return value is a standard normally distributed number
}


/**
 * Create an array of n random numbers with a standard normal distribution
 * with target mean and standard deviation values. 
 * @param {*} n 
 * @param {*} targetMean 
 * @param {*} targetStdDev 
 * @returns 
 */
function randomStandardNormalSamples(n, targetMean, targetStdDev) {
  // Use a linear model to scale and shift the SN random numbers
  const linear = linearRegressionModel({
    m: targetStdDev,
    b: targetMean
  });
  const rans = Array.from({
    length: n
  }, randomStandardNormal).map(linear);
  return rans;

  // // Older version
  // let numbers = [];
  // for (let i = 0; i < n; i++) {
  //     let standardNormal = randomStandardNormal();
  //     let scaledShiftedNumber = standardNormal * targetStdDev + targetMean;
  //     numbers.push(scaledShiftedNumber);
  // }
  // return numbers;
}








// ███╗   ██╗██╗   ██╗██╗     ██╗     
// ████╗  ██║██║   ██║██║     ██║     
// ██╔██╗ ██║██║   ██║██║     ██║     
// ██║╚██╗██║██║   ██║██║     ██║     
// ██║ ╚████║╚██████╔╝███████╗███████╗
// ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝
//                                    
// ██████╗ ██╗███████╗████████╗
// ██╔══██╗██║██╔════╝╚══██╔══╝
// ██║  ██║██║███████╗   ██║   
// ██║  ██║██║╚════██║   ██║   
// ██████╔╝██║███████║   ██║   
// ╚═════╝ ╚═╝╚══════╝   ╚═╝   
//                             


/**
 * Creates a null hypothesis distribution for a given data sample,
 * computed based on specific options. 
 * @param {*} sample 
 * @param {*} reps 
 * @param {*} opts An object with the following properties:
 * - null: "point"
 * - point: The point value to use
 * - statistic: "mean", "ratio"|"prop"
 * @returns 
 */
function nullDistribution(sample, reps, opts) {
  if (opts.null === "point") {
    if (opts.point === null) {
      throw new Error("Missing point value");
    }

    switch (opts.statistic) {
      case "mean":
        return _nullDistributionMean(sample, reps, opts);
      case "ratio":
      case "prop":
        return _nullDistributionProportion(sample, reps, opts);
    }
  }

  console.log("WARNING: invalid null distribution options.");
  return [];
}


/**
 * Creates a null hypothesis distribution for the mean of a given data sample,
 * computed based on a specific point value.
 * The function will generate bootstrapped samples based on the original sample,
 * shift their value based on the mean differences, and return the mean of each.
 * @param {*} sample 
 * @param {*} reps 
 * @param {*} opts 
 * @returns 
 */
function _nullDistributionMean(sample, reps, opts) {
  const delta = opts.point - mean(sample);
  return bootstrapSamples(sample, reps)
    .map(sample => sample.map(x => x + delta))
    .map(mean);
}


/**
 * Creates a null hypothesis distribution for the ratio of a given data sample,
 * computed based on a specific point value. For example, if the sample is 100 
 * Yes/No answers at whichever ratio, and the target point is 70%, the function will
 * generate bootstrapped samples based on the original sample, shift their value
 * based on the ratio differences, and return the ratio of each.
 * @param {*} sample 
 * @param {*} reps 
 * @param {*} opts 
 * @returns 
 */
function _nullDistributionProportion(sample, reps, opts) {
  if (opts.success === null || opts.success === undefined) {
    throw new Error("Missing success value");
  }

  const delta = opts.point - ratio(sample, opts.success);
  return bootstrapSamples(sample, reps)
    .map(sample => ratio(sample, opts.success))
    .map(sample => sample + delta);
}




/**
 * Creates a null hypothesis distribution for a multi-variable data sample,
 * akin to R's `(res_var ~ exp_var)` formula. 
 * @param {*} samples An array of [res, exp] samples
 * @param {*} reps 
 * @param {*} opts Options objcet with the following properties:
 * {
    null: "independence",
    statistic: "diff in means" | "diff in ratios" "diff in proportions" | "correlation"
    types: ["numerical", "categorical"] or ["numerical", "numerical"] --> in [res, exp] order
    order: (unique values of the cat variable in [0] - [1] order),
    }
 * @returns 
 */
function nullDistributionMulti(samples, reps, opts) {
  if (opts.null === "independence") {
    switch (opts.statistic) {
      case "diff in means":
        return _nullDistributionPermutationDiffMeans(samples, reps, opts);

      case "diff in proportions":
      case "diff in ratios":
        return _nullDistributionPermutationDiffProportions(samples, reps, opts);

      case "correlation":
        return _nullDistributionPermutationCorrelation(samples, reps, opts);
    }
  }

  console.log("WARNING: invalid null distribution options.");
  return [];
}


/**
 * Computes the null hypothesis distribution for the difference in means
 * of a multi-variable data sample, using a permutation test. 
 * Works for a categorical and a numerical variable.
 * @param {*} samples 
 * @param {*} reps 
 * @param {*} opts 
 * @returns 
 */
function _nullDistributionPermutationDiffMeans(samples, reps, opts) {
  // Which variable is which? 
  const numId = opts.types.indexOf("numerical");
  const catId = opts.types.indexOf("categorical");

  // Generate the permutation distribution
  const diffs = Array.from({
    length: reps
  }, () => {
    // Randomly permute the samples to de-correlate them
    // i.e. making their values independent of each other
    const permuted = _permuteSamples(samples);

    // Group the numerical values based on the categorical ones
    const values0 = permuted[numId].filter((_, i) => permuted[catId][i] === opts.order[0]);
    const values1 = permuted[numId].filter((_, i) => permuted[catId][i] === opts.order[1]);

    // Compute the difference in means in the stated order
    return mean(values0) - mean(values1);
  });

  return diffs;
}


/**
 * Computes the null hypothesis distribution for the difference in proportions
 * of a multi-variable data sample, using a permutation test.
 * Works for two binary categorical variables.
 * @param {*} samples Nested array of [res, exp] samples
 * @param {*} reps 
 * @param {*} opts 
 * @returns 
 */
function _nullDistributionPermutationDiffProportions(samples, reps, opts) {
  // We assume two binary categorical samples for now

  // Generate the permutation distribution
  const diffs = Array.from({
    length: reps
  }, () => {
    // Randomly permute the samples to de-correlate them
    // i.e. making their values independent of each other
    const permuted = _permuteSamples(samples);

    // Group variables based on explanatory variable
    const exp0 = permuted[0].filter((_, i) => permuted[1][i] === opts.order[1][0]);
    const exp1 = permuted[0].filter((_, i) => permuted[1][i] === opts.order[1][1]);

    // For each group, compute the ratios of the categorical response variable
    const ratio0 = exp0.filter(x => x === opts.order[0][0]).length / exp0.length;
    const ratio1 = exp1.filter(x => x === opts.order[0][0]).length / exp1.length;

    return ratio0 - ratio1;
  });
  return diffs;
}


/**
 * Computes the null hypothesis distribution for the correlation of two
 * numerical variables in a multi-variable data sample, using a permutation test.
 * Assumes that the null hypothesis is independence, i.e. no correlation.
 * @param {*} samples Nested array of [res, exp] samples
 * @param {*} reps 
 * @param {*} opts 
 */
function _nullDistributionPermutationCorrelation(samples, reps, opts) {
  const correlations = Array.from({
    length: reps
  }, () => {
    const permuted = _permuteSamples(samples);
    return correlation(permuted[0], permuted[1]);
  });

  return correlations;
}


/**
 * Computes the null distribution for an ANOVA test using, permuting
 * the values of the response variable (null hypothesis = independence), 
 * and returning the F-statistic for each permutation.
 * @param {*} data An array of data objects with key-value pairs. 
 * @param {*} reps 
 * @param {*} opts An object with the following properties:
 * - category: the key of the categorical variable
 * - variable: the key of the numerical variable
 * - groups: An array of group names to use. If not provided, 
 * the unique values of the category variable will be used.
 * @returns 
 */
function nullDistributionANOVA(data, reps, opts) {
  // Use optional group names or use unique values of the category variable
  const groupValues = opts.groups || unique(data.map(d => d[opts.category]));
  
  // Generate two arrays with the values of the response quant and 
  // the explanatory categorical variables.
  const filteredData = data.filter(d => groupValues.includes(d[opts.category]));
  const exp = filteredData.map(group => group[opts.category]);
  const res = filteredData.map(group => group[opts.variable]);

  const Fs = Array.from({ length: reps }, (_, i) => {
    // Randomly permute the samples to de-correlate them
    // i.e. making their values independent of each other
    const permuted = _permuteSamples([res, exp]);

    // Reassemble the permuted data into a frame, 
    // so that it can be consumed by the fValue function
    const frame = createObjectArray(
      [opts.variable, opts.category],
      permuted
    );

    const F = fValue(frame, opts);
    return F;
  });

  return Fs;
}


function nullDistributionChiSquared(data, reps, opts) {
  // Generate two arrays with the values of the categorical 
  // explanatory and response variables
  const exp = data.map(d => d[opts.explanatory]);
  const res = data.map(d => d[opts.response]);

  const chis = Array.from({ length: reps }, (_, i) => {
    // Randomly permute the samples to de-correlate them
    // i.e. making their values independent of each other
    const permuted = _permuteSamples([res, exp]);

    // Reassemble the permuted data into a frame, 
    // so that it can be consumed by the chiSquared function
    const frame = createObjectArray(
      [opts.response, opts.explanatory],
      permuted
    );

    const chi = chiSquared(frame, opts);
    return chi;
  });

  return chis;
}









// ██████╗       ██╗   ██╗ █████╗ ██╗     ██╗   ██╗███████╗
// ██╔══██╗      ██║   ██║██╔══██╗██║     ██║   ██║██╔════╝
// ██████╔╝█████╗██║   ██║███████║██║     ██║   ██║█████╗  
// ██╔═══╝ ╚════╝╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══╝  
// ██║            ╚████╔╝ ██║  ██║███████╗╚██████╔╝███████╗
// ╚═╝             ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
//                                                         

/**
 * Computes the p-value for a given distribution and observed statistic.
 * The p-value is "the probability of observing a value as extreme as the observed
 * statistic or more, assuming the null hypothesis is true". Typically, the p-value
 * is compared to a significance level (e.g., 0.05) to determine if the null hypothesis
 * should be rejected.
 * @param {*} distribution 
 * @param {*} observedStat 
 * @param {*} direction "two-sided","two-tailed" | "greater" | "less","smaller"
 * @returns 
 */
function pValue(distribution, observedStat, direction) {
  switch (direction) {
    case "greater":
      return _pValueGreater(distribution, observedStat);
    case "less":
    case "smaller":
      return _pValueLess(distribution, observedStat);
    case "two-sided":
    case "two-tailed":
      return _pValueTwoSided(distribution, observedStat);
    default:
      console.log("WARNING: invalid p-value direction.");
      return null;
  }
}

/**
 * Computes the p-value for a greater-than test.
 * @param {*} distribution 
 * @param {*} observedStat 
 * @returns 
 */
function _pValueGreater(distribution, observedStat) {
  return distribution.filter(x => x >= observedStat).length / distribution.length;
}

/**
 * Computes the p-value for a less-than test.
 * @param {*} distribution 
 * @param {*} observedStat 
 * @returns 
 */
function _pValueLess(distribution, observedStat) {
  return distribution.filter(x => x <= observedStat).length / distribution.length;
}

/**
 * Computes the p-value for a two-sided test.
 * @param {*} distribution 
 * @param {*} observedStat 
 * @returns 
 */
function _pValueTwoSided(distribution, observedStat, options) {
  // JL: I first assumed that the calculation of the p-value for a two-sided test
  // would be figuring out which side the observedStat is on and then calculating
  // the proportion of values on the opposite side, equidistant to a null value
  // (either set or calculated from the distribution).

  // const nullValue = (options && options.nullValue !== null) ?
  //   options.nullValue : median(distribution);
  // const d = Math.abs(observedStat - nullValue);
  // let leftTail, rightTail;
  // if (observedStat > nullValue) {
  //   rightTail = distribution.filter(x => x >= observedStat).length;
  //   leftTail = distribution.filter(x => x <= nullValue - d).length;
  // } else {
  //   leftTail = distribution.filter(x => x <= observedStat).length;
  //   rightTail = distribution.filter(x => x >= nullValue + d).length;
  // }
  // // console.log(leftTail, rightTail, distribution.length);
  // return (leftTail + rightTail) / distribution.length;

  // However, it looks like the R `infer` package simply calculates it as
  // double the minimum of the two one-sided p-values:
  // https://github.com/tidymodels/infer/blob/1d069b3e16569cbb5f7dc9a5458e52379441259f/R/get_p_value.R#L249
  const leftTail = _pValueLess(distribution, observedStat);
  const rightTail = _pValueGreater(distribution, observedStat);
  return Math.min(Math.min(leftTail, rightTail) * 2, 1);
}


/**
 * Computes the power of a statistical test. The power of a test is the probability
 * of correctly rejecting the null hypothesis when it is false. It requires the 
 * distribution of the test statistic under the **alternative hypothesis**, as well as
 * the critical value for the test and the direction of the test.
 * @param {*} distribution An array of values representing the distribution of the test statistic under the alternative hypothesis.
 * @param {*} criticalValues A single value for a one-sided test, or an array of [left, right] values for a two-sided test. 
 * @param {*} direction "greater" | "less","smaller" | "two-sided","two-tailed"
 * @returns 
 */
function power(distribution, criticalValues, direction) {
  switch (direction) {
    case "greater":
      return _pValueGreater(distribution, criticalValues);
    case "less":
    case "smaller":
      return _pValueLess(distribution, criticalValues);
    case "two-sided":
    case "two-tailed":
      // return _pValueTwoSided(distribution, criticalValue);  // the 2 * min(p-value) method wasn't working here, doing it manually for two input critical values
      return _powerTwoSided(distribution, criticalValues);
    default:
      console.log("WARNING: invalid power direction.");
      return null;
  }
}


/**
 * Computes the two-sided power of a statistical test by adding the left and right tails.
 * @param {*} distribution 
 * @param {*} criticalValues An array of [left, right] values 
 * @returns 
 */
function _powerTwoSided(distribution, criticalValues) {
  const leftTail = distribution.filter(x => x <= criticalValues[0]).length;
  const rightTail = distribution.filter(x => x >= criticalValues[1]).length;
  // console.log(criticalValues[0], criticalValues[1]);
  // console.log(leftTail, rightTail, distribution.length);
  return leftTail / distribution.length + rightTail / distribution.length;
}

/**
 * Computes the z-score of a value given the mean and standard deviation
 * of a distribution. Values that are more than 2 standard deviations away
 * from the mean are considered unusual. Values that are more than 3 standard
 * deviations away from the mean are considered extreme.
 * @param {*} x 
 * @param {*} mu 
 * @param {*} sigma 
 * @returns 
 */
function zScore(x, mu, sigma) {
  return (x - mu) / sigma;
}

/**
 * Returns a function that computes the z-score of a value given 
 * the mean and standard deviation.
 * @param {*} mu 
 * @param {*} sigma 
 */
function zScorer(mu, sigma) {
  return function (x) {
    return (x - mu) / sigma;
  }
}






// ██████╗ ██████╗  ██████╗ ██████╗  █████╗ ██████╗ ██╗██╗     ██╗████████╗██╗   ██╗
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
// ██████╔╝██████╔╝██║   ██║██████╔╝███████║██████╔╝██║██║     ██║   ██║    ╚████╔╝ 
// ██╔═══╝ ██╔══██╗██║   ██║██╔══██╗██╔══██║██╔══██╗██║██║     ██║   ██║     ╚██╔╝  
// ██║     ██║  ██║╚██████╔╝██████╔╝██║  ██║██████╔╝██║███████╗██║   ██║      ██║   
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   
//                                                                                  
// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
//                                                                           
// Some functions to generate probability functions for common distributions.

const ProbabilityFunctions = {};

/**
 * Returns the probability density function for a Bernoulli distribution 
 * with the given probability p. Bernoulli distributions are used to model
 * the outcomes of a single binary event, such as a coin flip, with a 
 * particular probability of success. 
 * Inputs to the function are 0 (fail) or 1 (success).
 * @param {*} p 
 * @returns 
 */
ProbabilityFunctions.Bernoulli = function (p = 0.5) {
  // Compute the probability density function for a Bernoulli distribution
  function pdf(x) {
    return x === 1 ? p : 1 - p;
  }
  return pdf;
}


/**
 * Returns a probability density function for a normal distribution with the given mean μ and standard deviation σ.
 * @param {*} mean 
 * @param {*} sd 
 * @returns 
 */
ProbabilityFunctions.Normal = function (mean = 0, sd = 1) {
  // Compute the probability density function for a normal distribution
  const f1 = 1 / (sd * SQRT_TAU);

  function pdf(x) {
    return f1 * Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
  }

  return pdf;
}

/**
 * Returns the cumulative distribution function (CDF) for a normal distribution 
 * with the given mean and standard deviation. The CDF gives the probability that
 * a random variable X will take a value LESS THAN OR EQUAL to x.
 * @param {*} mean 
 * @param {*} sd 
 * @returns 
 */
ProbabilityFunctions.NormalCDF = function (mean = 0, sd = 1) {
  // ChatGPT-generated code!
  // Compute the cumulative distribution function for a normal distribution
  function cdf(x) {
    return 0.5 * (1 + _erf((x - mean) / (sd * SQRT_2)));
  }

  return cdf;
}

function _erf(x) {
  //  This function approximates the error function using a polynomial approximation, which is a common technique due to its complexity. The constants used are specific coefficients that provide a good approximation.

  // Constants
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  // Save the sign of x
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}


/**
 * Returns the inverse cumulative distribution function (CDF) for a normal distribution
 * with the given mean and standard deviation. The inverse CDF gives the value x such that
 * the probability that a random variable X will take a value LESS THAN OR EQUAL to x is p.
 * In other words, for a probability p, this function will return the value x 
 * such that P(X ≤ x) = p.
 * @param {*} mean 
 * @param {*} sd 
 * @returns 
 */
ProbabilityFunctions.NormalInvCDF = function (mean = 0, sd = 1) {
  // ChatGPT-generated code!

  // Compute the inverse cumulative distribution function for a normal distribution
  function invcdf(p) {
    if (p < 0 || p > 1) {
      throw new Error("The probability p must be between 0 and 1.");
    }

    // Coefficients in rational approximations for the standard normal distribution
    const a = [
      -3.969683028665376e+01,
      2.209460984245205e+02,
      -2.759285104469687e+02,
      1.383577518672690e+02,
      -3.066479806614716e+01,
      2.506628277459239e+00
    ];
    const b = [
      -5.447609879822406e+01,
      1.615858368580409e+02,
      -1.556989798598866e+02,
      6.680131188771972e+01,
      -1.328068155288572e+01
    ];
    const c = [
      -7.784894002430293e-03,
      -3.223964580411365e-01,
      -2.400758277161838e+00,
      -2.549732539343734e+00,
      4.374664141464968e+00,
      2.938163982698783e+00
    ];
    const d = [
      7.784695709041462e-03,
      3.224671290700398e-01,
      2.445134137142996e+00,
      3.754408661907416e+00
    ];

    // Define break-points
    const plow = 0.02425;
    const phigh = 1 - plow;

    let q, x;
    // Rational approximation for lower region
    if (p < plow) {
      q = Math.sqrt(-2 * Math.log(p));
      x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    // Rational approximation for upper region
    else if (p > phigh) {
      q = Math.sqrt(-2 * Math.log(1 - p));
      x = -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
    // Rational approximation for central region
    else {
      q = p - 0.5;
      const r = q * q;
      x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    }

    // Adjust for mean and standard deviation
    return mean + x * sd;
  }

  return invcdf;
}


/**
 * Returns a probability density function for a standard normal distribution,
 * i.e. a normal distribution with mean μ=0 and standard deviation σ=1.
 * @returns 
 */
ProbabilityFunctions.StandardNormal = () => ProbabilityFunctions.Normal(0, 1);

/**
 * Returns the cumulative distribution function (CDF) for a standard normal distribution.
 * The CDF gives the probability that a random variable X will take a 
 * value LESS THAN OR EQUAL to x.
 * @returns 
 */
ProbabilityFunctions.StandardNormalCDF = () => ProbabilityFunctions.NormalCDF(0, 1);


/**
 * Returns the probability density function for a (Student's) t-distribution 
 * with the given degrees of freedom v. This distribution is similar to the
 * normal distribution, but the tails are heavier, especially for small v.
 * @param {*} v Degrees of freedom of the t-distribution.
 * @returns 
 */
ProbabilityFunctions.T = function (v) {
  // Compute the probability density function for a t-distribution.
  // See https://en.wikipedia.org/wiki/Student%27s_t-distribution
  // See https://www.wolframalpha.com/input?i=pdf+student%27s+t+distribution
  // Checks: https://www.danielsoper.com/statcalc/calculator.aspx?id=40
  const f1 = 1 / (Math.sqrt(v) * _betaFunction(0.5 * v, 0.5));
  const exp = -0.5 * (v + 1);

  function pdf(x) {
    return f1 * Math.pow(1 + x * x / v, exp);
  }
  return pdf;
}

function _betaFunction(a, b) {
  return _gammaFunction(a) * _gammaFunction(b) / _gammaFunction(a + b);
}

function _gammaFunction(x) {
  if (x === 1) return 1;
  if (x === 0.5) return SQRT_PI; // https://www.wolframalpha.com/input?i=gamma+function+of+1%2F2
  return (x - 1) * _gammaFunction(x - 1);
}


/**
 * Returns the cumulative distribution function (CDF) for a Student's 
 * t-distribution with the given degrees of freedom df. The CDF gives 
 * the probability that a random variable X will take a value 
 * LESS THAN OR EQUAL to x.
 * @param {*} df Degrees of freedom of the t-distribution.
 * @returns 
 */
ProbabilityFunctions.TCDF = function(df) {
  // ChatGPT couldn't take this one... so I'm using a library!
  
  // For testing: 
  // https://www.danielsoper.com/statcalc/calculator.aspx?id=41
  function cdf(x) {
    // http://jstat.github.io/distributions.html#jStat.studentt.inv
    return jStat.studentt.cdf(x, df);
  }

  return cdf;
}

/**
 * Returns the inverse cumulative distribution function (CDF) for a Student's t-distribution
 * for the given degrees of freedom. The inverse CDF gives the value x such that
 * the probability that a random variable X will take a value LESS THAN OR EQUAL to x is p.
 * In other words, for a probability p, this function will return the value x 
 * such that P(X ≤ x) = p.
 * @param {*} df Degrees of freedom of the t-distribution.
 * @returns 
 */
ProbabilityFunctions.TInvCDF = function(df) {
  // ChatGPT couldn't take this one... so I'm using a library!

  function icdf(p) {
    // http://jstat.github.io/distributions.html#jStat.studentt.inv
    return jStat.studentt.inv(p, df);
  }

  return icdf;
}

/**
 * Returns the probability density function for an F-distribution with the given
 * degrees of freedom df1 and df2. The F-distribution is the ratio of two chi-squared
 * distributions (?), and is used in ANOVA tests and other statistical analyses.
 * @param {*} df1 Degrees of freedom of the first distribution
 * @param {*} df2 Degrees of freedom of the second distribution
 * @returns 
 */
ProbabilityFunctions.F = function (df1, df2) {
  // Compute the probability density function for an F-distribution.
  // I am kind of tired of researching these distributions and their manual implementations.
  // So, I'm using a library for this one.

  function pdf(x) {
    // https://jstat.github.io/distributions.html#jStat.centralF
    return jStat.centralF.pdf(x, df1, df2);
  }

  return pdf;
}

/**
 * Returns the cumulative distribution function (CDF) for an F-distribution with the given
 * degrees of freedom df1 and df2. The CDF gives the probability that a random variable X 
 * will take a value LESS THAN OR EQUAL to x.
 * @param {*} df1 Degrees of freedom of the first distribution
 * @param {*} df2 Degrees of freedom of the second distribution
 * @returns
 */
ProbabilityFunctions.FCDF = function (df1, df2) {
  // Compute the cumulative distribution function for an F-distribution.

  function cdf(x) {
    // https://jstat.github.io/distributions.html#jStat.centralF
    return jStat.centralF.cdf(x, df1, df2);
  }
  
  return cdf;
}

/**
 * Returns the inverse cumulative distribution function (CDF) for an F-distribution
 * with the given degrees of freedom df1 and df2. The inverse CDF gives the value x such that
 * the probability that a random variable X will take a value LESS THAN OR EQUAL to x is p.
 * In other words, for a probability p, this function will return the value x
 * such that P(X ≤ x) = p.
 * @param {*} df1 Degrees of freedom of the first distribution
 * @param {*} df2 Degrees of freedom of the second distribution
 * @returns 
 */
ProbabilityFunctions.FInvCDF = function (df1, df2) {
  // Compute the inverse cumulative distribution function for an F-distribution.

  function icdf(p) {
    // https://jstat.github.io/distributions.html#jStat.centralF
    return jStat.centralF.inv(p, df1, df2);
  }

  return icdf;
}

/**
 * Returns the probability density function for a chi-squared distribution 
 * with the given degrees of freedom df. The chi-squared distribution is the
 * sum of the squares of df independent standard normal random variables.
 * @param {*} df 
 * @returns 
 */
ProbabilityFunctions.ChiSq = function (df) {
  // Compute the probability density function for a chi-squared distribution.

  function pdf(x) {
    // https://jstat.github.io/distributions.html#jStat.chisquare
    return jStat.chisquare.pdf(x, df);
  }

  return pdf;
}

/**
 * Returns the cumulative distribution function (CDF) for a chi-squared distribution
 * with the given degrees of freedom df. The CDF gives the probability that a random
 * variable X will take a value LESS THAN OR EQUAL to x.
 * @param {*} df 
 * @returns 
 */
ProbabilityFunctions.ChiSqCDF = function (df) {
  // Compute the cumulative distribution function for a chi-squared distribution.

  function cdf(x) {
    // https://jstat.github.io/distributions.html#jStat.chisquare
    return jStat.chisquare.cdf(x, df);
  }

  return cdf;
}

/**
 * Returns the inverse cumulative distribution function (CDF) for a chi-squared
 * distribution. The inverse CDF gives the value x such that the probability that
 * a random variable X will take a value LESS THAN OR EQUAL to x is p.
 * In other words, for a probability p, this function will return the value x
 * such that P(X ≤ x) = p.
 * @param {*} df 
 * @returns 
 */
ProbabilityFunctions.ChiSqInvCDF = function (df) {
  // Compute the inverse cumulative distribution function for a chi-squared distribution.

  function icdf(p) {
    // https://jstat.github.io/distributions.html#jStat.chisquare
    return jStat.chisquare.inv(p, df);
  }

  return icdf;
}













/**
 * Generates a probability distribution for a given probability function.
 * Will return an array of [x, p(x)] values for the given range.
 * Useful to plot the distribution.
 * @param {*} probFunc 
 * @param {*} start 
 * @param {*} end 
 * @param {*} step 
 * @returns 
 */
function computeProbabilityDistribution(probFunc, start = -1, end = 1, step = 0.1) {
  const distribution = [];
  for (let x = start; x <= end; x += step) {
    distribution.push([x, probFunc(x)]);
  }
  return distribution;
}





// ██╗███╗   ██╗███████╗███████╗██████╗ ███████╗███╗   ██╗ ██████╗███████╗
// ██║████╗  ██║██╔════╝██╔════╝██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝
// ██║██╔██╗ ██║█████╗  █████╗  ██████╔╝█████╗  ██╔██╗ ██║██║     █████╗  
// ██║██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║     ██╔══╝  
// ██║██║ ╚████║██║     ███████╗██║  ██║███████╗██║ ╚████║╚██████╗███████╗
// ╚═╝╚═╝  ╚═══╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
//                                                                        


/**
 * Contains a set of functions to perform statistical inference
 * on differente combinations of random variable types.
 */
class Inference {};


/**
 * Contains functions to estimate the sample size needed for a given 
 * confidence level and margin of error, for different combinations 
 * of random variable types.
 */
class SampleSize {};




/**
 * Computes theory-based inference for a Single Proportion. 
 * @param {*} sample The random RESPONSE variable sample.
 * @param {*} options Object with the following properties:
 * - success: The value of the success in the sample.
 * - null: The null hypothesis value for the proportion.
 * - confidence: The confidence level for the confidence interval.
 * - direction: The direction of the p-test and confidence interval: 
 *     "two-tailed", "greater", or "less".
 * @returns 
 */
Inference.Proportion = function (sample, options) {
  const successes = sample.filter(x => x === options.success);

  // Checks
  if (successes.length < 10 || sample.length - options.success.length < 10)
    console.log('Warning: at least 10 successes and 10 failures are recommended for a good approximation.');

  // Compute the sample proportion
  const p = successes.length / sample.length;

  // Compute values related to the null hypothesis
  // https://mcconvil.github.io/stat100s24/inference_summary.html
  const se = Math.sqrt(options.null * (1 - options.null) / sample.length);
  const z = zScore(p, options.null, se);
  const cdf = ProbabilityFunctions.StandardNormalCDF();
  const direction = options.direction || "two-tailed";
  let p_value;
  if (direction === "two-tailed")
    p_value = 2 * (1 - cdf(Math.abs(z)));  // two-tailed
  else if (direction === "less")
    p_value = cdf(z);  // less
  else if (direction === "greater")
    p_value = 1 - cdf(z);  // greater
    


  // Compute the confidence interval for the population proportion
  // (unrelated to the null hypothesis, but based on the sample proportion)
  const icdf = ProbabilityFunctions.NormalInvCDF(0, 1);
  let ci, ci_lower_bound, ci_upper_bound;
  if (direction === "two-tailed") {
    ci = icdf(options.confidence + 0.5 * (1 - options.confidence));
    ci_lower_bound = p - ci * se;
    ci_upper_bound = p + ci * se;
  } else if (direction === "less") {
    ci = icdf(options.confidence);
    ci_lower_bound = -Infinity;
    ci_upper_bound = p + ci * se;
  } else if (direction === "greater") {
    ci = icdf(options.confidence);
    ci_lower_bound = p - ci * se;
    ci_upper_bound = Infinity;
  }



  // const ci = icdf(options.confidence + 0.5 * (1 - options.confidence));
  // const ci_lower_bound = p - ci * se;
  // const ci_upper_bound = p + ci * se;

  return {
    ...options,
    p,
    se,
    z,
    p_value,
    direction,
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      p: `'The computed proportion p̂ of successes '${options.success}' in this sample: ${p.toFixed(3)}`,
      se: 'Assuming the null hypothesis is true, the estimated standard error in this sample is: ' + se.toFixed(3),
      z: 'Assuming the null hypothesis is true, the z-score for p̂ in this sample is: ' + z.toFixed(3) + ', which means p̂ is ' + z.toFixed(3) + ' Standard Errors away from the null, which is considered ' + (Math.abs(z) < 2 ? 'non-significant' : Math.abs(z) < 3 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      p_value: 'Assuming the null hypothesis is true, the p-value of p̂ in this sample is: ' + p_value.toFixed(3) + ', which is considered ' + (p_value > 0.05 ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      ci: 'The ' + options.confidence * 100 + '% confidence interval for the true proportion of successes in the population is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given this sample, we are ' + options.confidence * 100 + '% confident that the true proportion of successes in the population is within this interval.',
    }
  };
}

/**
 * Compute the theory-based Confidence Interval for a Single Proportion.
 * @param {*} successSize Number of successes in the sample.
 * @param {*} sampleSize Total sample size.
 * @param {*} confidence Target confidence level.
 * @param {*} direction ["two-tailed", "less", "greater"]
 * @returns 
 */
Inference.Proportion.ConfidenceInterval = function(successSize, sampleSize, confidence, direction = "two-tailed") {
  const proportion = successSize / sampleSize;
  const se = Math.sqrt(proportion * (1 - proportion) / sampleSize);
  const icdf = ProbabilityFunctions.NormalInvCDF(0, 1);
  let zstar, ci_lower_bound, ci_upper_bound;
  if (direction === "two-tailed") {
    zstar = icdf(confidence + 0.5 * (1 - confidence));
    ci_lower_bound = proportion - zstar * se;
    ci_upper_bound = proportion + zstar * se;
  } else if (direction === "less") {
    zstar = icdf(confidence);
    ci_lower_bound = -Infinity;
    ci_upper_bound = proportion + zstar * se;
  } else if (direction === "greater") {
    zstar = icdf(confidence);
    ci_lower_bound = proportion - zstar * se;
    ci_upper_bound = Infinity;
  }

  return {
    successSize,
    sampleSize,
    proportion,
    se,
    zstar,
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      proportion: `The computed proportion of successes in this sample is p̂ = ${successSize} / ${sampleSize} = ${proportion.toFixed(3)}`,
      se: `The estimated standard error in this sample is: ${se.toFixed(3)}`,
      ci: `The ${confidence * 100}% confidence interval for the true proportion of successes in the population is: [${ci_lower_bound.toFixed(3)}, ${ci_upper_bound.toFixed(3)}]. This means that, given this sample, we are ${confidence * 100}% confident that the true proportion of successes in the population is within this interval.`
    }
  };
}


/**
 * Estimate the sample size needed to achieve a given confidence level 
 * within a margin of error.
 * @param {*} confidence Desired level of confidence [0.0-1.0]
 * @param {*} me Desired margin of error on our interval. 
 * @param {*} p Estimated proportion of successes in the population. 
 * This value should be estimated from previous studies or pilot studies.
 * Use 0.5 as the most conservatible value if no previous information 
 * is available. 
 */
SampleSize.Proportion = function(confidence, me, p = 0.5) {
  const icdf = ProbabilityFunctions.NormalInvCDF(0, 1);
  const ci = icdf(confidence + 0.5 * (1 - confidence));

  const n = Math.ceil( ( p * (1 - p) * ci * ci) / (me * me) );
  return n;
}



/**
 * Computes theory-based inference for a Single Mean. 
 * @param {*} sample The random RESPONSE variable sample.
 * @param {*} options Object with the following properties:
 * - null: The null hypothesis value for the mean.
 * - confidence: The confidence level for the confidence interval.
 * @returns 
 */
Inference.Mean = function(sample, options) {
  // Checks
  if (sample.length < 30)
    console.log('Warning: at least 30 samples are recommended for a good approximation.');

  // Compute the sample mean
  const x = mean(sample);

  // Compute values related to the null hypothesis
  // https://mcconvil.github.io/stat100s24/inference_summary.html
  const s = standardDeviation(sample);
  const se = s / Math.sqrt(sample.length);
  const t = zScore(x, options.null, se);
  const df = sample.length - 1;
  const cdf = ProbabilityFunctions.TCDF(df);
  const p_value = 2 * cdf(-Math.abs(t));  // two-tailed
  const direction = "two-tailed";

  // Compute the confidence interval for the population mean
  // (unrelated to the null hypothesis, but based on the sample mean)
  const icdf = ProbabilityFunctions.TInvCDF(df);
  const ci = icdf(options.confidence + 0.5 * (1 - options.confidence));
  const ci_lower_bound = x - ci * se;
  const ci_upper_bound = x + ci * se;

  return {
    ...options,
    x,
    se,
    t,
    df,
    p_value,
    direction,
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      x: 'The computed mean x̄ of this sample: ' + x.toFixed(3),
      se: 'Assuming the null hypothesis is true, the estimated standard error in this sample is: ' + se.toFixed(3),
      t: 'Assuming the null hypothesis is true, the t-score for x̄ in this sample is: ' + t.toFixed(3) + ', which means x̄ is ' + t.toFixed(3) + ' Standard Errors away from the null, which is considered ' + (Math.abs(t) < 2 ? 'non-significant' : Math.abs(t) < 3 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      p_value: 'Assuming the null hypothesis is true, the p-value of x̄ in this sample is: ' + p_value.toFixed(3) + ', which is considered ' + (p_value > 0.05 ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      ci: 'The ' + options.confidence * 100 + '% confidence interval for the true mean of the population is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given this sample, we are ' + options.confidence * 100 + '% confident that the true mean of the population is within this interval.',
    }
  }
}

/**
 * Compute the theory-based Confidence Interval for a Single Mean.
 * @param {*} mean Sample mean
 * @param {*} sd Sample standard deviation
 * @param {*} n Sample size
 * @param {*} confidence Target confidence level
 * @param {*} direction ["two-tailed", "less", "greater"]
 * @returns 
 */
Inference.Mean.ConfidenceInterval = function(mean, sd, n, confidence, direction = "two-tailed") {
  // Confidence Interval only
  const se = sd / Math.sqrt(n);
  const icdf = ProbabilityFunctions.TInvCDF(n - 1);
  let tstar, ci_lower_bound, ci_upper_bound;
  if (direction === "two-tailed") {
    tstar = icdf(confidence + 0.5 * (1 - confidence));
    ci_lower_bound = mean - tstar * se;
    ci_upper_bound = mean + tstar * se;
  } else if (direction === "less") {
    tstar = icdf(confidence);
    ci_lower_bound = -Infinity;
    ci_upper_bound = mean + tstar * se;
  } else if (direction === "greater") {
    tstar = icdf(confidence);
    ci_lower_bound = mean - tstar * se;
    ci_upper_bound = Infinity;
  }
  
  return {
    mean, 
    sd,
    n,
    confidence,
    direction,
    se, 
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      ci: 'The ' + confidence * 100 + '% confidence interval for the true mean of the population is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given the mean and sd of this sample, we are ' + confidence * 100 + '% confident that the true mean of the population is within this interval.',
    }
  }
}


/**
 * Compute the theory-based Hypothesis Testing for a Single Mean.
 * @param {*} nullMean Null hypothesis mean μ
 * @param {*} altMean Alternative hypothesis mean μ
 * @param {*} altSd Alternative hypothesis standard deviation σ
 * @param {*} n Sample size
 * @param {*} direction ["two-tailed", "less", "greater"]
 * @returns 
 */
Inference.Mean.TestHypothesis = function(nullMean, altMean, altSd, n, direction = "two-tailed") { 
  // Hypothesis Testing only: figure out the t-score and p-value
  const se = altSd / Math.sqrt(n);
  const t = zScore(altMean, nullMean, se);
  const cdf = ProbabilityFunctions.TCDF(n - 1);
  let p_value;
  if (direction === "two-tailed") {
    p_value = 2 * cdf(-Math.abs(t));  // two-tailed
  }
  else if (direction === "less") {
    p_value = cdf(t);
  }
  else if (direction === "greater") {
    p_value = cdf(-t);
  }
  
  return {
    nullMean,
    altMean,
    altSd,
    n,
    direction,
    se,
    t,
    p_value,
    descriptions: {
      t: `Assuming the null hypothesis is true (μ_0 = ${nullMean}), the t-score for μ_a = ${altMean} in this sample is: ` + t.toFixed(3) + ', which means μ_a is ' + t.toFixed(3) + ' Standard Errors away from the null μ_0, which is considered ' + (Math.abs(t) < 2 ? 'non-significant' : Math.abs(t) < 3 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      p_value: `Assuming the null hypothesis is true (μ_0 = ${nullMean}), the p-value of μ_a = ${altMean} in this sample is p = ` + p_value.toFixed(3) + ', which is considered ' + (p_value > 0.05 ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'),
    }
  }
}





/**
 * Estimate the sample size needed to achieve a given confidence level 
 * within a margin of error.
 * NOTE: With the Mean we typically use the Student t-distribution. However, we would need to know sample size to determine degrees of freedom. So instead, we approximate the t-distribution with the Normal distribution, but will keep in mind that this will give us more conservative estimates of the population size. 
 * @param {*} confidence Desired level of confidence [0.0-1.0]
 * @param {*} me Desired margin of error on our interval. 
 * @param {*} s Estimated standard deviation of the population.
 * @returns 
 */
SampleSize.Mean = function(confidence, me, s) {
  // With the Mean we typically use the Student t-distribution.
  // However, we would need to know sample size to determine degrees of freedom. 
  // So instead, we approximate the t-distribution with the Normal distribution,
  // but will keep in mind that this will give us more conservative estimates
  // of the population size. 
  const icdf = ProbabilityFunctions.NormalInvCDF(0, 1);  // use Normal distribution as approximation
  const c = confidence + 0.5 * (1 - confidence);
  const ci = icdf(c);
  const n = Math.ceil( (s * s * ci * ci) / (me * me) );
  return n;
}


/**
 * Computes theory-based inference for Difference in Proportions. 
 * @param {*} sample A data frame with the two variables of interest.
 * @param {*} options An object with the following properties:
 * - variables: An array with the two variables of interest, e.g. ["USCitizen", "Married"]
 * - success: An array with the success values for each variable, e.g. [true, true]
 * - confidence: The confidence level for the confidence interval, e.g. 0.95
 * // - null: The null hypothesis value the proportions, e.g. 0.5 for equal proportions.
 * @returns 
 */
Inference.DifferenceInProportions = function(sample, options) {
  // Extract the two samples
  const x0 = sample.filter(x => x[options.variables[0]] != options.success[0]);
  const x1 = sample.filter(x => x[options.variables[0]] == options.success[0]);

  const x00 = x0.filter(x => x[options.variables[1]] != options.success[1]);
  const x01 = x0.filter(x => x[options.variables[1]] == options.success[1]);
  const x10 = x1.filter(x => x[options.variables[1]] != options.success[1]);
  const x11 = x1.filter(x => x[options.variables[1]] == options.success[1]);

  // // Log
  // console.log(`${options.variables[0]} (not) ${options.success[0]} & ${options.variables[1]} (not) ${options.success[1]}: ${x00.length}`);
  // console.log(`${options.variables[0]} (not) ${options.success[0]} & ${options.variables[1]} ${options.success[1]}: ${x01.length}`);
  // console.log(`${options.variables[0]} ${options.success[0]} & ${options.variables[1]} (not) ${options.success[1]}: ${x10.length}`);
  // console.log(`${options.variables[0]} ${options.success[0]} & ${options.variables[1]} ${options.success[1]}: ${x11.length}`);

  // Checks
  if (x00.length < 10 || x01.length < 10 || x10.length < 10 || x11.length < 10)
    console.log('Warning: at least 10 samples are recommended for a good approximation.');

  // Compute the sample proportions
  const p1 = x01.length / x0.length;  // success response over failed explanatory
  const p2 = x11.length / x1.length;  // success response over success explanatory

  // Compute values related to the null hypothesis
  // const se1sq = options.null * (1 - options.null) / x0.length;
  // const se2sq = options.null * (1 - options.null) / x1.length;

  // Compute values related to the null hypothesis
  // https://mcconvil.github.io/stat100s24/inference_summary.html
  // The null hypothesis is that the two proportions are equal, i.e. a value of 0. 
  // But this throws off the calculation of the standard error? 
  // If set to 0.5, it matches the results in class.
  // So maybe p_hat is an estimated value of the true proportion, being 50%?   
  const se1sq = 0.5 * (1 - 0.5) / x0.length;
  const se2sq = 0.5 * (1 - 0.5) / x1.length;
  const se = Math.sqrt(se1sq + se2sq);
  const z = zScore(p2 - p1, 0, se);
  const cdf = ProbabilityFunctions.NormalCDF(0, 1);
  const p_value = 2 * cdf(-Math.abs(z));  // two-tailed
  const direction = "two-tailed";

  // Compute the confidence interval for the difference in proportions
  // (unrelated to the null hypothesis, but based on the sample proportions)
  const icdf = ProbabilityFunctions.NormalInvCDF(0, 1);
  const ci = icdf(options.confidence + 0.5 * (1 - options.confidence));
  const ci_lower_bound = (p2 - p1) - ci * se;
  const ci_upper_bound = (p2 - p1) + ci * se;

  return {
    ...options,
    p1,
    p2,
    se,
    z,
    p_value,
    direction,
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      p1: `The proportion of successes (${options.variables[1]} == ${options.success[1]}) in the case (${options.variables[0]} != ${options.success[0]}) is p̂= ` + p1.toFixed(3),
      p2: `The proportion of successes (${options.variables[1]} == ${options.success[1]}) in the case (${options.variables[0]} == ${options.success[0]}) is p̂= ` + p2.toFixed(3),
      se: 'Assuming null to be no difference in proportions, the estimated standard error in this sample is: ' + se.toFixed(3),
      z: 'Assuming null to be no difference in proportions, the z-score for the difference in proportions is: ' + z.toFixed(3) + ', which means the difference in proportions is ' + z.toFixed(3) + ' Standard Errors away from the null, which is considered ' + (Math.abs(z) < 2 ? 'non-significant' : Math.abs(z) < 3 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      p_value: 'Assuming null to be no difference in proportions, the p-value of the difference in proportions is: ' + p_value.toFixed(3) + ', which is considered ' + (p_value > 0.05 ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      ci: 'The ' + options.confidence * 100 + '% confidence interval for the difference in proportions is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given this sample, we are ' + options.confidence * 100 + '% confident that the true difference in proportions is within this interval.',
    }
  } 

}



/**
 * Computes the theory-based inference for Difference in Means. 
 * @param {*} sample A data frame with the two variables of interest.
 * @param {*} options An object with the following properties:
 * - variables: An array with the two variables of interest, e.g. ["USCitizen", "HoursWk"]
 * - success: An array with the success value for the categorical variable, e.g. [true]
 * - confidence: The confidence level for the confidence interval, e.g. 0.95
 * @returns 
 */
Inference.DifferenceInMeans = function(sample, options) {
  // Extract the two samples:
  const x1 = sample.filter(x => x[options.variables[0]] != options.success[0]);
  const x2 = sample.filter(x => x[options.variables[0]] == options.success[0]);

  // Checks
  if (x1.length < 30 || x2.length < 30)
    console.log('Warning: at least 30 samples are recommended for a good approximation.');
    
  const x1response = x1.map(x => x[options.variables[1]]);
  const x2response = x2.map(x => x[options.variables[1]]);
  const x1mean = mean(x1response);
  const x2mean = mean(x2response);
  
  // // Log
  // console.log(`${options.variables[0]} (not) ${options.success[0]}: ${x0.length}, mean('${options.variables[1]}') = ${x0mean.toFixed(2)}`);
  // console.log(`${options.variables[0]} ${options.success[0]}: ${x1.length}, mean('${options.variables[1]}') = ${x1mean.toFixed(2)}`);

  // Compute values related to the null hypothesis
  // https://mcconvil.github.io/stat100s24/inference_summary.html
  const estimate = x2mean - x1mean;
  const s0 = standardDeviation(x1response);
  const s1 = standardDeviation(x2response);
  const se = Math.sqrt(s0 * s0 / x1.length + s1 * s1 / x2.length);
  const t = zScore(estimate, 0, se); 
  const df = Math.min(x1.length, x2.length) - 1;
  const cdf = ProbabilityFunctions.TCDF(df);
  const p_value = 2 * cdf(-Math.abs(t));  // two-tailed
  const direction = "two-tailed";

  // Compute the confidence interval for the difference in means
  const icdf = ProbabilityFunctions.TInvCDF(df);
  const ci = icdf(options.confidence + 0.5 * (1 - options.confidence));
  const ci_lower_bound = estimate - ci * se;
  const ci_upper_bound = estimate + ci * se;

  return {
    ...options,
    x1mean,
    x2mean,
    estimate,
    se,
    t,
    df,
    p_value,
    direction,
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      x1mean: `The mean of (${options.variables[1]}) for (${options.variables[0]} != ${options.success[0]}) is x̄= ` + x1mean.toFixed(3),
      x2mean: `The mean of (${options.variables[1]}) for (${options.variables[0]} == ${options.success[0]}) is x̄= ` + x2mean.toFixed(3),
      estimate: 'The estimated difference in means is: ' + estimate.toFixed(3),
      se: 'The estimated standard error in this sample is: ' + se.toFixed(3),
      t: 'The standardized test statistic `t` for the difference in means is: ' + t.toFixed(3) + ', which means the difference in means is ' + t.toFixed(3) + ' Standard Errors away from the null, which is considered ' + (Math.abs(t) < 2 ? 'non-significant' : Math.abs(t) < 3 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      p_value: 'The p-value of the difference in means is: ' + p_value.toFixed(3) + ', which is considered ' + (p_value > 0.05 ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      ci: 'The ' + options.confidence * 100 + '% confidence interval for the difference in means is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given this sample, we are ' + options.confidence * 100 + '% confident that the true difference in means is within this interval.',
    }
  }

}


/**
 * Computes the theory-based inference for Correlation.
 * @param {*} sample A data frame with the two variables of interest.
 * @param {*} options An object with the following properties:
 * - variables: An array with the two variables of interest, e.g. ["Age", "HoursWk"]
 * - confidence: The confidence level for the confidence interval, e.g. 0.95
 * - direction: The direction of the correlation, ["two-tailed" | "greater" | "less"]
 * @returns 
 */
Inference.Correlation = function(sample, options) {
  // Extract the two samples:
  const x = sample.map(x => x[options.variables[0]]);
  const y = sample.map(x => x[options.variables[1]]);

  // Checks
  if (x.length < 30 || y.length < 30)
    console.log('Warning: at least 30 samples are recommended for a good approximation.');
    
  // Compute the correlation coefficient
  const r = correlation(x, y);
  const df = x.length - 2;
  const se = Math.sqrt((1 - r * r) / df);
  const z = zScore(r, 0, se);
  const cdf = ProbabilityFunctions.TCDF(df);
  const direction = options.direction || "two-tailed";
  let p_value = 0;
  if (direction == "two-tailed")
    p_value = 2 * cdf(-Math.abs(z)); 
  else if (direction == "greater")
    p_value = 1 - cdf(z);
  else if (direction == "less")
    p_value = cdf(z);

  // Compute the confidence interval for the correlation coefficient
  const icdf = ProbabilityFunctions.TInvCDF(df);
  let ci, ci_lower_bound, ci_upper_bound;
  if (direction == "two-tailed") {
    ci = icdf(options.confidence + 0.5 * (1 - options.confidence));
    ci_lower_bound = r - ci * se;
    ci_upper_bound = r + ci * se;
  }
  else if (direction == "greater") {
    ci = icdf(options.confidence);
    ci_lower_bound = r - ci * se;
    ci_upper_bound = 1;
  } 
  else if (direction == "less") {
    ci = icdf(options.confidence);
    ci_lower_bound = -1;
    ci_upper_bound = r + ci * se;
  }  
 
  return {
    ...options,
    r,
    df,
    se,
    z,
    p_value,
    direction,
    ci_lower_bound,
    ci_upper_bound,
    descriptions: {
      r: `The computed correlation coefficient between the variables '${options.variables[0]}' and '${options.variables[1]}' is: ` + r.toFixed(3),
      se: 'The estimated standard error in this sample is: ' + se.toFixed(3),
      z: 'The z-score for the correlation coefficient is: ' + z.toFixed(3) + ', which means the correlation coefficient is ' + z.toFixed(3) + ' Standard Errors away from the null, which is considered ' + (Math.abs(z) < 2 ? 'non-significant' : Math.abs(z) < 3 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      p_value: 'The p-value of the correlation coefficient is: ' + p_value.toFixed(3) + ', which is considered ' + (p_value > 0.05 ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'),
      ci: 'The ' + options.confidence * 100 + '% confidence interval for the correlation coefficient is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given this sample, we are ' + options.confidence * 100 + '% confident that the true correlation coefficient is within this interval.',
    }
  }
}


/**
 * Computes a theory-based One-Way ANOVA test on the sample. 
 * This test is used to compare the means of two or more groups.
 * @param {*} sample A data frame with the two variables of interest.
 * @param {*} options An object with the following properties:
 * - variable: The name of the quantitative variable of interest, e.g. "AudienceScore"
 * - category: The name of the category variable, e.g. "Genre"
 * - groups: An array with the group names, e.g. ["Action", "Comedy", "Drama"]. 
 *   If not provided, the unique values of the category variable will be used.
 * - alpha: The significance level for the test (default = 0.05)
 * @returns 
 */
Inference.ANOVA = function(sample, options) {
  // Use optional group names or use unique values of the category variable
  const groupValues = options.groups || unique(sample.map(d => d[options.category]));
  const alpha = options.alpha || 0.05;

  // Extract the groups per category
  const groups = groupValues.map(group => sample.filter(d => d[options.category] == group));

  // Checks
  groups.forEach((group, i) => {
    if (group.length < 30)
      console.log(`Warning: at least 30 samples in '${groupValues[i]}' are recommended for a good approximation.`);
  });

  // Compute the F coefficient
  const test_statistic = fValue(sample, options);
  const n = groups.reduce((acc, group) => acc + group.length, 0);
  const df1 = groups.length - 1;
  const df2 = n - groups.length;
  const cdf = ProbabilityFunctions.FCDF(df1, df2);
  const direction = "greater";
  let p_value = 0;
  // NO DIRECTIONS, doesn't make a lot of sense fir ANOVA (right-skewed distribution)
  // if (direction == "greater")
    p_value = 1 - cdf(test_statistic);
  // else if (direction == "less")
  //   p_value = cdf(test_statistic);
  // else if (direction == "two-tailed")
  //   p_value = 2 * (1 - cdf(test_statistic));



  // I don't know if computing this without a SE makes sense...
  // // Compute the confidence interval for the F coefficient
  // const icdf = ProbabilityFunctions.FInvCDF(df1, df2);
  // let ci, ci_lower_bound, ci_upper_bound;
  // if (direction == "two-tailed") {
  //   ci = icdf(opts.confidence + 0.5 * (1 - opts.confidence));
  //   ci_lower_bound = test_statistic - ci;
  //   ci_upper_bound = test_statistic + ci;
  // }
  // else if (direction == "greater") {
  //   ci = icdf(opts.confidence);
  //   ci_lower_bound = test_statistic;
  //   ci_upper_bound = Infinity;
  // }
  // else if (direction == "less") {
  //   ci = icdf(opts.confidence);
  //   ci_lower_bound = 0;
  //   ci_upper_bound = test_statistic;
  // }

  return {
    ...options,
    test_statistic,
    n,
    df1,
    df2,
    direction,
    p_value,
    alpha,
    // ci_lower_bound,
    // ci_upper_bound,
    descriptions: {
      test_statistic: 'The computed F coefficient for the ANOVA test is: ' + test_statistic.toFixed(3),
      p_value: `The p-value of the F coefficient is: ${p_value.toFixed(3)}, which is considered ${p_value > alpha ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'}. This means that, given this sample, we are ${p_value > alpha ? 'NOT CONFIDENT' : p_value > 0.01 ? 'MODERATELY CONFIDENT' : 'VERY CONFIDENT'} that we can reject the null hypothesis of all the means of categories ${JSON.stringify(groupValues)} in the explanatory variable "${options.category}" being equal. Or in other words, the variables "${options.variable}" and "${options.category}" are ${p_value > alpha ? 'INDEPENDENT' : 'DEPENDENT'}.`,
      // ci: 'The ' + opts.confidence * 100 + '% confidence interval for the F coefficient is: [' + ci_lower_bound.toFixed(3) + ', ' + ci_upper_bound.toFixed(3) + ']. This means that, given this sample, we are ' + opts.confidence * 100 + '% confident that the true F coefficient is within this interval.',
    }
  }
}


/**
 * Computes a theory-based Chi-Squared test on the sample.
 * This test is used to determine whether there is a significant association 
 * between two categorical variables.
 * @param {*} sample A data frame with the two variables of interest.
 * @param {*} options An object with the following properties:
 * - explanatory: The name of the explanatory variable, e.g. "Lighting"
 * - response: The name of the response variable, e.g. "Eye"
 * @returns 
 */
Inference.ChiSquared = function(sample, options) {
  const alpha = options.alpha || 0.05;

  // Count each combination of categories
  const counts = countByValueCombination(sample, [options.response, options.explanatory]);
  print(counts);

  // Check if there are at least 5 samples in each category
  const min_samples = Math.min(...Object.values(counts).map(d => Math.min(...Object.values(d))));
  if (min_samples < 5)
    console.log(`Warning: at least 5 samples in each category are recommended for a good approximation.`);


  // Compute the χ² coefficient 
  const test_statistic = chiSquared(sample, options);

  // Compute the p-value
  const k = unique(sample.map(d => d[options.explanatory])).length;
  const j = unique(sample.map(d => d[options.response])).length;
  const df = (k - 1) * (j - 1);
  const cdf = ProbabilityFunctions.ChiSqCDF(df);
  const direction = "greater";
  const p_value = 1 - cdf(test_statistic);

  return {
    ...options,
    alpha,
    test_statistic,
    k, j, df, direction, p_value,
    descriptions: {
      test_statistic: 'The computed χ² coefficient for the Chi-Squared test is: ' + test_statistic.toFixed(3),
      p_value: `The p-value of the χ² coefficient is: ${p_value.toFixed(3)}, which is considered ${p_value > alpha ? 'non-significant' : p_value > 0.01 ? 'UNUSUAL' : 'VERY UNUSUAL'}. This means that the null hypothesis of independence between the two variables '${options.explanatory}' and '${options.response}' is ${p_value > alpha ? 'NOT REJECTED' : 'REJECTED'}.`
    }
  }
}



















// ███████╗██╗  ██╗██████╗  ██████╗ ██████╗ ████████╗
// ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
// █████╗   ╚███╔╝ ██████╔╝██║   ██║██████╔╝   ██║   
// ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║██╔══██╗   ██║   
// ███████╗██╔╝ ██╗██║     ╚██████╔╝██║  ██║   ██║   
// ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
//                                                   

// A quick library of statistical functions in JavaScript.
// Mostly for me to understant the concepts, 
// all of this is probably super implemented in NP. 
module.exports = {
  TAU,
  SQRT_TAU,
  extremes,
  unique,
  countByValueCombination,
  sum,
  mean,
  meanDistribution,
  median,
  mode,
  meanDeviation,
  variance,
  varianceDistribution,
  standardDeviation,
  standardDeviationDistribution,
  // unique,
  ratio,
  quantile,
  histogram,
  factorial,
  sumOfSquaresTotal,
  sumOfSquaresGroup,
  sumOfSquaresError,
  meanSquareGroup,
  meanSquareError,
  fValue,
  chiSquared,
  SST,
  SSG,
  SSE,
  MSG,
  MSE,
  F,

  createObjectArray,

  covariance,
  correlation,
  leastSquaresRegression,
  linearRegressionModel,
  rSquared,
  sample,
  sampleWithReplacement,
  bootstrapSamples,
  bootstrap,
  confidenceInterval,
  confidenceIntervalSE,
  randomSeed,
  random,
  randomStandardNormal,
  randomStandardNormalSamples,
  nullDistribution,
  nullDistributionMulti,
  nullDistributionANOVA,
  nullDistributionChiSquared,

  pValue,
  power,
  zScore,
  zScorer,

  ProbabilityFunctions,
  computeProbabilityDistribution,

  Inference,
  SampleSize,
};