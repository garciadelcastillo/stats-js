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
// ██████╗ ███████╗██████╗ ███████╗ ██████╗ ███╗   ██╗ █████╗ ██╗     
// ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔═══██╗████╗  ██║██╔══██╗██║     
// ██████╔╝█████╗  ██████╔╝███████╗██║   ██║██╔██╗ ██║███████║██║     
// ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╗██║██╔══██║██║     
// ██║     ███████╗██║  ██║███████║╚██████╔╝██║ ╚████║██║  ██║███████╗
// ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
//                                                                    
// ████████╗███████╗███████╗████████╗███████╗
// ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝
//    ██║   █████╗  ███████╗   ██║   ███████╗
//    ██║   ██╔══╝  ╚════██║   ██║   ╚════██║
//    ██║   ███████╗███████║   ██║   ███████║
//    ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝
//                                           
`);




const saratogaHouses = csv.parse(fs.readFileSync('sample_data/saratogahouses.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});




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
print();
print();
print();




let size_threshold = 3250;
let target_value = 135;
significance_level = 0.05;
print(`Q: given the Saratoga housing data, test if the average price per square foot for houses larger than ${size_threshold} is below $${target_value}. Use a significance level of 0.05.`);
print(`Before we get hands-on, let's look at the data first.`)


let large_houses = saratogaHouses.filter(row => parseInt(row.livingArea) > size_threshold);
print(`Found ${large_houses.length} houses with size greater than ${size_threshold}.`);
print();

price_per_sqft = large_houses.map(row => parseInt(row.price) / parseInt(row.livingArea));
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


let boot_dist = stats.bootstrap(price_per_sqft, 1000, stats.mean);
plotHistogram(boot_dist, {
    title: "Price per SqFt: bootstrapped distribution",
    color: "orange",
    binWidth: 2.5,
    binStart: 0,
    // binEnd: 300,
    trimEnds: true,
    decimals: 1,
    // logErrors: true,
});


let ci = stats.confidenceInterval(boot_dist, 1 - significance_level);
// print("Confidence interval: ", ci);
print(`According to the bootstrapped sample distribution, we can be ${1 - significance_level} confident that the average price per square foot for houses larger than ${size_threshold} is between $${ci.lower} and $${ci.upper}.`);
print();
print();



print(`STEPS TO VALIDATE THE HYPOTHESIS: 
- We first calculate the observed statistic, i.e. the mean price per square foot.
- For the set significance level alpha, we calculate the critical value.
- We then generate a null distribution of the target mean price per square foot.
- We then calculate the p-value of the observed statistic.
- We then compare the p-value with the significance level alpha to determine if we reject the null hypothesis or not.  
`);


test_statistic = stats.mean(price_per_sqft);
print("Test_statistic: ", test_statistic);
print("Mean of price per sqft: ", stats.mean(price_per_sqft));
print("Standard deviation of price per sqft: ", stats.standardDeviation(price_per_sqft));
print();

null_dist = stats.nullDistribution(price_per_sqft, 1000, {
    null: "point",
    point: target_value,
    statistic: "mean"
});
histogram_data = plotHistogram(null_dist, {
    title: "Price per SqFt: null dist for $" + target_value,
    color: "marine",
    binWidth: 2.5,
    binStart: 0,
    // binEnd: 300,
    trimEnds: true,
    decimals: 1,
    // logErrors: true,
});
// print(histogram_data);
print("Mean of null distribution: ", stats.mean(null_dist));
print("Standard deviation of null distribution: ", stats.standardDeviation(null_dist));
print()

critical_value = stats.quantile(null_dist, significance_level);
print(`Critical value for significance level ${significance_level}: `, critical_value);

p_value = stats.pValue(null_dist, test_statistic, "smaller");
print("P-value: ", p_value);
print(`If Saratoga houses over ${size_threshold} sf DO NOT have an average price per square foot BELOW $${target_value}, then the probability of their average price being $${test_statistic} is ${p_value}.`);
if (p_value < significance_level) {
    print("ANSWER: we reject null hypothesis: The average price per square foot is below $" + target_value + ", for houses above " + size_threshold + " sf.");
} else {
    print("ANSWER: we fail to reject null hypothesis: The average price per square foot is not below $" + target_value + ", for houses above " + size_threshold + " sf.");
}
print("I have cross-validated these calcs in Wrapup9 in Quartio, results are consistent.");
print();
print();
print();
print();
print();





target_power = 0.90;
significance_level = 0.05;
target_value = 0.75;

print(`Q: let's say I developed Machina, and I want to plan an experiment to test if people like using it better than a control software. How many people (min) do I need to test this hypothesis with a power of at least ${target_power} and a significance level of ${significance_level}?`);

print(`STEPS:
- Design an experiment: make people test both, and ask which one they prefer.
- We then gather a set of n samples from the population specifying "Machina" or "Other".
- The null hypothesis is that people like both equally.
- The alternative hypothesis is that people like Machina more.
- We need to decide how much more people like Machina.
- Let's decide that our goal it to prove that at least ${100*target_value}% of people like Machina more.
- We then calculate the sample size needed to detect this effect size with a power of at least ${target_power} and a significance level of ${significance_level}.
- Co-pilot mentions "effect size" as another measure, but I feel this will be introduced in class. 
`)


let sample_size = 2;
power = 0;

while (power < target_power) {
    sample_size += 1;

    null_dist = stats.nullDistribution(
        // We make up a null distribution of 100 samples.
        // The Y/N distribution doesn't matter because we will be shifting 
        // the proportion to 0.70 during the hypothesis generation
        Array.from({
            length: sample_size
        }, (_, i) => i < sample_size / 2 ? "Machina" : "Other"), 1000, {
            null: "point",
            point: 0.50,
            statistic: "prop",
            success: "Machina" 
        });

    critical_value = stats.quantile(null_dist, 1 - significance_level);

    alt_dist = stats.nullDistribution(
        Array.from({
            length: sample_size
        }, (_, i) => i < sample_size / 2 ? "Machina" : "Other"), 1000, {
            null: "point",
            point: target_value,
            statistic: "prop",
            success: "Machina" 
        });

    power = stats.power(alt_dist, critical_value, "greater");
    print("Sample size + power: ", sample_size, power);
}
print();
print(`We need a sample size of ${sample_size} to detect a difference of at least ${100*target_value}% with a power of at least ${target_power} and a significance level of ${significance_level}.`);   
print(`Or in other words, we need to test at least ${sample_size} people to have at least a ${100*target_power}% probability of rejecting the null hypothesis that people like Machina and the control software equally, and to be ${100*(1 - significance_level)}% confident that a least ${100*target_value}% people like Machina better.`);
print();
print("I did not test this one out anywhere... 🤷‍♂️");