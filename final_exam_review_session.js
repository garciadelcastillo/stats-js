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
const { slice } = require('jStat');
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
███████╗██╗███╗   ██╗ █████╗ ██╗                      
██╔════╝██║████╗  ██║██╔══██╗██║                      
█████╗  ██║██╔██╗ ██║███████║██║                      
██╔══╝  ██║██║╚██╗██║██╔══██║██║                      
██║     ██║██║ ╚████║██║  ██║███████╗                 
╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝                 
                                                      
██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗        
██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║        
██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║        
██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║        
██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝        
╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝         
                                                      
███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                                      
`);

print(`
---
title: "Final Exam Review Session"
author: "Insert Name"
format: pdf
editor: visual
---

# Overview

This QMD file will be used to review for the final exam during the review session held by TF Jude Stafford. If you do not attend the review session, feel free to still work through this practice and asks questions to the Slack channel or at office hours! Material in the course is divided into different sections.

# The Data

Thanks to [Kaggle](https://www.kaggle.com/) for this dataset.

**Context:** The 'cereal' dataset contains 77 observations of 13 variables relating to nutrition facts: "If you like to eat cereal, do yourself a favor and avoid this dataset at all costs. After seeing these data it will never be the same for me to eat Fruity Pebbles again." -- Chris Crawford, creator of dataset.

**Content:**

| 'variable' | Description                                            |
|------------|--------------------------------------------------------|
| 'name'     | Name of the cereal                                     |
| 'mfr'      | Manufacturer of the cereal                             |
| 'type'     | Type of cereal (cold or hot)                           |
| 'calories' | Calories per serving                                   |
| 'protein'  | Grams of protein per serving                           |
| 'fat'      | Grams of fat per serving                               |
| 'sodium'   | Milligrams of sodium per serving                       |
| 'fiber'    | Grams of dietary fiber per serving                     |
| 'carbo'    | Grams of complex carbohydrates per serving             |
| 'sugars'   | Grams of sugars per serving                            |
| 'potass'   | Milligrams of potassium per serving                    |
| 'vitamins' | Vitamins and minerals (0, 25, or 100, indicating %FDA) |
| 'shelf'    | Display shelf (1, 2, or 3, counting from the floor)    |
| 'weight'   | Weight in ounces of one serving                        |
| 'cups'     | Number of cups in one serving                          |
| 'rating'   | Rating of the cereal                                   |
`.gray);

print(`
Let's load the cereal dataset
`.yellow);

let cereal = csv.parse(fs.readFileSync('sample_data/cereal.csv', 'utf-8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
}); 
// print(cereal)

print(`
Some data viz: 
`.yellow);

plotHistogram(cereal.map(c => c.calories), { 
  title: 'Calories per serving',
  color: 'marine',
  binStart: 0,
  binEnd: 200,
  binWidth: 10,
  decimals: 0,
});

plotHistogram(cereal.map(c => c.protein), {
  title: 'Protein per serving',
  color: 'orange',
  binStart: 0,
  binEnd: 10,
  binWidth: 1,
  decimals: 1,
});

plotHistogram(cereal.map(c => c.fat), {
  title: 'Fat per serving',
  color: 'red',
  binStart: 0,
  binEnd: 10,
  binWidth: 1,
  decimals: 1,
});

let manufacturers = stats.unique(cereal.map(c => c.mfr));
print("Manufacturers: " ,manufacturers);

print(`

## Data Wrangling

Now, we will review data wrangling. There are three problems in this section.

1)  Let's create a new binary variable that indicates a cereal being healthy or not. Assume that a cereal is only healthy if it contains less than 5 grams of sugar, more than 3 grams of fiber, and less than 3 grams of fat per serving. What manufacturer makes the highest proportion of healthy cereals? Sort the table from highest proportion of healthy to lowest to figure this out. Are there any caveats to this finding?


2)  Create a data frame that contains the name, manufacturer, and rating of the three top-rated cereals on the third shelf with at least 10 grams of carbohydrates. Sort this data frame in descending order by the number of cups in a serving.


3)  Everyone loves the Halloween cereals (Count Chocula, Boo Berry, and Franken Berry), but only Count Chocula is included in this data frame. Run the code of chunk below to create a data frame that includes Boo Berry and Franken Berry. After that, merge the data frame with the 'cereal' data frame, so the Halloween cereals are included for the rest of this review. Justify your choice of '---_join'.

# create the new data frame
halloween <- data.frame(name = c("Franken Berry", "Boo Berry"),
                        mfr = c("General Mills", "General Mills"),
                        type = c("C", "C"), calories = c(127, 130),
                        protein = c(1.7, 1.9), fat = c(1.4, 1.4),
                        sodium = c(191, 190), fiber = c(1.4, 1.3),
                        carbo = c(28, 28), sugars = c(10, 10),
                        potass = c(53, 51), vitamins = c(25, 25), 
                        shelf = c(2, 2), weight = c(1, 1),
                        rating = c(17.4, 15.8))
`.gray);

print(`1) Healthy Manufacturers`.yellow)

cereal = cereal.map(c => {
  c.healthy = c.sugars < 5 && c.fiber > 3 && c.fat < 3;
  c.rating = parseFloat(c.rating);
  return c;
});
// print(cereal);

let healthy_manufacturers = [];
manufacturers.forEach(m => {
  let total = cereal.filter(c => c.mfr === m).length;
  let healthy = cereal.filter(c => c.mfr === m && c.healthy).length;
  let proportion = healthy / total;
  if (proportion > 0) {
    healthy_manufacturers.push({ manufacturer: m, proportion: proportion, n: healthy });
  }
});
healthy_manufacturers.sort((a, b) => b.proportion - a.proportion);
print(healthy_manufacturers);
print();

print(`2) Top3:`.yellow)
let top3 = cereal.filter(c => c.shelf == 3 && c.carbo >= 10)
  .toSorted((a, b) => b.rating - a.rating)
  .slice(0, 3)
  .toSorted((a, b) => a.cups - b.cups)
  .map(c => ({ 
    name: c.name, 
    manufacturer: c.mfr, 
    rating: c.rating, 
    cups: c.cups 
  }));
print(top3);
print();


print(`3) Add Halloween cereal:`.yellow)
let halloween = [
  { name: "Franken Berry", mfr: "G", type: "C", calories: 127, protein: 1.7, fat: 1.4, sodium: 191, fiber: 1.4, carbo: 28, sugars: 10, potass: 53, vitamins: 25, shelf: 2, weight: 1, rating: 17.4 },
  { name: "Boo Berry", mfr: "G", type: "C", calories: 130, protein: 1.9, fat: 1.4, sodium: 190, fiber: 1.3, carbo: 28, sugars: 10, potass: 51, vitamins: 25, shelf: 2, weight: 1, rating: 15.8 }
];
cereal = cereal.concat(halloween);
print(cereal.slice(-3));
print();

// Rerun healthy manufacturers
cereal = cereal.map(c => {
  c.healthy = c.sugars < 5 && c.fiber > 3 && c.fat < 3;
  return c;
});

print(`

## Linear Regression

This section focuses on linear regression from the first half of the semester. There are two problems in this section.

1)  Visualize the association between 'rating' regressed on 'calories' and 'mfr'. Build different forms of models, and proceed with the one of your choice. Justify this choice. Then, predict what the 'rating' would be of a cereal produced by Kelloggs that has 240 calories per serving. Does this estimate make sense? Why should we be careful with making this prediction?

2)  Interpret each coefficient for the model chosen in the previous step. Do any of the coefficients lack interpretive value?
`.gray)

print(`1) Linear Regression`.yellow)

let regression_coefficients_per_manufacturer = {};
let regression_models_per_manufacturer = {};
manufacturers.forEach(m => {
  let cereal_per_mnf = cereal.filter(c => c.mfr === m);
  let calories = cereal_per_mnf.map(c => +c.calories);
  let rating = cereal_per_mnf.map(c => +c.rating);
  let coeff = stats.leastSquaresRegression(calories, rating);
  let model = stats.linearRegressionModel(coeff);
  regression_coefficients_per_manufacturer[m] = coeff;
  regression_models_per_manufacturer[m] = model;
});
print(regression_coefficients_per_manufacturer);
// print(regression_models_per_manufacturer);
print(`Not sure how to visualize that here... `);

let kelloggs = regression_models_per_manufacturer['K'];
let kelloggs_rating = kelloggs(240);
print(`Predicted rating for Kelloggs cereal with 240 calories: ${kelloggs_rating}`);
print(`The linear regression for this value results in a negative rating!`.red);
print();

print(`


# Second Half of Course

## Estimation and Confidence Intervals

The next portion of statistical inference is estimation. There are two problems in this section.

1)  Build a 95% confidence interval for the true mean average rating of cereals. Would it be reasonable for someone to claim that the true average rating of all cereals is 50, assuming this is a representative sample? (Use the simulation-based approach.)


2)  Now, construct a confidence interval for the true difference in mean ratings for cereals that have at least 110 calories per serving and cereals that have less than 100 calories per serving. This time, use the theory-based approach. Confirm that the CLT assumptions are met.
`)


print(`1) Estimation`.yellow)

let all_ratings = cereal.map(c => +c.rating);
let mean_rating = stats.mean(all_ratings);
let std_rating = stats.standardDeviation(all_ratings);
print(`Mean rating: ${mean_rating}`);
print(`Standard deviation: ${std_rating}`);

let bs_dist = stats.nullDistribution(all_ratings, 10000, {
  null: 'point',
  point: mean_rating,
  statistic: 'mean'
});
let ci = stats.confidenceInterval(bs_dist, 0.95);

print(`1) 95% confidence interval for the true mean average rating of cereals:`, ci);
print(`It would not be reasonable to claim that the true average rating of all cereals is 50, as this value is not within the confidence interval.`);
print();

print(`2) Estimation`.yellow)

cereal = cereal.map(c => {
  c.high_calories = c.calories >= 110;
  // c.low_calories = c.calories < 100;
  return c;
});
// print(cereal);
print(`Number of cereals with at least 110 calories:`);
print(stats.countByValueCombination(cereal, ['high_calories']));

let inf = stats.Inference.DifferenceInMeans(cereal, {
  variables: ['high_calories', 'rating'],
  success: [true],
  confidence: 0.95
});
print(inf);
print(inf.descriptions.ci.red);
print(`This means that we are 95% confident that, on average, cereals with at least 110 calories receive a rating of ~ -15.32 to -25.94 points lower than cereals that have less than 110 calories per serving.`.yellow)
print();





print(`
## Hypothesis Testing

Now, we will review basic hypothesis testing. There are two problems in this section.

1)  Use the simulation-based method to conduct a hypothesis test for the difference in ratings for cereals with at least 110 calories and cereals with less than 110 calories. Complete all of the following

    -   Create an exploratory data visualization and draw a conclusion from it.
    -   State the null and alternative hypotheses
    -   Report the test statistic.
    -   Report and interpret the $p$-value.
    -   Draw conclusions about the research conjecture.



2)  Your friend claims that only 10% of all cereals are healthy. Although alarming, you believe that the true proportion is even lower than this. Using the theory-based approach to hypothesis testing, can you conclude who is correct?
`);



print(`1) Hypothesis Testing`.yellow)

let mean_rating_high_calories = stats.mean(cereal.filter(c => c.high_calories).map(c => +c.rating));
let mean_rating_low_calories = stats.mean(cereal.filter(c => !c.high_calories).map(c => +c.rating));

print(`The null hypothesis is that the mean rating for cereals with at least 110 calories is equal to the mean rating for cereals with less than 110 calories. The alternative hypothesis is that the mean rating for cereals with at least 110 calories is not equal, less than or greater than the mean rating for cereals with less than 110 calories.`);

print(`Mean rating for cereals with at least 110 calories: ${mean_rating_high_calories}`);
print(`Mean rating for cereals with less than 110 calories: ${mean_rating_low_calories}`);

let test_statistic = mean_rating_high_calories - mean_rating_low_calories;
print(`Test statistic: ${test_statistic}`);

let null_dist = stats.nullDistributionMulti([
  cereal.map(c => c.rating),
  cereal.map(c => c.high_calories)
], 10000, {
  null: 'independence',
  statistic: 'diff in means',
  types: ['numerical', 'categorical'],
  order: [true, false]
});
plotHistogram(null_dist, {
  title: 'Difference in Ratings for Cereals with at least 110 Calories and Cereals with less than 110 Calories',
  color: 'orange',
  binStart: -12,
  binEnd: 12,
  binWidth: 1,
  decimals: 0,
});

let p_value = stats.pValue(null_dist, test_statistic, 'two-sided');
print(`P-value: ${p_value}`.red);
print(`The 𝑝-value is 0. This means that there is probability of 0 that we would observe a test statistic as or more extreme than the one that we did, assuming the 𝐻0 is true. It’s very unlikely that this observed statistic is due to random chance alone.

Because our 𝑝-value is very low, we can reject the null hypothesis that there is no difference
in the average rating between cereals with at least 110 calories and those with less than 110
calories. We have extreme evidence for the alternative – that is, cereals in the two categories
do not have the same average rating.`);
print();
print();
print();

print(`2) Hypothesis Testing`.yellow)


inf = stats.Inference.Proportion(cereal.map(c => c.healthy), {
  success: true,
  null: 0.1,
  confidence: 0.95,
  direction: 'less'
});
print(inf);
print(`TEXT: To see who is correct, we ran a hypothesis test with 𝐻0 ∶ 𝑝 = 0.1 and 𝐻𝑎 ∶ 𝑝 < 0.1. The test statistic calculated was 𝑧 = −2.21, which translates to a 𝑝-value of 0.01. Because the chance of obtaining a test statistic as extreme as the one we did is very unlikely as a result of pure chance, we have evidence in favor of 𝐻𝑎, concluding that the true proportion of healthy cereals is under 0.1.
Unfortunately, the assumptions for this test are not met. We would need at least 10 healthy and 10 unhealthy cereals to use the theory-based approach. We only have 2 healthy cereals.


`)

print(`

## Inference for Regression

We will return to linear regression in this section, but we will focus on statistical inference applied to linear regression. There is one problem in this section.

1)  Fit a linear regression model that predicts 'rating' from 'calories', 'protein', 'fiber', and a new indicator variable 'shelf' 3, indicating that a cereal is on the third sheld. Controlling for 'calories', 'protein', and 'fiber', does whether a cereal is on the thrid shelf or not affect the 'rating'? Make sure to...

    -   State null and alternative hypotheses.
    -   Check your assumptions.
    -   Create an exploratory visualization.
    -   Report the test statistic and $p$-value.
    -   Draw a conclusion about the research conjecture.


## ANOVA and Chi-Squared

For the final section of this review, we will look at two tests designed to go beyond binary categorical variables: ANOVA and Chi-Squared. There is one problem in this section.

1)  Is there evidence that, without controlling for other variables, the average rating across manufacturers is the same? Use the simulation-based approach, the theory-based approach, and a theory-based approach with regression. Do any of the conclusions conflict? Why should we be careful in using the theory-based approach here?

**Good luck on the exam!**
`)

print(`SKIPPED THE INFERENCE FOR REGRESSION PART...
`.red);


print(`1) ANOVA and Chi-Squared`.yellow)

print("Simulation-based approach");
test_statistic = stats.fValue(cereal, {
  variable: 'rating',
  category: 'mfr',
});
print(`Test statistic F: ${test_statistic}`);

null_dist = stats.nullDistributionANOVA(cereal, 10000, {
  variable: 'rating',
  category: 'mfr',
});
plotHistogram(null_dist, {
  title: 'F-Distribution for ANOVA Test',
  color: 'orange',
  binStart: 0,
  binEnd: 5,
  binWidth: 0.25,
  decimals: 2,
});

p_value = stats.pValue(null_dist, test_statistic, 'greater');
print(`P-value: ${p_value}`.red);
print();
print();


print("Theory-based approach");
inf = stats.Inference.ANOVA(cereal, {
  variable: 'rating',
  category: 'mfr',
});
print(inf);


print(`TEXT:

𝐻0 is that the average rating between each manufacturer is the same. 𝐻𝑎 is that at least one of the average ratings is different between manufacturers. All three methods give us low 𝑝-values, and they don’t conflict with each other.

We should be careful in using the theory-based approach because we don’t have 𝑛 = 30 for any group. This means that our data could follow some distribution other than the assumed 𝐹 distribution. The standard deviations of each group are also significantly different, so we should be careful with any conclusions we draw from theory-based inference here.`)


