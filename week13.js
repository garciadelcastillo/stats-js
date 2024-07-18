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
// ██╗    ██╗███████╗███████╗██╗  ██╗     ██╗██████╗ 
// ██║    ██║██╔════╝██╔════╝██║ ██╔╝    ███║╚════██╗
// ██║ █╗ ██║█████╗  █████╗  █████╔╝     ╚██║ █████╔╝
// ██║███╗██║██╔══╝  ██╔══╝  ██╔═██╗      ██║ ╚═══██╗
// ╚███╔███╔╝███████╗███████╗██║  ██╗     ██║██████╔╝
//  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝╚═════╝ 
//                                                                                                                                  
`);

print(`
Going to try to implement the chi-squared test for independence.
The greek symbol for chi squared is χ²
`)

let eye_lighting = csv.parse(fs.readFileSync('sample_data/eye_lighting.csv', 'utf-8'), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ','
});
// print(eye_lighting);

// count = stats.countByValueCombination(eye_lighting, ['Eye']);
// print(count);
// count = stats.countByValueCombination(eye_lighting, ['Lighting']);
// print(count);
// count = stats.countByValueCombination(eye_lighting, ['Eye', 'Lighting']);
// print(count);

print(`Let's compute the chi-squared test for independence for the Eye and Lighting columns from the slides:`);
let chisq = stats.chiSquared(eye_lighting, {
  explanatory: 'Lighting',
  response: 'Eye'
});
print(`The chi-squared value is ${chisq}
`.yellow);

print(`Boostraping the null distribution of χ² values...`)
let null_dist  = stats.nullDistributionChiSquared(eye_lighting, 1000, {
  explanatory: 'Lighting',
  response: 'Eye'
});
plotHistogram(null_dist, {
  title: 'Null distribution of χ² values',
  color: 'marine',
  binStart: 0,
  binEnd: 10,
  binWidth: .2,
  decimals: 0,
});
let p_value = stats.pValue(null_dist, chisq, "greater");
print(`The p-value is ${p_value}`);
print(`This p-value indicates that the observed data is statistically significant at the 0.05 level. This means that we can confidently reject the null hypothesis that nursery lighting and eye vision are independent.`);
print();
print(`The theory-based approach:`);

let inf = stats.Inference.ChiSquared(eye_lighting, {
  explanatory: 'Lighting',
  response: 'Eye'
});
print(inf);
print(`Same conclusions as before.`);
print();




print(`Let's look at the penguins and an absurd hypothesis: is the sex of the penguins biased by their species? In other words, are penguins of a particular species more likely to be of a particular gender?`);

let penguins = csv.parse(fs.readFileSync('sample_data/palmer_penguins.csv', 'utf-8'), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ','
});

// Drop NA values
penguins = penguins.filter(row => row['sex'] != 'NA');

// chisq = stats.chiSquared(penguins, {
//   explanatory: 'species',
//   response: 'sex'
// });
// print(`The chi-squared value is ${chisq}.`.yellow);

// null_dist  = stats.nullDistributionChiSquared(penguins, 1000, {
//   explanatory: 'species',
//   response: 'sex'
// });
// plotHistogram(null_dist, {
//   title: 'Null distribution of χ² values',
//   color: 'marine',
//   binStart: 0,
//   binEnd: 10,
//   binWidth: .2,
//   decimals: 0,
// });
// p_value = stats.pValue(null_dist, chisq, "greater");
// print(`The p-value is ${p_value}`);

inf = stats.Inference.ChiSquared(penguins, {
  explanatory: 'species',
  response: 'sex',
  alpha: 0.05
});
print(inf);
print(`As we can see, the p-value is so high, that we FAIL TO REJECT the null hypothesis that there is no association between the species of the penguins and their sex`.red);
