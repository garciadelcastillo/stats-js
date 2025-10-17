// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                                                         

// I should probably try http://simple-statistics.github.io/docs/
const print = console.log;
const fs = require('fs');
const csv = require('csv-parse/sync');
const stats = require('./stats.js');



//  ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗███████╗
// ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║     ███████║███████║██████╔╝   ██║   ███████╗
// ██║     ██╔══██║██╔══██║██╔══██╗   ██║   ╚════██║
// ╚██████╗██║  ██║██║  ██║██║  ██║   ██║   ███████║
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                   

// https://github.com/tool3/chartscii
const Chartscii = require('chartscii');
const { privateDecrypt } = require('crypto');
/**
 * Default options for the Chartscii histogram.
 */
const default_chart_options = {
    title: "Histogram",
    width: 100,
    height: 20,
    theme: "pastel",
    // color: "marine",
    // color: "orange",
    colorLabels: false,
    // barSize: 5,
    orientation: "vertical",
    // orientation: "horizontal",
    decimals: 4,
    // percentage: true,
};

const default_histogram_options = {
    logErrors: false,
}

/**
 * Wrapper function to plot a histogram using Chartscii.
 * @param {*} data 
 * @param {*} binSize 
 * @param {*} start 
 * @param {*} end 
 * @param {*} options 
 */
const plotHistogram = function (data, options) {
    const histogram_data = stats.histogram(data, {
        ...default_histogram_options,
        ...options
    });
    const chart_options = {
        ...default_chart_options,
        ...options
    };
    print((new Chartscii(histogram_data, chart_options)).create());
    return histogram_data;
}


//  █████╗ ██████╗ ██████╗  █████╗ ██╗   ██╗███████╗
// ██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██╔════╝
// ███████║██████╔╝██████╔╝███████║ ╚████╔╝ ███████╗
// ██╔══██║██╔══██╗██╔══██╗██╔══██║  ╚██╔╝  ╚════██║
// ██║  ██║██║  ██║██║  ██║██║  ██║   ██║   ███████║
// ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                                                  
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








// ███████╗████████╗ █████╗ ██████╗ ████████╗
// ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝
// ███████╗   ██║   ███████║██████╔╝   ██║   
// ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   
// ███████║   ██║   ██║  ██║██║  ██║   ██║   
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
//                                           


print(`
// ██████╗ ███████╗███████╗██████╗ ███████╗███████╗██╗  ██╗███████╗██████╗ 
// ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝██║  ██║██╔════╝██╔══██╗
// ██████╔╝█████╗  █████╗  ██████╔╝█████╗  ███████╗███████║█████╗  ██████╔╝
// ██╔══██╗██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ╚════██║██╔══██║██╔══╝  ██╔══██╗
// ██║  ██║███████╗██║     ██║  ██║███████╗███████║██║  ██║███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
//                                                                           

// A file to refresh the memory on the basic concepts of statistics.
`);

const saratogaHouses = csv.parse(fs.readFileSync('sample_data/saratogahouses.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});


print("Let's plot the histogram of the prices of the houses in Saratoga:");
let prices = saratogaHouses.map(row => parseInt(row.price));
plotHistogram(prices, {
    title: "Histogram of Prices of Houses in Saratoga",
    color: 'orange',
    binWidth: 10000, 
    binStart: 0, 
    binEnd: 1000000,
    trimEnds: true,
    decimals: 0,
});
print();

print("Q: What is the average price of a house in Saratoga?");
let avg_price = saratogaHouses.map(row => parseInt(row.price)).compute(stats.mean);
print(`A: The average price of a house in Saratoga is $${avg_price.toFixed(0)}.`);
print();

print("Q: What is the median price of a house in Saratoga?");
let median_price = saratogaHouses.map(row => parseInt(row.price)).compute(stats.median);
print(`A: The median price of a house in Saratoga is $${median_price.toFixed(0)}.`);
print();

print("Q: What is the variance of the price of a house in Saratoga?");
let variance_price = saratogaHouses.map(row => parseInt(row.price)).compute(stats.variance);
print(`A: The variance of the price of a house in Saratoga is $${variance_price.toFixed(0)}.`);
print();

print("Q: What is the standard deviation of the price of a house in Saratoga?");
let std_dev_price = saratogaHouses.map(row => parseInt(row.price)).compute(stats.standardDeviation);
print(`A: The standard deviation of the price of a house in Saratoga is $${std_dev_price.toFixed(0)}.`);
print();
print();
print();
print();
print();




print(`CORRELATIONS`);
print(`Q: Is there a correlation between the price of a house and its age?`);
let ages = saratogaHouses.map(row => parseInt(row.age));
let price_age_correlation = stats.correlation(prices, ages);
print(`A: The correlation between the price of a house and its age is ${price_age_correlation.toFixed(2)}.`);
print(`A value of -0.19 means that there is a weak negative correlation between the price of a house and its age.`)
print();

print(`Q: Is there a correlation between the price of a house and its size?`);
let living_areas = saratogaHouses.map(row => parseInt(row.livingArea));
let price_living_area_correlation = stats.correlation(prices, living_areas);
print(`A: The correlation between the price of a house and its size is ${price_living_area_correlation.toFixed(2)}.`);
print(`A value of 0.71 means that there is a strong positive correlation between the price of a house and its size.`)
print();

print(`Q: If the correlation above is strong, can we predict the price of a house given its size, using a linear regression model?`);
let ls_coefficients = stats.leastSquaresRegression(living_areas, prices);
print(`A: Yes, we can predict the price of a house given its size using the linear regression model: price = ${ls_coefficients.m.toFixed(2)} * size + ${ls_coefficients.b.toFixed(2)}.`);
let size_to_price_predictor = stats.linearRegressionModel(ls_coefficients);
let sample = {
    size: living_areas[0],
    price: prices[0]
}
print(`   For example, for a house with size ${sample.size} sqft, the predicted price is $${size_to_price_predictor(sample.size).toFixed(0)}, while the actual price is $${sample.price} (error of $${(sample.price - size_to_price_predictor(sample.size)).toFixed(0)}).`); 
sample = {
    size: living_areas[1],
    price: prices[1]
}
print(`   For example, for a house with size ${sample.size} sqft, the predicted price is $${size_to_price_predictor(sample.size).toFixed(0)}, while the actual price is $${sample.price} (error of $${(sample.price - size_to_price_predictor(sample.size)).toFixed(0)}).`);
sample = {
    size: living_areas[2],
    price: prices[2]
}
print(`   For example, for a house with size ${sample.size} sqft, the predicted price is $${size_to_price_predictor(sample.size).toFixed(0)}, while the actual price is $${sample.price} (error of $${(sample.price - size_to_price_predictor(sample.size)).toFixed(0)}).`);
print();

print(`Q: Can we measure how well this linear regression model works? What is the R-squared value of the model?`);
let r_squared = stats.rSquared(living_areas, prices, size_to_price_predictor);
print(`A: The R-squared value of the linear regression model is ${r_squared.r2.toFixed(2)}.`);
print(`   This means that the model explains ${(100*r_squared.r2).toFixed(0)}% of the predictions in the price of a house given its size.`)
print(`   The adjusted R-squared value of the linear regression model is ${r_squared.r2adj.toFixed(2)}.`);
print();
print();
print();
print();
print();



print(`INFERENCE`);
print();

print(`Let's take a look at the distribution of the prices of the houses in Saratoga:`);
plotHistogram(prices, {
    title: "Histogram of Prices of Houses in Saratoga",
    color: 'orange',
    // binWidth: 10000, 
    // binStart: 0, 
    // binEnd: 1000000,
    // trimEnds: true,
    // decimals: 0,
});
print(`  Mean price: $${avg_price.toFixed(0)}`);
print();

// plotHistogram(living_areas, {
//     title: "Histogram of Living Areas of Houses in Saratoga",
//     color: 'blue',
//     binWidth: 100, 
//     binStart: 0, 
//     binEnd: 5000,
//     trimEnds: true,
//     decimals: 0,
// });

// plotHistogram(saratogaHouses.map(row => parseInt(row.landValue)), {
//     title: "Histogram of LAnd Values of Houses in Saratoga",
//     color: 'green',
//     binWidth: 1000, 
//     binStart: 0, 
//     binEnd: 50000,
//     trimEnds: true,
//     decimals: 0,
// });

// plotHistogram(saratogaHouses.map(row => parseFloat(row.lotSize)), {
//     title: "Histogram of Lot Sizes of Houses in Saratoga",
//     color: 'pink',
//     binWidth: 0.1, 
//     binStart: 0, 
//     binEnd: 1,
//     trimEnds: true,
//     decimals: 2,
// });



print(`To quantify uncertainty in the mean price of a house in Saratoga, we can use the bootstrap method to estimate the sampling distribution of the mean price of a house in Saratoga. This means creating a large number of bootstrap samples (random elements from the original sample with replacement), calculating the mean price of each sample, and then examining the distribution of these means.`)

let price_mean_bs_dist = stats.bootstrap(prices, 1000, stats.mean);
plotHistogram(price_mean_bs_dist, {
    title: "Histogram of the Mean Prices of Houses in Saratoga (Bootstrap)",
    color: 'green',
    // binWidth: 1000,
    // binStart: 0,
    // binEnd: 1000000,
    // trimEnds: true,
    decimals: 0,
});
print();
print(`By analyzing the bootstrap distribution of the mean price of a house in Saratoga, we can calculate the confidence interval of the mean price of a house in Saratoga.`)

let price_mean_ci = stats.confidenceInterval(price_mean_bs_dist, 0.95);
print(`  ${(100*price_mean_ci.level)}% Confidence Interval of the Mean Price of a House in Saratoga: [$${price_mean_ci.lower.toFixed(0)}, $${price_mean_ci.upper.toFixed(0)}] 
        --> Or equivalent to saying "Given the sample, I am ${(100*price_mean_ci.level)}% confident that the mean price of a house in Saratoga is between $${price_mean_ci.lower.toFixed(0)} and $${price_mean_ci.upper.toFixed(0)}."
        --> this is the typical confidence interval used.`);

price_mean_ci = stats.confidenceInterval(price_mean_bs_dist, 1.00);
print(`  ${(100*price_mean_ci.level)}% Confidence Interval of the Mean Price of a House in Saratoga: [$${price_mean_ci.lower.toFixed(0)}, $${price_mean_ci.upper.toFixed(0)}] 
        --> this is basically the entire range of prices in the bootstrapped distribution.`);

price_mean_ci = stats.confidenceInterval(price_mean_bs_dist, 0.5);
print(`  ${(100*price_mean_ci.level)}% Confidence Interval of the Mean Price of a House in Saratoga: [$${price_mean_ci.lower.toFixed(0)}, $${price_mean_ci.upper.toFixed(0)}] 
        --> as we decrease the confidence level, the interval becomes narrower.`);
print();
print();
print();
print();


print("WRAP-UP 9 EXERCISE");

print("1. Let's investigate mean house living area (`livingArea`) based on the sample of houses in the `SaratogaHouses` dataset. Suppose we are interested in investigating whether 5-bedroom houses in Saratoga County have mean living area different from 2700 sq. ft.");

print(`a) State the null and alternative hypotheses in terms of conjectures and in terms of
parameters.`)
print(`    The null hypothesis is that the mean living area of 5-bedroom houses in Saratoga County 
    is equal to 2700 sq. ft., 𝐻0 ∶ 𝜇 = 2700 sq. ft.
    The alternative hypothesis is that the mean living area of 5-bedroom houses in Saratoga County 
    is different from 2700 sq. ft., 𝐻𝐴 ∶ 𝜇 ≠ 2700 sq. ft.`)

print("b) Compute the observed test statistic. Interpret the observed test statistic in the context of the data.");

let living_areas_5_bedrooms = saratogaHouses
    .filter(row => parseInt(row.bedrooms) == 5)
    .map(row => parseInt(row.livingArea));
let test_stat = stats.mean(living_areas_5_bedrooms);
print(`   The mean living area of 5-bedroom houses in Saratoga County is ${test_stat.toFixed(0)} sq. ft.`);

// print("   Living areas of 5-bedroom houses: ", living_areas_5_bedrooms);
print("   Extremes values: ", stats.extremes(living_areas_5_bedrooms));
print("   Mean living area of 5-bedroom houses: ", test_stat);
print("   Standard deviation of living area of 5-bedroom houses: ", stats.standardDeviation(living_areas_5_bedrooms));
plotHistogram(living_areas_5_bedrooms, {
    title: "Histogram of Living Areas of 5-Bedroom Houses in Saratoga",
    color: 'blue',
    // binWidth: 100,
    // binStart: 0,
    // binEnd: 5000,
    // trimEnds: true,
});
print(``);


print("c) Generate the null distribution and compute a $p$-value. Interpret the $p$-value in the context of the data.")
print("  JLX: creating a null distribution here means creating a random sample of living areas whose mean is 2700 sqft (as per the above).")
print();

// JL: Originally, I thought this was done by generating random standard normal numbers and then transforming them to the desired mean and standard deviation, the desired SD being the samepl as the original sample. 

// let null_dist = stats.randomStandardNormalSamples(1000, 2700, 100);
// print("nullDistribution: ", null_dist);
// print("  Extremes: ", stats.extremes(null_dist));
// print("  Mean of null distribution: ", stats.mean(null_dist));
// print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
// print("");

// JL: however, digging a little deeper, turns out the `infer` package in R does it by bootstrapping the original sample and shifting the values by the mean differnce! 
// Doing this yields similar results to what I got in R.
let null_dist = stats.nullDistribution(living_areas_5_bedrooms, 1000, {
    null: "point",
    point: 2700,
    statistic: "mean"
});
// print("nullDistribution: ", null_dist);
plotHistogram(null_dist, {
    title: "Null Distribution of the Mean Living Area of 5-Bedroom Houses in Saratoga",
    color: 'green',
});
print("  Extremes: ", stats.extremes(null_dist));
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
// print();

let p_value = stats.pValue(null_dist, test_stat, "two-sided");
// let p_value = stats.pValue(null_dist, test_stat, "two-sided", {nullValue: 2700});
print("  p-value: ", p_value);
print("  Is the p-value significant at the 0.05 level? ", p_value < 0.05);
print("");

print(`-> The two-sided $p$-value is ${p_value}. If the mean living area for all 5-bedroom homes in Saratoga was 2700 sqft, there would only be a ${p_value} probability that the observed sample had a mean living area smaller than ${Math.round(test_stat,0)} or larger than ${Math.round(2700 + (2700 - test_stat))} sqft. Estimating the significance level at $\alpha = 0.05$, this is evidence to reject $H_0$ and suggest that the mean living area for all 5-bedroomers in Saratoga is _different_ than 2700 sqft.)`);
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
print("The null distribution de-correlates waterfront var from price by combining all possible values from the samples, i.e. any observed house (WF or not) can have any observed price. The mean of the null dist is centered around 0, which makes sense if there is no correlation. The test stat (diff in means) is at ~160k. The p-value of this test stat is 0. This suggests that, if $H_0$ were true, there would be a 0 probability of the diff in mean prices between WF and no WF being equal or larger than ~160k. This gives us evidence to reject $H_0$ and accept the hypothesis (at alpha = 0.05) that WF houses are on average more expensive than not, from the sample. ");
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

// print("  nullDistribution: ", null_dist);
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



print(`4. Suppose that the city government would like to assess whether there is broad support for launching a comprehensive affordable housing program. They plan to proceed with launching the program if there is evidence that over 70\% of residents are in favor of the program.

a) If they survey a random sample of 100 residents and actually 75\% of all residents are in favor of the program, what is the power for a test of the one-sided alternative $H_A: p > 0.70$ conducted at the $\alpha = 0.10$ significance level? Do these results suggest that a larger sample size is advisable? Justify your reasoning.
`);

sample_size = 100;


null_dist = stats.nullDistribution(
    // We make up a null distribution of 100 samples.
    // The Y/N distribution doesn't matter because we will be shifting 
    // the proportion to 0.70 during the hypothesis generation
    Array.from({
        length: sample_size
    }, (_, i) => i < sample_size / 2 ? "Yes" : "No"), 
    1000, 
    {
        null: "point",
        point: 0.70,
        statistic: "prop",
        success: "Yes" // "Yes" is the success category for the proportion
    });
// print("  nullDistribution: ", null_dist);
plotHistogram(null_dist, {
    title: "Null distribution of proportion of residents in favor of the program",
    decimals: 2
});
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print()

significance_level = 0.10;
critical_value = stats.quantile(null_dist, 1 - significance_level);
print(`  The critical value for the test at a significance level of ${significance_level} is ${critical_value}. If the test statistic is greater than this value, we will reject the null hypothesis.`);

alt_dist = stats.nullDistribution(
    Array.from({
        length: sample_size
    }, (_, i) => i < sample_size / 2 ? "Yes" : "No"), 
    1000, 
    {
        null: "point",
        point: 0.75,
        statistic: "prop",
        success: "Yes" // "Yes" is the success category for the proportion
    });
// print("  altDistribution: ", alt_dist);
plotHistogram(alt_dist, {   
    title: "Alternative distribution of proportion of residents in favor of the program",
    decimals: 2
});
print("  Mean of alt distribution: ", stats.mean(alt_dist));
print("  Standard deviation of alt distribution: ", stats.standardDeviation(alt_dist));

// power = alt_dist.map(val => val >= critical_value)
//     .reduce((acc, val) => acc + val, 0) / alt_dist.length;
// print(`  The power of the test is ${power}. This means that the probability of correctly rejecting the null hypothesis when the true proportion is 0.75 is ${power}.`);

// power = stats.pValue(alt_dist, critical_value, "greater");
// print(`  The power of the test is ${power}. This means that the probability of correctly rejecting the null hypothesis when the true proportion is 0.75 is ${power}.`);

power = stats.power(alt_dist, critical_value, "greater");
print(`  The power of the test for sample size ${sample_size} is ${power}. This means that the probability of correctly rejecting the null hypothesis when the true proportion is 0.75 is:`, power);
print()
print()




print(`b) What is the power if they increase the sample size to $n = 500$ and conduct a two-sided test with $H_A: p \neq 0.70$ at the $\alpha = 0.10$ significance level?`)

stats.randomSeed(2023);
sample_size = 500;

null_dist = stats.nullDistribution(
    Array.from({
        length: sample_size
    }, (_, i) => i < sample_size / 2 ? "Yes" : "No"), 1000, {
        null: "point",
        point: 0.70,
        statistic: "prop",
        success: "Yes" // "Yes" is the success category for the proportion
    });

critical_value = stats.quantile(null_dist, 1 - significance_level);

alt_dist = stats.nullDistribution(
    Array.from({
        length: sample_size
    }, (_, i) => i < sample_size / 2 ? "Yes" : "No"), 1000, {
        null: "point",
        point: 0.75,
        statistic: "prop",
        success: "Yes" // "Yes" is the success category for the proportion
    });



power = stats.power(alt_dist, [
    stats.quantile(null_dist, significance_level / 2),
    stats.quantile(null_dist, 1 - significance_level / 2)
], "two-sided");

// print("  nullDistribution: ", null_dist);
plotHistogram(null_dist, {
    title: "Null Distribution",
    color: "marine",
    binWidth: 0.01,
    binStart: 0.60,
    binEnd: 0.81,
    trimEnds: false,
    decimals: 2,
});
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print(`  The critical value for the test at a significance level of ${significance_level} is ${critical_value}. If the test statistic is greater than this value, we will reject Ho.`);
print()

// print("  altDistribution: ", alt_dist);
plotHistogram(alt_dist, {
    title: "Alt Distribution",
    color: "orange",
    binWidth: 0.01,
    binStart: 0.60,
    binEnd: 0.81,
    trimEnds: false,
    decimals: 2,
});
print("  Mean of alt distribution: ", stats.mean(alt_dist));
print("  Standard deviation of alt distribution: ", stats.standardDeviation(alt_dist));

print(`  The power of the test for sample size ${sample_size} is ${power}. This means that the probability of correctly rejecting the null hypothesis when the true proportion is 0.75 is:`, power);
print()
print()
print()
print()


