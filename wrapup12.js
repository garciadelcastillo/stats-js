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
var asciichart = require('asciichart');
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
// ██╗    ██╗██████╗  █████╗ ██████╗ ██╗   ██╗██████╗      ██╗██████╗ 
// ██║    ██║██╔══██╗██╔══██╗██╔══██╗██║   ██║██╔══██╗    ███║╚════██╗
// ██║ █╗ ██║██████╔╝███████║██████╔╝██║   ██║██████╔╝    ╚██║ █████╔╝
// ██║███╗██║██╔══██╗██╔══██║██╔═══╝ ██║   ██║██╔═══╝      ██║██╔═══╝ 
// ╚███╔███╔╝██║  ██║██║  ██║██║     ╚██████╔╝██║          ██║███████╗
//  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝          ╚═╝╚══════╝
//                                                                    
`);

print(`
No problem 1, I did not implement linear regression-related functions in this script.
`)

print(`

2. Suppose we are interested in determining whether the body mass of penguins varies by species, using the data in the 'palmerpenguins' package.

  a) Produce an exploratory data visualization that shows the association between penguin body mass and species. Describe what you see. 
  
  b) Write the null and alternative hypotheses for this analysis.
  
  c) Describe how you would determine one possible value of the null distribution if you were using labeled notecards.
  
  d) Carry out the ANOVA using either a simulation-based approach or a theory-based approach. Report the $p$-value and your conclusions. If using a theory-based approach, check the modeling assumptions.
`.gray);

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

  penguins = penguins.filter(p => p['species'] == 'Adelie' ||
  p['species'] == 'Chinstrap' || 
  p['species'] == 'Gentoo');

// print(penguins);

print(`
Simulation-based ANOVA 
`);

let F = stats.fValue(penguins, {
  variable: 'body_mass_g',
  category: 'species',
  groups: ['Adelie', 'Chinstrap', 'Gentoo']
});
print(`F = ${F}`.green);
print(`We can compute the p-value by bootstrapping:`)

let null_dist = stats.nullDistributionANOVA(penguins, 10000, {
  variable: 'body_mass_g',
  category: 'species',
  // groups: ['Adelie', 'Chinstrap', 'Gentoo']
});
plotHistogram(null_dist, {
  title: 'Null distribution of F values',
  color: 'marine',
  binStart: 0,
  binEnd: 5,
  binWidth: .1,
  decimals: 0,
});

let p_value = stats.pValue(null_dist, F, "greater");
print(`P-value: ${p_value}`.red);
print();
print();

print(`
Theory-based ANOVA:
`);

let inf = stats.Inference.ANOVA(penguins, {
  variable: 'body_mass_g',
  category: 'species',
  // groups: ['Adelie', 'Chinstrap', 'Gentoo']
});
print(inf);