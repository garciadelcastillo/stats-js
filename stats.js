
module.exports = {
  sum,
  mean,
  median,
  meanDeviation,
  variance,
  standardDeviation,
  covariance,
  correlation,
};


/**
 * Computes the sum of a list of numbers as Σxi.
 * @param {*} array 
 * @returns 
 */
function sum(array) { 
  return array.reduce((a, b) => a + b, 0);
}

/**
 * Computes the average of a list of numbers, 
 * computed as x̄ = Σxi / n
 * @param {*} array 
 * @returns 
 */
function mean(array) {
  return sum(array) / array.length;
}

/**
 * Returns the median of a list of numbers.
 * @param {*} array 
 * @returns 
 */
function median(array) {
  const sorted = array.toSorted((a, b) => b - a);
  const length = sorted.length;
  if (length % 2 == 0) {
    return (sorted[length / 2] + sorted[(length / 2) - 1]) / 2;
  } else {
    return sorted[Math.floor(length / 2)];
  }
}

/**
 * Computes the average deviation of a list of numbers,
 * computed as Σ|xi - x̄| / n
 * @param {*} array 
 * @returns 
 */
function meanDeviation(array) {
  const avg = mean(array);
  // return mean(array.map(value => Math.abs(value - avg)));
  
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += Math.abs(array[i] - avg);
  }
  return sum / array.length;
}

/**
 * Returns the _sample variance_ `s²` or `var` of a list of values,
 * computed as s² = Σ(x - x̄)² / (n - 1). 
 * @param {*} array 
 * @returns 
 */
function variance(array) {
  // Diff between _sample_ and _polulation_ variance:
  // https://www.ncl.ac.uk/webtemplate/ask-assets/external/maths-resources/statistics/descriptive-statistics/variance-and-standard-deviation.html
  const avg = mean(array);
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += Math.pow(array[i] - avg, 2);
  }
  return sum / (array.length - 1);
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
 * Returns the _sample_ covariance `cov` of two lists of values,
 * computed as cov(x, y) = Σ(xi - x̄)(yi - ȳ) / (n - 1).
 * The covariance value can range from -∞ to +∞, 
 * with a negative value indicating a negative relationship 
 * and a positive value indicating a positive relationship.
 * See more here: https://www.simplilearn.com/covariance-vs-correlation-article
 * @param {*} array1 
 * @param {*} array2 
 * @returns 
 */
function covariance(array1, array2) {
  if (array1.length !== array2.length) {
    throw new Error('Arrays must have the same length');
  }
  const avg1 = mean(array1);
  const avg2 = mean(array2);
  let sum = 0;
  for (let i = 0; i < array1.length; i++) {
    sum += (array1[i] - avg1) * (array2[i] - avg2);
  }
  return sum / (array1.length - 1);
}


/**
 * Returns the _sample_ coefficient of correlation `cor` of two lists of values,
 * computed as cor(x, y) = cov(x, y) / (σx * σy).
 * The correlation value can range from -1 to +1, 
 * with sign indicates the direction of the relationship,
 * and the magnitude indicates the strength of the linear relationship.
 * @param {*} array1 
 * @param {*} array2 
 * @returns 
 */
function correlation(array1, array2) {
  return covariance(array1, array2) / (standardDeviation(array1) * standardDeviation(array2));
}