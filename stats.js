// A quick library of statistical functions in JavaScript.
// Mostly for me to understant the concepts, 
// all of this is probably super implemented in NP. 
module.exports = {
  sum,
  mean,
  median,
  meanDeviation,
  variance,
  standardDeviation,
  covariance,
  correlation,
  leastSquaresRegression,
  linearRegressionModel,
  rSquared,
};


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
 * computed as x̄ = Σxi / n
 * @param {*} x 
 * @returns 
 */
function mean(x) {
  return sum(x) / x.length;
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
  // Diff between _sample_ and _polulation_ varian0ce:
  // https://www.ncl.ac.uk/webtemplate/ask-assets/external/maths-resources/statistics/descriptive-statistics/variance-and-standard-deviation.html
  const avg = mean(x);
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += Math.pow(x[i] - avg, 2);
  }
  return sum / (x.length - 1);
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
 * Returns the _sample_ coefficient of correlation `cor` of two lists of values,
 * computed as cor(x, y) = cov(x, y) / (σx * σy).
 * The correlation value can range from -1 to +1, 
 * with sign indicates the direction of the relationship,
 * and the magnitude indicates the strength of the linear relationship.
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
 * @param {*} x 
 * @param {*} y 
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

  return { m, b };
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

  const adjustFactor = (x.length - 1) / (x.length - 1 - 1);

  const r2 = 1 - (sumResiduals2 / sumY2);
  const r2adj = 1 - (sumResiduals2 / sumY2) * adjustFactor;

  // // R2 can also be computed as:
  // // r2 = var(ŷ) / var(y)
  // const r2Alt = variance(x.map(model)) / variance(y);
  // console.log("R2: " + r2);
  // console.log("R2 alt: " + r2Alt);
  
  return { r2, r2adj };
}
