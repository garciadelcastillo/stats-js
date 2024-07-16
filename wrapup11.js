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


let inf = stats.Inference.Mean.ConfidenceInterval(175, 35, 24, 0.95);
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

inf = stats.Inference.Proportion.ConfidenceInterval(80, 120, 0.95, "two-tailed");
// print(inf);
print("JLX:".yellow);
for (let key in inf.descriptions) {
    print(inf.descriptions[key].yellow);
}

print("A:");
print(`
The observed sample proportion is 𝑝̂ = 80/120 = 0.667. It is reasonable to assume that the 5-year-survival of one patient is independent of the 5-year-survival of another patient. The success-failure condition is met since there are more than 10 patients who survive at least 5 years and more than 10 who do not.

With 95% confidence, the interval (0.582, 0.751) captures the 5-year survival probability of all DFCI patients with stage I lung cancer.
`)



print('3.  Using the data in `penguins` (from the `palmerpenguins` library), investigate whether the average difference in mean bill depth between Adelie penguins and Chinstrap penguins is different. Using theory-based inference, conduct a hypothesis test and calculate a confidence interval. Summarize your findings.'.gray);
print();

let penguins = csv.parse(fs.readFileSync('sample_data/palmer_penguins.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
}).filter(p => p['bill_length_mm'] != 'NA')
.map(p => {
    p['bill_length_mm'] = parseFloat(p['bill_length_mm']);
    p['bill_depth_mm'] = parseFloat(p['bill_depth_mm']);
    p['flipper_length_mm'] = parseFloat(p['flipper_length_mm']);
    p['body_mass_g'] = parseFloat(p['body_mass_g']);
    p['year'] = parseInt(p['year']);
    delete p[''];
    return p;
});

let penguins_data = penguins.filter(p => p['species'] == 'Adelie' || p['species'] == 'Chinstrap');

inf = stats.Inference.DifferenceInMeans(penguins_data, {
    variables: ['species', 'bill_depth_mm'],
    success: ['Adelie'],
    confidence: 0.95,
});
print("JLX:".yellow);
// print(inf);
for (let key in inf.descriptions) {
    print(inf.descriptions[key].yellow);
}
print();

print("A:");
print(`Let $\mu_A$ represent the population mean bill depth for Adelie penguins and $\mu_C$ represent the population mean bill depth for Chinstrap penguins.
    
Test $H_0: \mu_A = \mu_C$ against $H_A: \mu_A \neq \mu_C$. Let $\alpha = 0.05$.
Test 𝐻0 ∶ 𝜇𝐴 = 𝜇𝐶 against 𝐻𝐴 ∶ 𝜇𝐴 ≠ 𝜇𝐶 . Let 𝛼 = 0.05.

Compute the standardized test statistic.

$$t = \dfrac{\overline{x}_A - \overline{x}_C}{\sqrt{\frac{s_A^2}{n_A} + \frac{s_C^2}{n_C}}} = \dfrac{18.346 - 18.421}{\sqrt{\frac{1.217^2}{151} + \frac{1.135^2}{68}}} = -0.442 $$

The two-sided $p$-value is 0.660. There is insufficient evidence to reject $H_0$ in favor of $H_A$. These data are consistent with the population mean bill depth being the same for Adelie penguins and Chinstrap penguins. If it were actually true that mean bill depth does not vary between Adelies and Chinstraps, it would not be unusual to see a sample mean difference as or more extreme than what was observed.

With 95\% confidence, the difference in population mean bill depth between Adelie and Chinstrap penguins is within (-0.413, 0.263) mm. This interval contains 0, and so these data are plausible with there being no difference in mean bill depth between Adelies and Chinstraps.

`)

print(`
4.  Suppose we are interested in determining how many Adelie penguins we should sample in order to achieve a certain level of precision in a confidence interval for mean body mass.

a) Derive the sample size formula for a confidence interval for $\mu$, the population mean body mass of Adelie penguins.
`)

print("JLX:".yellow);
print(`Already did this in the notebook and 'week11.js' code.`.yellow);
print(`  ${"n >= (s*t*/ME)^2".bold.red}`);


print(`
b) Notice that the sample size formula contains $t^\star$. Why would it be difficult to find $t^\star$? We will typically sub in $z^\star$ for $t^\star$ when doing a sample size calculation, but what is the danger in doing so?
`)

print("JLX:".yellow);
print(`The Student t-distribution requires knowledge of the sample size to compute degrees of freedom, so we cannot use it here if we are actually trying to estimate sample size. We can sub it with N(0,1) distribution, but this will lead to thinner tails, which will result in the sample size being also smaller.
`.yellow);

print("A:");
print(`Finding $t^\star$ requires knowing the degrees of freedom, which is based on sample size; however, sample size is unknown since that is what we are trying to find. The danger in using $z^\star$ is that it will typically be smaller than $t^\star$, which will also lead to a smaller value of $n$. As a result, the sample size found in the calculation may not actually be large enough to give the desired precision.
`)


print(`
c) Let's determine the sample size needed to estimate $\mu$ with 95\% confidence when $s = 450$ grams and we approximate $t^\star$ with $z^\star$. Find the needed sample size for a margin of error within 50 grams, 100 grams, 150 grams. How does sample size change as the desired margin of error increases?
`)

sample_50 = stats.SampleSize.Mean(0.95, 50, 450);
sample_100 = stats.SampleSize.Mean(0.95, 100, 450);
sample_150 = stats.SampleSize.Mean(0.95, 150, 450);

print("JLX:".yellow);
print(`Sample size needed for margin of error within 50 grams: ${sample_50}`.yellow);
print(`Sample size needed for margin of error within 100 grams: ${sample_100}`.yellow);
print(`Sample size needed for margin of error within 150 grams: ${sample_150}`.yellow);
print();

print(`
d) Now let's investigate the relationship between sample size and confidence level. Calculate the sample size needed to estimate $\mu$ when $s = 450$ grams, $B = 100$, and we approximate $t^\star$ with $z^\star$ at confidence levels of 90\%, 95\%, and 99\%. How does the sample size change as the desired confidence level increases?
`)

sample_90 = stats.SampleSize.Mean(0.90, 100, 450);
sample_95 = stats.SampleSize.Mean(0.95, 100, 450);
sample_99 = stats.SampleSize.Mean(0.99, 100, 450);

print("JLX:".yellow);
print(`Sample size needed for 90% confidence: ${sample_90}`.yellow);
print(`Sample size needed for 95% confidence: ${sample_95}`.yellow);
print(`Sample size needed for 99% confidence: ${sample_99}`.yellow);
print();
