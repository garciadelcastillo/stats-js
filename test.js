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

const endowments = colleges.map(college => parseFloat(college['fy2016_endowment_pc']));
// console.log(endowments);
console.log("Average endowment per student: ", stats.mean(endowments));
console.log("Median endowment per student: ", stats.median(endowments));
console.log("Mean deviation of endowments: ", stats.meanDeviation(endowments));
console.log("Standard deviation of endowments: ", stats.standardDeviation(endowments));
console.log("Variance of endowments: ", stats.variance(endowments));

const logEndowments = colleges.map(college => parseFloat(college['log_endow_pc']));
const netTuition = colleges.map(college => parseInt(college['scorecard_netprice_2013']));
console.log(logEndowments);
console.log(netTuition);
const lm = stats.leastSquaresRegression(logEndowments, netTuition);
console.log("Least squares regression: ", lm);
