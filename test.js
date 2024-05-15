// I should probably try http://simple-statistics.github.io/docs/

const fs = require('fs');
const csv = require('csv-parse/sync');
const stats = require('./stats.js');
const print = console.log;

/**
 * Applies the function f to the entire array, returning the result.
 * This is equivalent to passing the entire array as an argument to the function.
 * @param {*} f 
 * @returns 
 */
Array.prototype.compute = (f) => f(this);





const colleges = csv.parse(fs.readFileSync('sample_data/colleges.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});
console.log(colleges[0]);
console.log("");


const numsA = [1, 2, 3, 4, 5];
// console.log("The average of the numbers is: ", stats.mean(numsA));
// console.log("The median of the numbers is: ", stats.median(numsA));
// console.log("Mean deviation of numsA: ", stats.meanDeviation(numsA));

const numsB = [1, 2, 3, 4, 5];
console.log("Variance of numsB: ", stats.variance(numsB));
console.log("Covariance of numsA & numsB: ", stats.covariance(numsA, numsB));
console.log("Correlation of numsA & numsB: ", stats.correlation(numsA, numsB));
console.log("");


// Fun! 
// Create a linear regression model between two points
// with coords [x0, x1] and [y0, y1]
const simple_lm = stats.leastSquaresRegression([0, 1], [0, 0.5]);
const simple_predict = stats.linearRegressionModel(simple_lm);
console.log("NumsA: ", numsA);
console.log("Predictions for numbers A:", numsA.map(simple_predict));
console.log("");






// From Pset5: 

// term
// <chr>	
// estimate
// <dbl>
// std_error
// <dbl>
// statistic
// <dbl>
// p_value
// <dbl>
// lower_ci
// <dbl>
// upper_ci
// <dbl>
// intercept	69760.15	5349.728	13.04	0	59138.135	80382.154
// log_endow_pc	-4566.66	438.271	-10.42	0	-5436.856	-3696.463
console.log("ENDOWMENT vs NET TUITION");
const endowments = colleges.map(college => parseFloat(college['fy2016_endowment_pc']));
// console.log(endowments);
console.log("Average endowment per student: ", stats.mean(endowments));
console.log("Median endowment per student: ", stats.median(endowments));
console.log("Mean deviation of endowments: ", stats.meanDeviation(endowments));
console.log("Standard deviation of endowments: ", stats.standardDeviation(endowments));
console.log("Variance of endowments: ", stats.variance(endowments));

const logEndowments = colleges.map(college => parseFloat(college['log_endow_pc']));
const netTuition = colleges.map(college => parseInt(college['scorecard_netprice_2013']));
// console.log(logEndowments);
// console.log(netTuition);
console.log("Covariance of logEndowments and net tuition: ", stats.covariance(logEndowments, netTuition));
console.log("Correlation of logEndowments and net tuition: ", stats.correlation(logEndowments, netTuition));


const tuition_lm = stats.leastSquaresRegression(logEndowments, netTuition);
console.log("Least squares regression: ", tuition_lm);

const tuition_predict = stats.linearRegressionModel(tuition_lm);
// console.log("Predictions for net tuition: ", netTuition.map(tuition_predict));
const tuition_r2 = stats.rSquared(logEndowments, netTuition, tuition_predict);
console.log("R^2: ", tuition_r2);
console.log("");



// Inference and Estimation
console.log("INFERENCE AND ESTIMATION");
const saratogaHouses = csv.parse(fs.readFileSync('sample_data/saratogahouses.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});

const prices = saratogaHouses.map(house => parseInt(house['price']));
const meanPrice = stats.mean(prices);
console.log("Saratoga house price mean: ", meanPrice);
const price_mean_bs_dist = stats.bootstrap(prices, 1000, stats.mean);
console.log("Saratoga BOOTSTRAPPED house price MEAN: ", stats.mean(price_mean_bs_dist));
const price_mean_ci = stats.confidenceInterval(price_mean_bs_dist, 0.95);
console.log(`Saratoga house price mean ${price_mean_ci.level*100}% CI (percentile): `, price_mean_ci);
const price_mean_ci_se = stats.confidenceIntervalSE(price_mean_bs_dist, 0.95);
console.log(`Saratoga house price mean ${price_mean_ci_se.level*100}% CI (standard error): `, price_mean_ci_se);

const medianPrice = stats.median(prices);
console.log("Saratoga house price median: ", medianPrice);
const price_median_bs_dist = stats.bootstrap(prices, 1000, stats.median);
console.log("Saratoga BOOTSTRAPPED house price MEDIAN: ", stats.mean(price_median_bs_dist));
console.log("");
console.log("");














// ██╗    ██╗██████╗  █████╗ ██████╗       ██╗   ██╗██████╗      █████╗ 
// ██║    ██║██╔══██╗██╔══██╗██╔══██╗      ██║   ██║██╔══██╗    ██╔══██╗
// ██║ █╗ ██║██████╔╝███████║██████╔╝█████╗██║   ██║██████╔╝    ╚██████║
// ██║███╗██║██╔══██╗██╔══██║██╔═══╝ ╚════╝██║   ██║██╔═══╝      ╚═══██║
// ╚███╔███╔╝██║  ██║██║  ██║██║           ╚██████╔╝██║          █████╔╝
//  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝            ╚═════╝ ╚═╝          ╚════╝ 
//                                                                      
// Replication of the class wrap-up 9 exercise

// PRE-WRAP-UP 9 EXERCISE
// A few small considerations before starting the exercise...

// RANDOM NUMBERS
print("RANDOM NUMBERS")
let randomSample = Array.from({length: 100000}, Math.random);
print("Math.random(): ", randomSample.slice(0, 10));
print("  Extremes: ", stats.extremes(randomSample));
print("  Mean of random sample: ", stats.mean(randomSample));
print("  Standard deviation of random sample: ", stats.standardDeviation(randomSample));
print();

// Pseudo-random number generators (PRNGs) in JavaScript:
//  Math.random() cannot be seeded, so I implemented a simple PRNG that can be seeded.
stats.randomSeed(1000);
randomSample = Array.from({length: 100000}, stats.random);
print("SplitMix32: ", randomSample.slice(0, 10));
print("  Extremes: ", stats.extremes(randomSample));
print("  Mean of random sample: ", stats.mean(randomSample));
print("  Standard deviation of random sample: ", stats.standardDeviation(randomSample));
// The first value of the sequence above should be 0.2110681121... for seed 1000


// RANDOM STANDARD NORMAL NUMBERS
// Generating random standard normal numbers using the Box-Muller transform.
stats.randomSeed(Date.now() * Math.random());
randomSample = Array.from({length: 100000}, stats.randomStandardNormal);
print("Random Standard Normal: ", randomSample.slice(0, 10));
print("  Extremes: ", stats.extremes(randomSample));
print("  Mean of random sample: ", stats.mean(randomSample));
print("  Standard deviation of random sample: ", stats.standardDeviation(randomSample));

// This is the foundation of null distributions:
const test_null_distribution = stats.randomStandardNormalSamples(1000, 10, 2.5);
print("test: ", test_null_distribution.slice(0, 10));
print("  Extremes: ", stats.extremes(test_null_distribution));
print("  Mean of test: ", stats.mean(test_null_distribution));
print("  Standard deviation of test: ", stats.standardDeviation(test_null_distribution));
print("");
print()
print()




print("WRAP-UP 9 EXERCISE");

print("1. Let's investigate mean house living area (`livingArea`) based on the sample of houses in the `SaratogaHouses` dataset. Suppose we are interested in investigating whether 5-bedroom houses in Saratoga County have mean living area different from 2700 sq. ft.");

print("b) Compute the observed test statistic. Interpret the observed test statistic in the context of the data.");

const livingAreas = saratogaHouses
    .filter(house => parseInt(house['bedrooms']) == 5)
    .map(house => parseInt(house['livingArea']))

print("  Living areas of 5-bedroom houses: ", livingAreas);
print("  Extremes: ", stats.extremes(livingAreas));
print("  Mean living area of 5-bedroom houses: ", stats.mean(livingAreas));
print("  Standard deviation of living area of 5-bedroom houses: ", stats.standardDeviation(livingAreas));
print("");




print("c) Generate the null distribution and compute a $p$-value. Interpret the $p$-value in the context of the data.")
print("  JLX: creating a null distribution here means creating a random sample of living areas whose mean is 2700 sqft (as per the above).")
print()


// JL: Originally, I thought this was done by generating random standard normal numbers and then transforming them to the desired mean and standard deviation, the desired SD being the samepl as the original sample. 
// let null_dist = stats.randomStandardNormalSamples(1000, 2700, 100);
// print("nullDistribution: ", null_dist);
// print("  Extremes: ", stats.extremes(null_dist));
// print("  Mean of null distribution: ", stats.mean(null_dist));
// print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
// print("");


// JL: however, digging a little deeper, turns out the `infer` package in R does it by bootstrapping the original sample and shifting the values by the mean differnce! 
// Doing this yields similar results to what I got in R.
let null_dist = stats.nullDistribution(livingAreas, 1000, {
    type: "point",
    point: 2700,
    statistic: "mean"
});
print("nullDistribution: ", null_dist);
print("  Extremes: ", stats.extremes(null_dist));
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print("");



