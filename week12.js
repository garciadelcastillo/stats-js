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
// ██║███╗██║██╔══╝  ██╔══╝  ██╔═██╗      ██║██╔═══╝ 
// ╚███╔███╔╝███████╗███████╗██║  ██╗     ██║███████╗
//  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝     ╚═╝╚══════╝
//                                                                                  
`);

print(`


## INFERENCE REGRESSION Week 12 4/15

She discusses how linear regression models can be built and analyzed. The assumptions discussion was particularly interesting. 

She also discusses how to interprest 'regression tables', a summary of a model that R gives you. This is useful to analyze which variables have an effect of inference. However, the math is not really explained, in particular I have a problem with the estimation of the SE in the tables/formulas. 

I don't feel like I can replicate them. Also, all of this will probably be quite extended in CS109a?

## ANOVA Week 12 4/17

ANOVA: Analysis of VARIANCE.

Discussed the case of a QUANT RESPONSE VARIABLE, and a CATEGORICAL EXPLANATORY var which is NOT BINARY. 

μ1 - μ2 makes no sense anymore, we have more than 2 stats, hence many more means. 

Null hypothesis is now: (k = number of categories)
H0: μ1 = μ2 = ... = μk      (explanatory and response variables are independent/not related: knowing whichexp  cat I am in does not tell me anything about my res variable)
Ha: at least one mean is not equal to the rest.  (variables are dependent/related)

What test statistic can we choose? Not a mean from the sample, but we will use _variability_. 

For two scenarios with same means per category, we are more convinced by the scneraio where the responses have less variability (the values have a smaller range), because it indicates all responses are closer to the mean. 

SSG, SSE, MSG, MSE

F = MSG / MSE

If H0 is true, then F should be close to 1.
If Ha is true, F should be greater than 1. 

F gives us a sense of how much larger the variability between groups is than the variability within groups. 

To gauge F values, we need to construct a null distribution. We can do this two ways: 

- Simulation: do this by shuffling/permuting the exp and res variables (is this considered bootstrapping?). Then the p-value is the area to the right of the observed test statistic.  
- Approximation: 
  - we assume:
    - We have at least 30 observations per group, or the res var is normal (look at histograms).
    - The variability is similar for all groups (standard deviation). 
      - Rule of thumb for this: 2 * minSD > maxSD
  - If the above is true, then the 'test_statistic ~ F(df1 = K - 1, df2 = n - K)'
  - At any rate, the ANOVA test is quite resilient to the above, so we can be a bit flexible here... 

Due to the square nature of the means, the dist will likely be right-skewed (right foot toes).

WE could have done this with linear regression (?). The ANOVA test is a special case of this. 

This was One-Way ANOVA (1 cat explanatory var)
There is two-way (2 cat expl vars)
There is Repeated Measures ANOVA: multiple observations on each case (this one is for multi measures on same subject).
There is ANOVA for regression: allow comparisons of various subsets of multiple linear regression models. 
`.yellow);

print(`
Let's see if I can replicate some results from slide 33: Saratoga houses, relation between price and central air:

# A tibble: 2 × 7
term estimate std_error statistic p_value lower_ci upper_ci
<chr>               <dbl> <dbl> <dbl>  <dbl>   <dbl>    <dbl>
1 intercept       254904. 3685.  69.2      0  247676. 262132.
2 centralAir: No  -67882. 4634. -14.6      0  -76971. -58794.
`)

const saratoga = csv.parse(fs.readFileSync('sample_data/saratogahouses.csv', 'utf8'), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ','
})
  .filter(d => d.price != 'NA' &&
               d.centralAir != 'NA')
  .map(d => {
    d.price = +d.price;
    d.centralAir = d.centralAir == 'Yes' ? 1 : 0;
    return d;
  });
// print(saratoga)

// inf = stats.Inference.DifferenceInMeans(saratoga, {
//   variables: ['centralAir', 'price'],
//   success: [0],
//   confidence: 0.95
// });
// print(inf);

let prices_all = saratoga.map(d => d.price);
let mean = stats.mean(prices_all);
let sd = stats.standardDeviation(prices_all);
print(`ALL Mean: ${mean}, SD: ${sd}`);

let prices_no_air = saratoga.filter(d => d.centralAir == 0).map(d => d.price);
mean = stats.mean(prices_no_air);
sd = stats.standardDeviation(prices_no_air);
print(`NO AIR Mean: ${mean}, SD: ${sd}`);

let inf_prices_no_air = stats.Inference.Mean(prices_no_air, {
  null: 0,
  confidence: 0.95
});
print(inf_prices_no_air);

let prices_air = saratoga.filter(d => d.centralAir == 1).map(d => d.price);
mean = stats.mean(prices_air);
sd = stats.standardDeviation(prices_air) / Math.sqrt(prices_air.length);
print(`prices_air Mean: ${mean}, SD: ${sd}`);

let inf_prices_air= stats.Inference.Mean(prices_air, {
  // null: stats.mean(prices_all),
  null: 0,
  confidence: 0.95
});
print(inf_prices_air);

// // What is the null value to reach the same statistic as in the slides?
// let inf_prices_air;
// let null_value = 0, its = 0;
// do {
//   inf_prices_air= stats.Inference.Mean(prices_air, {
//     // null: stats.mean(prices_all),
//     null: null_value,
//     confidence: 0.95
//   });
//   null_value--;
//   its++;  
// } while ((Math.abs(inf_prices_air.t - 69.2) > 0.01) && its < 100000);
// print(inf_prices_air);


print(`Yeah, I can't quite figure it out... 😭`.red); 
print();
print();
print();
print();


print(`
//  █████╗ ███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ 
// ██╔══██╗████╗  ██║██╔═══██╗██║   ██║██╔══██╗
// ███████║██╔██╗ ██║██║   ██║██║   ██║███████║
// ██╔══██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║
// ██║  ██║██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║
// ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝
//                                             
// ANOVA testing
`);

print(`
Let's see if I can replicate some results from the slides: Hollywood movies, relation between genre and audience score:
(see stat100_wk12wed.pdf)
`);

print(`
Computing the F value of the movie ratings by genre:
`.yellow)

let hollywood_movies = csv.parse(fs.readFileSync('sample_data/HollywoodMovies2011.csv', 'utf8'), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ','
});

let movies = hollywood_movies.filter(d => d.Genre != 'NA' &&
                                          d.Genre != 'Fantasy' &&
                                          d.Genre != 'Adventure' &&
                                          d.Genre != '' &&
                                          d.AudienceScore != '')
  .map(d => {
    d.AudienceScore = +d.AudienceScore
    return d;
  });
// print(movies);

let genres = stats.unique(movies.map(d => d.Genre));
print(genres);

let scores = movies.map(d => d.AudienceScore);

let sst = stats.sumOfSquaresTotal(scores);
print(`SST: ${sst}`);

let ssg = stats.sumOfSquaresGroup(movies, {
  variable: 'AudienceScore',
  category: 'Genre',
  // groups: genres,
  // groups: ['Horror', 'Action'],
});
print(`SSG: ${ssg}`);

let sse = stats.sumOfSquaresError(movies, {
  variable: 'AudienceScore',
  category: 'Genre',
  // groups: genres,
  // groups: ['Horror', 'Action'],
});
print(`SSE: ${sse}`);
print();

print(`Check: is SST = SSG + SSE?`.yellow);
print(`SST: ${sst}, SSG + SSE: ${ssg + sse}`.red);
print();

let MSG = ssg / (genres.length - 1);
let MSE = sse / (movies.length - genres.length);
let F = MSG / MSE;
print(`MSG: ${MSG}`);
print(`MSE: ${MSE}`);
print(`F: ${F} !!!! 💪`.red);
print();

print(`In one function:`.yellow);
F = stats.fValue(movies, {
  variable: 'AudienceScore',
  category: 'Genre'
});
print(`F: ${F} !!!! 💪`.red);
print();


print(`We can compute the p-value by bootstrapping:`)

let null_dist = stats.nullDistributionANOVA(movies, 10000, {
  variable: 'AudienceScore',
  category: 'Genre'
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

print(`Or we can compute the p-value by approximating the null distribution with an f-distribution:`);

let inf = stats.Inference.ANOVA(movies, {
  variable: 'AudienceScore',
  category: 'Genre',
  confidence: 0.95,
  // direction: 'greater',  // default 

});
print(inf);
print(`Yaaay! Looks like I get the same results as in slide 33! 🎉`.red);
