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


let trees = csv.parse(fs.readFileSync('sample_data/cambridgetrees.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});

// Filter trees only owned by Harvard
trees = trees.filter(t => t['Ownership'] == 'Harvard');
// trees = trees.filter(t => t['Ownership'] == 'Harvard' || t['Ownership'] == 'MIT');
print(`The dataset contains ${trees.length} records.`);

// Figure out the ratio of trees that are 'SpeciesShort' = 'Maple'
let maple_trees = trees.filter(t => t['SpeciesShort'] == 'Maple');
// let maple_trees = trees.filter(t => t['CommonName'].toLowerCase().includes('maple'));
print(`The dataset contains ${maple_trees.length} Maple trees.`);
print(`The ratio of Maple trees to total trees is ${maple_trees.length / trees.length}.`);

