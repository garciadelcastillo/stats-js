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
var colors = require('colors');





//  ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗███████╗
// ██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║     ███████║███████║██████╔╝   ██║   ███████╗
// ██║     ██╔══██║██╔══██║██╔══██╗   ██║   ╚════██║
// ╚██████╗██║  ██║██║  ██║██║  ██║   ██║   ███████║
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
//                   

// https://github.com/tool3/chartscii
const Chartscii = require('chartscii');
var asciichart = require ('asciichart');
const simpleplot = require('simple-ascii-chart').default;

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

const default_plot_options = {
    title: "Plot",
    width: 80,
    height: 50,
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

/**
 * Wrapper function to plot a graph using simple-ascii-chart.
 * @param {*} data 
 * @param {*} options 
 */
const plotGraph = function (data, options) {
    const plot_options = {
        ...default_plot_options,
        ...options
    };
    print(simpleplot(data, plot_options));
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
// ██╗    ██╗███████╗███████╗██╗  ██╗     ██╗ ██╗
// ██║    ██║██╔════╝██╔════╝██║ ██╔╝    ███║███║
// ██║ █╗ ██║█████╗  █████╗  █████╔╝     ╚██║╚██║
// ██║███╗██║██╔══╝  ██╔══╝  ██╔═██╗      ██║ ██║
// ╚███╔███╔╝███████╗███████╗██║  ██╗     ██║ ██║
//  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝ ╚═╝
//

// Notes as I parse and dev concepts of Week 11. 
`);

print(`
We have seen in class Named Random Variables, like:

Normal Distribution / Gaussian Distribution:
- X ~ N(μ, σ)

Area under curve = 1
`);

let prob = stats.ProbabilityFunctions.Normal(10, 2);

print(`Table of probabilities for a normal distribution with μ=10 and σ=2:`);
for (let i = 0; i <= 20; i++) {
    print(`P(X = ${i}) = `, prob(i));
}
print();


print(`The Standard Normal Distribution is a normal distribution with μ=0 and σ=1, and is denoted as X ~ N(0, 1).`);
print(``);
print(`Table of probabilities for a standard normal distribution:`);
prob = stats.ProbabilityFunctions.StandardNormal();
for (let i = -5; i <= 5; i++) {
    print(`P(X = ${i}) = `, prob(i));
}


print(`Compare spread between normal distributions with different σ values:`);
data1 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.Normal(0, 1), 
    -5, 5);
data2 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.Normal(0, 2), 
    -5, 5);
data3 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.Normal(0, 3), 
    -5, 5);

plotGraph([data1, data2, data3], { 
    title: "Normal Distribution with different σ values", 
    color: ['ansiRed', 'ansiGreen', 'ansiBlue' ],
    height: 20 
});


// print(Math.sqrt(Math.PI));

v = 2;
prob = stats.ProbabilityFunctions.T(v);
print(`Table of probabilities for a T distribution with ${v} degrees of freedom:`);
for (let i = -5; i <= 5; i++) {
    print(`P(X = ${i}) = `, prob(i));
}
print();

print(`Comparison of a Normal distribution with T distributions of 2, 5, and 10 degrees of freedom:`);
data1 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.Normal(0, 1),
    -5, 5);
data2 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.T(10),
    -5, 5);
data3 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.T(5),
    -5, 5);
data4 = stats.computeProbabilityDistribution(
    stats.ProbabilityFunctions.T(2),
    -5, 5);

plotGraph([data1, data2, data3, data4], {
    title: "Normal Distribution vs T Distributions",
    color: ['ansiRed', 'ansiGreen', 'ansiBlue', 'ansiYellow'],
    height: 40
});
print();
print();
print();
print();
print();


print(`
// ████████╗██╗  ██╗███████╗ ██████╗ ██████╗ ██╗   ██╗     
// ╚══██╔══╝██║  ██║██╔════╝██╔═══██╗██╔══██╗╚██╗ ██╔╝     
//    ██║   ███████║█████╗  ██║   ██║██████╔╝ ╚████╔╝█████╗
//    ██║   ██╔══██║██╔══╝  ██║   ██║██╔══██╗  ╚██╔╝ ╚════╝
//    ██║   ██║  ██║███████╗╚██████╔╝██║  ██║   ██║        
//    ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝        
//                                                         
// ██████╗  █████╗ ███████╗███████╗██████╗ 
// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗
// ██████╔╝███████║███████╗█████╗  ██║  ██║
// ██╔══██╗██╔══██║╚════██║██╔══╝  ██║  ██║
// ██████╔╝██║  ██║███████║███████╗██████╔╝
// ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═════╝ 
//                                         
// ██╗███╗   ██╗███████╗███████╗██████╗ ███████╗███╗   ██╗ ██████╗███████╗
// ██║████╗  ██║██╔════╝██╔════╝██╔══██╗██╔════╝████╗  ██║██╔════╝██╔════╝
// ██║██╔██╗ ██║█████╗  █████╗  ██████╔╝█████╗  ██╔██╗ ██║██║     █████╗  
// ██║██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ██║╚██╗██║██║     ██╔══╝  
// ██║██║ ╚████║██║     ███████╗██║  ██║███████╗██║ ╚████║╚██████╗███████╗
// ╚═╝╚═╝  ╚═══╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝╚══════╝
//                                                                        

Turns out that when we were doing analysis using bootstrapping, 
that was a "simulation" method. But there are other methods to 
analytically compute confidence intervals, standard errors, etc.
Let's take a look. 

First, let's define Z-Scores. Z-Scores are a measure of how many
standard deviations a data point is from the mean. It is calculated
as (X - μ) / σ, where X is the data point, μ is the mean, and σ is
the standard deviation. It is also a way to "normalize" data points
so that they can be compared across different distributions.

Z-score values that are more than 2 standard deviations away
from the mean are considered unusual. Values that are more than 3 standard
deviations away from the mean are considered extreme.

`);

print(`Let's take a look at the diameter of the Cambridge trees:`);

let trees = csv.parse(fs.readFileSync('sample_data/cambridgetrees.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});

let trees_with_diameter = trees.filter(t => t['Diameter'] != 'NA');
print(`  The dataset contains ${trees_with_diameter.length} trees with diamter values.`);

let diameters = trees_with_diameter.map(t => parseFloat(t['Diameter']));
let mean = stats.mean(diameters);   
let std_dev = stats.standardDeviation(diameters);
print(`  The mean diameter of trees is ${mean} and the standard deviation is ${std_dev}.`);
print();

let zscorer = stats.zScorer(mean, std_dev);
let z = zscorer(20);
print(`  A tree with a diameter of 20 inches has a Z-Score of ${z}.`);
z = zscorer(30);
print(`  A tree with a diameter of 30 inches has a Z-Score of ${z} --> This is an unusual value (> 2).`);
z = zscorer(40);
print(`  A tree with a diameter of 40 inches has a Z-Score of ${z} --> This is an extreme value (> 3).`);
print();
print();
print();
print();

print(`
When doing simulation-based analysis, we used bootstrapping to
estimate the standard error of the mean:
- Determine parameter to estimate
- Collect sample data
- Compute point estimate / sample statistic
- Generate the boostrap distribution for the statistic (THIS IS THE SIMULATION PART)
- Compute the confidence interval using the percentile method or the SE method.

But there is another way to compute the standard error of the mean analytically.
What will change is that, instead of using the bootstrap distribution, we will
ESTIMATE THE STANDARD ERROR OF THE STATISTIC FROM A PROBABILITY MODEL, and then
use that to compute the confidence interval using the SE method: 
- Determine parameter to estimate
- Collect sample data
- Compute point estimate / sample statistic
- Estimate The Standard Error Of The Statistic From A Probability Model (THIS IS THE Theory-based inference part)
- Compute the confidence interval using the SE method.

We can do this thanks to the CENTRAL LIMIT THEOREM (CLT): 
"For random samples and a large sample size, the sampling distribution of 
many sample statistics is approximately normal."

This means that, for a large enough sample size, the sampling distribution of the
sample statistic will be approximately normal, and we can use the normal distribution
to estimate the standard error of the statistic. 

The challenge is: which normal distribution? What are the values of the mean and standard?
Answer: depending on the type of statistic, we can use different normal distributions:
https://mcconvil.github.io/stat100s24/inference_summary.html
`);

print(`
For example: 
Approximating the Sampling Distribution of a SAMPLE PROPORTION
CLT says: For large (At least 10 successes and 10 failures):

    ${"p̂ ~ N(p, sqrt(p(1-p)/n))".bold.red}

Note that in the above, 'p' is the population proportion, and 'n' is the sample size.
This requires actually knowing the real population proportion, which is not always possible.
More on this later. 

`)


print(`
Let's take a look at the Cambridge trees dataset again, and compute stuff:
`)



// Filter trees only owned by Harvard
trees = trees.filter(t => t['Ownership'] == 'Harvard');
// trees = trees.filter(t => t['Ownership'] == 'Harvard' || t['Ownership'] == 'MIT');
print(`  The dataset contains ${trees.length.toString().yellow} trees.`);

// Figure out the ratio of trees that are 'SpeciesShort' = 'Maple'
let maple_trees = trees.filter(t => t['SpeciesShort'] == 'Maple');
let p = maple_trees.length / trees.length;
// let maple_trees = trees.filter(t => t['CommonName'].toLowerCase().includes('maple'));
print(`  The dataset contains ${maple_trees.length.toString().yellow} Maple trees.`);
print(`  The ratio of Maple trees to total trees is` + ` p = ${p}`.yellow); 


let sample_size = 50;
let sd = Math.sqrt(p * (1 - p) / sample_size);
print(`  The standard deviation of the sample proportion is ${sd}.`);

let maple_distribution = stats.ProbabilityFunctions.Normal(p, sd);
data1 = stats.computeProbabilityDistribution(maple_distribution, p - 4 * sd, p + 4 * sd, sd / 100);
plotGraph(data1, {
    title: 'Probability Distribution of Maple Trees',
    color: ['ansiYellow'],
    height: 20, 
});

print(`
Now let's see if the above is true! Let's bootstrap 1000 samples of size 50, and compute the sample proportion:
`)

let sample_proportions = [];
for (let i = 0; i < 1000; i++) {
    let sample = stats.sample(trees, sample_size);
    let sample_proportion = sample.filter(t => t['SpeciesShort'] == 'Maple').length / sample_size;
    sample_proportions.push(sample_proportion);
}
// print(sample_proportions);
mean = stats.mean(sample_proportions);
std_dev = stats.standardDeviation(sample_proportions);
print(`  Comparison of population statistics and boostrapped sample statistics:`)
print(`    The population proportion is ${p.toString().yellow} and the sd is ${std_dev.toString().yellow}.`);
print(`    The mean of the sample proportions is ${mean.toString().yellow} and the standard deviation is ${std_dev.toString().yellow}.`);
print(`  The values of the population and the bootstrapped sample are very close to each other,
  which means that they will likely follow the same distribution.`)

plotHistogram(sample_proportions, {
    title: 'Histogram of Sample Proportions',
    title: "Null Distribution",
    color: "marine",
    binWidth: 0.01,
    // binStart: 0.60,
    // binEnd: 0.81,
    // trimEnds: false,
    decimals: 2,
});



let sample_proportions_distribution = stats.ProbabilityFunctions.Normal(mean, std_dev);
data2 = stats.computeProbabilityDistribution(sample_proportions_distribution, mean - 4 * std_dev, mean + 4 * std_dev, std_dev / 100); 
plotGraph([data1,data2], {
    title: 'Probability Distribution of Maple Trees',
    color: ['ansiYellow', 'ansiGreen'],
    height: 20,
});
print(`Again, note that this calculation is possible because we have access to the entire population of trees.`);
print(`In real life, we don't have access to the entire population, so we have to estimate the population proportion from the sample.`);
print();

z_score = stats.zScore(0.05, p, sd); 
print(`If we had a sample where p̂ = 0.05, it's z-score would be`, z_score);
print(`This means that it is not unreasonable to expect such value.`);
print();
print();
print();
print();

print(`THEORY-BASED INFERENCE FOR SINGLE PROPORTIONS`);
print(`
Example: Bern and Honorton’s (1994) extrasensory perception (ESP) studies
(the one with people guessing the value of cards with a 25% chance of success)
`);

data = Array.from({
    length: 329
}, (_, i) => i < 106 ? 1 : 0);
data = stats.sample(data, data.length);  // Shuffle the data
// print(data);

print(`
If we wanted to calculate the p-value using bootstrapping, we would have done it like:`);
null_distribution = stats.nullDistribution(data, 10000, {
    null: 'point',
    point: 0.25,
    statistic: 'prop',
    success: 1,
});

test_stat = 106 / 329;
print(`  The test statistic is ${test_stat}.`)
p_value = stats.pValue(null_distribution, test_stat, 'greater');
print(`  The p-value is ${p_value}.`);
print();
print();

z_score = (test_stat - 0.25) / Math.sqrt(0.25 * 0.75 / 329)
print(`Doing it analytically, we would have done it like:`);

p_o = 0.25;
se = Math.sqrt(p_o * (1 - p_o) / 329);
z_score = stats.zScore(test_stat, p_o, se);
cdf = stats.ProbabilityFunctions.NormalCDF(0, 1);
p_value = 1 - cdf(z_score);

print(`  We assume a null hypothesis of p_o = 0.25, and calculate the z-score of the test statistic:`);
print(`  ${"p̂ ~ N(p_o, sqrt(p_o(1-p_o)/n))".bold.red}`)
print(`    where p_o = 0.25, n = 329, and p̂ = 106/329 = ${test_stat}.
`);
print(`  The Z-score is:`);
print(`  Z = (p̂ - p_o) / sqrt(p_o(1-p_o)/n) = ${z_score}.
`);
print(`  Now we need to figure out the p-value of the Z-score. Since Z-scores are distributed as N(0,1), we can use the Cumulative Density Function (CDF) to find the area of the curve to the right of the Z-score.`);
print(`  The p-value is `, p_value);
print();


print(`If we want to calculate the confidence interval of the proportion, 
we basically have to do the opposite of the above calculation: what is the value
of the statistic (z-score in our case) so that a certain proportion of the distribution
is to the left of it? This can be done using the inverse of the CDF function. 

See https://support.minitab.com/en-us/minitab/help-and-how-to/probability-distributions-random-data-and-resampling-analyses/supporting-topics/basics/using-the-inverse-cumulative-distribution-function-icdf/

CLASS:
Suppose statistic ∼ N(μ = parameter, σ = SE)
95% CI for parameter: statistic ± 2SE

Can generalize this formula!
P% CI for parameter: statistic ± z∗SE

JL: z-star is basically the quantile of the normal distribution that corresponds to the P% CI.`); 

icdf = stats.ProbabilityFunctions.NormalInvCDF(0, 1);

ci = icdf(0.975);  // 95% CI
print(`  For a 95% CI, the z-score is`, ci)
print(`  Note that this was calculated using a quantile of 0.975, because we want to capture the areas both to the left and right of the confidence interval, i.e. 0.025 + 0.025 = 0.05.`);
print(`  Lastly, this gives us a way of calculating the confidence interval of sample statistics without bootstrapping, only assuming the null hypothesis.`);
print();

print(` Lower bound: ${test_stat - ci * se}`);
print(` Upper bound: ${test_stat + ci * se}`);
print(` The 95% confidence interval is ${test_stat - ci * se} to ${test_stat + ci * se}. This means that, for my sample, I am 95% confident that the true population proportion is between these two values.`);
print();
print();

print(`Putting all the calculation together in the Inference.Proportion function, we get:`);

inf = stats.Inference.Proportion(data, {
    success: 1, 
    null: 0.25,
    confidence: 0.95,
});
print(inf);
print(inf.descriptions.p);
print(inf.descriptions.se);
print(inf.descriptions.z);
print(inf.descriptions.p_value);
print(inf.descriptions.ci);
print();
print();
print();
print();
print();
print();
print();







print(`THEORY-BASED INFERENCE FOR SINGLE MEAN`);
print(`https://mcconvil.github.io/stat100s24/inference_summary.html`);
print(`
Approximating the Sampling Distribution of a SAMPLE MEAN

For large n > 30 sample, let’s consider conducting a hypothesis test for a single mean:
Ho : μ = μo where μo = null value
Ha : μ > μo or Ha : μ < μo or Ha : μ ≠ μo
By the CLT, under Ho:

    ${"x̄~ N(μ_o, σ/sqrt(n))".bold.red}

Note that in the above, 'x̄' is the statistic mean, 'σ' is the population 
standard deviation 'n' is the sample size. This requires actually knowing'σ', 
which is not always possible. So we will use the sample standard deviation 's':

    ${"x̄~ N(μ_o, s/sqrt(n))".bold.red}

For this distribution, we will use the t-distribution instead of the normal distribution:

    ${"t(df = n - 1)".bold.red}

Similarly, for the analysis of the confidence interval, we can use the t-distribution: 

    ${"statistic ± t∗SE".bold.red}

So we will need the CDF and ICDF of the t-distribution.
`);



florida_lakes = csv.parse(fs.readFileSync('sample_data/FloridaLakes.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});

data = florida_lakes.map(d => parseFloat(d['pH']));
test_stat = stats.mean(data);
print(`For example, suppose we have a sample of pH values of lakes in Florida:`);
print(data);
print(`The sample mean is ${test_stat}.`);
print();
print(`Assuming a null hypothesis of μ = 7, we can calculate the t-score of the test statistic:`);
print(`  ${"x̄ ~ N(μ_o, s/sqrt(n))".bold.red}`);
print();

mu_o = 7;
s = stats.standardDeviation(data);
se = s / Math.sqrt(data.length);
t_score = (test_stat - mu_o) / se;
print(`  Sample standard deviation: ${s}`);
print(`  Standard error: ${se}`);
print(`  T-score: ${t_score}`);
print();

print(`The p-value of the t-score is calculated using the CDF of the t-distribution, which tells us the are of the curve to the left of the t-score:`);
cdf = stats.ProbabilityFunctions.TCDF(data.length - 1);  // note the degrees of freedom is n - 1 (https://mcconvil.github.io/stat100s24/inference_summary.html)
p_value = 2 * cdf(t_score);
print(`  The p-value is `, p_value);
print(`  Note how we multiply the p-value by 2 because we are interested 
    in the area of the curve to the left and right of the t-score.`);
print();


icdf = stats.ProbabilityFunctions.TInvCDF(data.length - 1);

ci = icdf(0.975);  // 95% CI
print(`  For a 95% CI, the t-score is`, ci)
print(` Lower bound: ${test_stat - ci * se}`);
print(` Upper bound: ${test_stat + ci * se}`);
print(` The 95% confidence interval is ${test_stat - ci * se} to ${test_stat + ci * se}. This means that, for my sample, I am 95% confident that the true population proportion is between these two values.`);
print();
print();

print(`Putting all the calculation together in the Inference.Mean function, we get:`);

inf = stats.Inference.Mean(data, {
    null: 7,
    confidence: 0.95,
});
print(inf);
print(inf.descriptions.x);
print(inf.descriptions.se);
print(inf.descriptions.t);
print(inf.descriptions.p_value);
print(inf.descriptions.ci);
print();
print();
print();
print();


print(`Using these methods, we can estimate sample sizes for a study before we start, in order to achieve a desired margin of error and confidence level.`);
print(`The process is basically using the formula for the standard error of the desired proportion, and solving for n.`);
print(`In the case of a proportion, the formula is:`);
print();
print(`  ${"z* sqrt(p(1-p)/n) <= ME ".bold.red}`);
print();
print(`Solving for n:`)
print(`  ${"n >= (p(1-p)z*^2) / ME^2".bold.red}`);
print();

ci = 0.95
me = 0.02
p = 0.5;
n =  stats.SampleSize.Proportion(ci, me, p);
print(`For example, for a ${ci * 100}% confidence level and a margin of error of ${me}, the sample size required is`, n);
