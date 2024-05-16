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
Array.prototype.compute = function (f) {
    return f(this);
}
// Array.prototype.compute = (f) => f(this);  // interesting! `this` is not defined here! MDN docs: "Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods."





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
let randomSample = Array.from({
    length: 100000
}, Math.random);
print("Math.random(): ", randomSample.slice(0, 10));
print("  Extremes: ", stats.extremes(randomSample));
print("  Mean of random sample: ", stats.mean(randomSample));
print("  Standard deviation of random sample: ", stats.standardDeviation(randomSample));
print();

// Pseudo-random number generators (PRNGs) in JavaScript:
//  Math.random() cannot be seeded, so I implemented a simple PRNG that can be seeded.
stats.randomSeed(1000);
randomSample = Array.from({
    length: 100000
}, stats.random);
print("SplitMix32: ", randomSample.slice(0, 10));
print("  Extremes: ", stats.extremes(randomSample));
print("  Mean of random sample: ", stats.mean(randomSample));
print("  Standard deviation of random sample: ", stats.standardDeviation(randomSample));
// The first value of the sequence above should be 0.2110681121... for seed 1000


// RANDOM STANDARD NORMAL NUMBERS
// Generating random standard normal numbers using the Box-Muller transform.
stats.randomSeed(Date.now() * Math.random());
randomSample = Array.from({
    length: 100000
}, stats.randomStandardNormal);
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
let test_stat = stats.mean(livingAreas);

print("  Living areas of 5-bedroom houses: ", livingAreas);
print("  Extremes: ", stats.extremes(livingAreas));
print("  Mean living area of 5-bedroom houses: ", test_stat);
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
    null: "point",
    point: 2700,
    statistic: "mean"
});
print("nullDistribution: ", null_dist);
print("  Extremes: ", stats.extremes(null_dist));
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
let p_value = stats.pValue(null_dist, test_stat, "two-sided");
// let p_value = stats.pValue(null_dist, test_stat, "two-sided", {nullValue: 2700});
print("  p-value: ", p_value);
print("  Is the p-value significant at the 0.05 level? ", p_value < 0.05);
print("");

print(`The two-sided $p$-value is ${p_value}. If the mean living area for all 5-bedroom homes in Saratoga was 2700 sqft, there would only be a ${p_value} probability that the observed sample had a mean living area smaller than ${Math.round(test_stat,0)} or larger than ${Math.round(2700 + (2700 - test_stat))} sqft. Estimating the significance level at $\alpha = 0.05$, this is evidence to reject $H_0$ and suggest that the mean living area for all 5-bedroomers in Saratoga is _different_ than 2700 sqft.1)`);
print("");
print("");


print("2. Do these data suggest that houses which include waterfront are on average more expensive than those that do not? Conduct a hypothesis test and summarize the findings.")

test_stat = saratogaHouses
    .filter(house => house['waterfront'] == "Yes")
    .map(house => parseInt(house['price']))
    .compute(stats.mean) -
    saratogaHouses
    .filter(house => house['waterfront'] == "No")
    .map(house => parseInt(house['price']))
    .compute(stats.mean);
print("  Observed mean difference in price of waterfront houses: ", test_stat);

null_dist = stats.nullDistributionMulti([
    saratogaHouses.map(house => parseInt(house['price'])), // response var
    saratogaHouses.map(house => house['waterfront']) // explanatory var  
], 1000, {
    null: "independence",
    statistic: "diff in means",
    types: ["numerical", "categorical"], // in [res, exp] order
    order: ["Yes", "No"] // order of categories for diff in means: [0] - [1]
});
p_value = stats.pValue(null_dist, test_stat, "greater");

print("  nullDistribution: ", null_dist);
print("  p-value: ", p_value);
print();
print("The null distribution de-correlates waterfront var from price by combining all possible values from the samples, i.e. any observed house (WF or not) can have any observed price. The mean of the null dist is centers around 0, which makes sense if there is no correlation. The test stat (diff in means) is at ~160k. The p-value of this test stat is 0. This suggests that, if $H_0$ were true, there would be a 0 probability of the diff in mean prices between WF and no WF being equal or larger than ~160k. This gives us evidence to reject $H_0$ and accept the hypothesis (at alpha = 0.05) that WF houses are on average more expensive than not, from the sample. ");
print();
print();



print("3. Do these data suggest that houses that are a new construction are more likely to have central air than houses which are not? Conduct a hypothesis test and summarize your findings.");


print("  Number of houses NEW construction: ", saratogaHouses.filter(house => house['newConstruction'] == "Yes").length);
print("  Number of houses OLD construction: ", saratogaHouses.filter(house => house['newConstruction'] == "No").length);

// This was entirely co-piloted lol... my job is going to be SO displaced 😅
test_stat = saratogaHouses
    .filter(house => house['centralAir'] == "Yes" && house['newConstruction'] == "Yes")
    .length /
    saratogaHouses
    .filter(house => house['newConstruction'] == "Yes")
    .length -
    saratogaHouses
    .filter(house => house['centralAir'] == "Yes" && house['newConstruction'] == "No")
    .length /
    saratogaHouses
    .filter(house => house['newConstruction'] == "No")
    .length;
print("  Observed difference in proportions of central air in new construction vs not: ", test_stat);
print();


print("JLX: This is a test of proportions. We will use the difference in proportions as the test statistic. The null hypothesis is that the proportion of houses with central air is the same for new and old construction houses. The alternative hypothesis is that the proportion of houses with central air is higher for new construction houses than for old construction houses. We will use a one-sided test to test this hypothesis. The test statistic is the difference in proportions of houses with central air between new and old construction houses. We will use a significance level of 0.05.");
print();
print("JLX: the null distribution is built permutating all possible combinations of new/old construction and yes/no AC. We measure ratio differences and compute p-value.");
print();

null_dist = stats.nullDistributionMulti([
    saratogaHouses.map(house => house['centralAir']) // response var
    .map(val => val == "Yes" ? "AC" : "NoAC"),
    saratogaHouses.map(house => house['newConstruction']) // explanatory var  
], 1000, {
    null: "independence",
    statistic: "diff in proportions",
    order: [
        ["AC", "NoAC"],
        ["Yes", "No"]
    ] // order of categories for diff in props for exp var: [0] - [1]
});
p_value = stats.pValue(null_dist, test_stat, "greater");

print("  nullDistribution: ", null_dist);
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print("  p-value: ", p_value);
if (p_value < 0.05) {
    print(`Since the p-value ${p_value} is less than 0.05, we reject the null hypothesis and conclude that the proportion of houses with central air is higher for new construction houses than for old construction houses.`);
} else {
    print(`Since the p-p-value ${p_value} is greater than or equal to 0.05, we cannot reject the null hypothesis (nor confirm it).`);
}
print();
print();
print();