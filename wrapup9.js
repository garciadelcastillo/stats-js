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
// ██╗    ██╗██████╗  █████╗ ██████╗       ██╗   ██╗██████╗      █████╗ 
// ██║    ██║██╔══██╗██╔══██╗██╔══██╗      ██║   ██║██╔══██╗    ██╔══██╗
// ██║ █╗ ██║██████╔╝███████║██████╔╝█████╗██║   ██║██████╔╝    ╚██████║
// ██║███╗██║██╔══██╗██╔══██║██╔═══╝ ╚════╝██║   ██║██╔═══╝      ╚═══██║
// ╚███╔███╔╝██║  ██║██║  ██║██║           ╚██████╔╝██║          █████╔╝
//  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝            ╚═════╝ ╚═╝          ╚════╝ 
//                                                                      
// Replication of the class wrap-up 9 exercise
`);

const saratogaHouses = csv.parse(fs.readFileSync('sample_data/saratogahouses.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});

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
    }, (_, i) => i < sample_size / 2 ? "Yes" : "No"), 1000, {
        null: "point",
        point: 0.70,
        statistic: "prop",
        success: "Yes" // "Yes" is the success category for the proportion
    });
print("  nullDistribution: ", null_dist);
print("  Mean of null distribution: ", stats.mean(null_dist));
print("  Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print()

significance_level = 0.10;
critical_value = stats.quantile(null_dist, 1 - significance_level);
print(`  The critical value for the test at a significance level of ${significance_level} is ${critical_value}. If the test statistic is greater than this value, we will reject the null hypothesis.`);

alt_dist = stats.nullDistribution(
    Array.from({
        length: sample_size
    }, (_, i) => i < sample_size / 2 ? "Yes" : "No"), 1000, {
        null: "point",
        point: 0.75,
        statistic: "prop",
        success: "Yes" // "Yes" is the success category for the proportion
    });
print("  altDistribution: ", alt_dist);
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






print("PERSONAL TESTS --- OFF WRAP UP");
print();

print("Q: Is there any correlation between house price and age?");

let price_per_sqft = saratogaHouses.map(row => row.price / row.livingArea);
plotHistogram(price_per_sqft, {
    title: "Price per SqFt",
    color: "orange",
    binWidth: 10,
    binStart: 0,
    binEnd: 300,
    trimEnds: true,
    decimals: 0,
    // logErrors: true,
});

let age = saratogaHouses.map(row => parseInt(row.age));
// print(price_per_sqft, age);

let correlation = stats.correlation(
    price_per_sqft, 
    age
);
print("Correlation between price per sqft and age: ", correlation);
print("Looks like there is not much correlation between price per sqft and age. The correlation is close to 0.0. This means that the price per sqft does not depend on the age of the house.");
print();
print();



let target_value = 130;
print("Q: given the Saratoga housing data, test if the average price per square foot is below $" + target_value + ". Use a significance level of 0.05.");
print(`STEPS: 
- We first calculate the observed statistic, i.e. the mean price per square foot.
- For the set significance level alpha, we calculate the critical value.
- We then generate a null distribution of the target mean price per square foot.
- We then calculate the p-value of the observed statistic.
- We then compare the p-value with the significance level alpha to determine if we reject the null hypothesis or not.  
`);

// print(price_per_sqft)
plotHistogram(price_per_sqft, {
    title: "Price per SqFt: observed distribution",
    color: "orange",
    binWidth: 10,
    binStart: 0,
    binEnd: 300,
    // trimEnds: true,
    decimals: 0,
    // logErrors: true,
});
test_statistic = stats.mean(price_per_sqft);
significance_level = 0.05;
print("Test_statistic: ", test_statistic);
print("Mean of price per sqft: ", stats.mean(price_per_sqft));
print("Standard deviation of price per sqft: ", stats.standardDeviation(price_per_sqft));
print();

null_dist = stats.nullDistribution(price_per_sqft, 1000, {
    null: "point",
    point: target_value,
    statistic: "mean"
});
// print("  nullDistribution: ", null_dist);
plotHistogram(null_dist, {
    title: "Price per SqFt: null dist for $200",
    color: "marine",
    binWidth: 10,
    binStart: 0,
    binEnd: 300,
    // trimEnds: true,
    decimals: 0,
    // logErrors: true,
});
print("Mean of null distribution: ", stats.mean(null_dist));
print("Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print()

critical_value = stats.quantile(null_dist, significance_level);
print("Critical value: ", critical_value);

p_value = stats.pValue(null_dist, test_statistic, "smaller");
print("P-value: ", p_value);
if (p_value < significance_level) {
    print("Reject null hypothesis: The average price per square foot is below $200.00");
} else {
    print("Fail to reject null hypothesis: The average price per square foot is not below $200.00");
}
print();

print(`In the above example, the null distribution had a very small SD. This is probably due to the fact that the sample size was quite large (about ${price_per_sqft.length}). This is why the null distribution was very narrow and the p-value was very small. This is why the null hypothesis was rejected. If the sample size was smaller, the null distribution would have been wider and the p-value would have been larger, making it harder to reject the null hypothesis?`);
print(`Let's try reducing the sample size, by considering only houses above a certain size.`);
print();
print();

let threshold = 3250;
print(`Q: given the Saratoga housing data, test if the average price per square foot is below $${target_value}, for houses above ${threshold} sf. Use a significance level of 0.05.`);

price_per_sqft = saratogaHouses
    .filter(row => parseInt(row.livingArea) > threshold)
    .map(row => parseInt(row.price) / parseInt(row.livingArea));
print(`Found ${price_per_sqft.length} houses above ${threshold} sf.`);
plotHistogram(price_per_sqft, {
    title: "Price per SqFt: observed distribution",
    color: "orange",
    binWidth: 10,
    binStart: 0,
    binEnd: 300,
    // trimEnds: true,
    decimals: 0,
    // logErrors: true,
});
test_statistic = stats.mean(price_per_sqft);
significance_level = 0.05;
print("Test_statistic: ", test_statistic);
print("Mean of price per sqft: ", stats.mean(price_per_sqft));
print("Standard deviation of price per sqft: ", stats.standardDeviation(price_per_sqft));
print();

null_dist = stats.nullDistribution(price_per_sqft, 1000, {
    null: "point",
    point: target_value,
    statistic: "mean"
});
data = plotHistogram(null_dist, {  
    title: "Price per SqFt: null dist for $" + target_value,
    color: "marine",
    decimals: 0,
    binWidth: 10,
    binStart: 0,
    binEnd: 300,
    // binWidth: 2.5,
    // binStart: 110,
    // binEnd: 150,
});
// print(data)
print("Mean of null distribution: ", stats.mean(null_dist));
print("Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print()

critical_value = stats.quantile(null_dist, significance_level);
print("Critical value: ", critical_value);

p_value = stats.pValue(null_dist, test_statistic, "smaller");
print("P-value: ", p_value);
print();

if (p_value < significance_level) {
    print("Reject null hypothesis: The average price per square foot is below $" + target_value + ", for houses above " + threshold + " sf.");
} else {
    print("Fail to reject null hypothesis: The average price per square foot is not below $" + target_value + ", for houses above " + threshold + " sf.");
}
print("The null distribution was still super thin. I wonder if I am doing something wrong, or if this is expected. Maybe the observed distribution is not bell-shaped enough?");
print("Oooooooh, something I was doing wrong too was comparing the actual price per sqft samples vs. a distribution of MEANS of these values... not fair!! ");