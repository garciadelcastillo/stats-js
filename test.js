// I should probably try http://simple-statistics.github.io/docs/

// const nj = require('numjs');
const fs = require('fs');
const csv = require('csv-parse/sync');
const stats = require('./stats.js');


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
