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
// ██╗    ██╗██████╗  █████╗ ██████╗ ██╗   ██╗██████╗      ██╗ ██╗
// ██║    ██║██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗    ███║███║
// ██║ █╗ ██║██████╔╝███████║██████╔╝██║   ██║██████╔╝    ╚██║╚██║
// ██║███╗██║██╔══██╗██╔══██║██╔═══╝ ██║   ██║██╔═══╝      ██║ ██║
// ╚███╔███╔╝██║  ██║██║  ██║██║     ╚██████╔╝██║          ██║ ██║
//  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝          ╚═╝ ╚═╝
//                                                                

// My own version of the Wrap Up 11 in JS. 
`);


print(`
---
title: "Week 11 Lab: Theory-Based Inference and Sample Size Calculations"
author: "Statistics 100"
date: 2024-04-11
date-format: long
format: pdf
editor: source
---

Topics:

- Theory-Based Confidence Intervals

- Theory-Based Hypothesis Testing

- Sample Size Calculations

### Practice Questions

1. **Cardiovascular Disease and Nutrition.** Much discussion has appeared in the medical literature in recent years on the role of diet in the development of heart disease. Suppose that the serum-cholesterol levels of a group of people who eat a primarily macrobiotic diet are measured. Among 24 of them, ages 20-39, the mean cholesterol level was found to be 175 mg/dL with a standard deviation of 35 mg/dL.\footnote{Problem from Rosner, \textit{Fundamentals of Biostatistics}, 7$^{th}$ edition, p. 260}

a) Compute and interpret a 95\% CI for the population mean cholesterol level of individuals in this age group who eat a primarily macrobiotic diet.
`.gray);
print();


let inf = stats.Inference.Mean.CI(175, 35, 24, 0.95);
print("JLX:".yellow);
print(inf.descriptions.ci.yellow);
print("A:");
print(`The 95% CI is (160.2, 189.8) mg/dL. We are 95% confident that the interval (160.2, 189.8) mg/dL contains the population mean cholesterol level in individuals ages 20-39 who eat a primarily macrobiotic diet.`);
print();

print(`b) If the mean cholesterol level in the general population in this age group is 230 mg/dL, then test the hypothesis that people in this age group on a macrobiotic diet have cholesterol levels different from those of the general population.);
`.gray);

inf = stats.Inference.Mean.TestHypothesis(230, 175, 35, 24, "two-tailed");
// print(inf);
print("JLX:".yellow);
for (let key in inf.descriptions) {
    print(inf.descriptions[key].yellow);
}

print("A:");
print(`The 𝑝-value is vanishingly small; 𝑝 < 0.001. Since 𝑝 < 𝛼, there is sufficient evidence
to reject the null hypothesis that 𝜇 = 230 mg/dL. The results are statistically significant
at 𝛼 = 0.05, and we accept the alternative hypothesis that people on a
macrobiotic diet have cholesterol levels different from those of the general population.
Since 𝑥 is less than 𝜇0, the observed data suggest that people on a macrobiotic
diet have lower cholesterol levels than the general population. Note that these results
can only be generalized to the population of individuals who are ages 20-39.`)
print();

print(`2. Suppose that out of a cohort of 120 patients with stage I lung cancer at the Dana-Farber Cancer Institute (DFCI), 80 of the patients survive at least 5 years. Compute and interpret the approximate 95\% confidence interval for the 5-year survival probability of all DFCI patients with stage I lung cancer. Evaluate whether the assumptions for using the normal approximation are met.`.gray);