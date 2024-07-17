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
// ██████╗ ███████╗███████╗████████╗     █████╗ 
// ██╔══██╗██╔════╝██╔════╝╚══██╔══╝    ██╔══██╗
// ██████╔╝███████╗█████╗     ██║       ╚██████║
// ██╔═══╝ ╚════██║██╔══╝     ██║        ╚═══██║
// ██║     ███████║███████╗   ██║        █████╔╝
// ╚═╝     ╚══════╝╚══════╝   ╚═╝        ╚════╝ 
//                                              
`);

print(`
### Problem 1

Vitamin D is essential for growth and bone health in children. It can be either obtained from dietary sources or produced by the body upon exposure of skin to ultraviolet waves (typically via sun exposure). Natural food sources rich in Vitamin D are scarce. Even in many low latitude countries where sunshine is plentiful, Vitamin D deficiency is a public health concern. It is thought that vitamin D deficiency could be due to various factors such as avoidance of sunlight, indoor lifestyles, and low-calcium diet.

A study was conducted to evaluate Vitamin D status among schoolchildren in Thailand. Exposure to sunlight allows the body to produce a serum that is an indicator of Vitamin D status; i.e., the levels of this serum in the body can be measured.

The study sample consisted of schoolchildren between THE ages of 6 and 14 years old. The researchers randomly selected 10 schools of all the schools in the ten poorest rural subdistricts in Thailand. Within each school, they divided children into four groups: females grades 1-3, males grades 1-3, females grades 4-6, and males grades 4-6. A simple random sample of 15 children were selected from each of these four groups.

Investigate the conjecture that for female schoolchildren, there is a negative linear relationship between vitamin D serum level ('vitd_serum') and age ('age').

a. Using a **simulation-based** approach, conduct a hypothesis test and summarize your results.  Make sure to include:

* A useful exploratory data visualization and a relevant conclusion from this visualization.
* The null and alternative hypotheses, the observed test statistic, and the $p$-value.
* An interpretation of the $p$-value in the context of the problem.
* Conclusions about the research conjecture.
`.gray)

vitd = csv.parse(fs.readFileSync('sample_data/vitd_subset.csv', 'utf8'), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ','
})
  .filter(d => d.school != 'NA' &&
                d.sex != 'NA' &&
                d.age != 'NA' &&
                d.height != 'NA' &&
                d.weight != 'NA' &&
                d.vitd_serum != 'NA')
  .map(d => {
    d.school = +d.school;
    d.age = +d.age;
    d.height = +d.height;
    d.weight = +d.weight;
    d.vitd_serum = +d.vitd_serum;
    return d;
  });
// print(vitd);
// print(vitd.length);

print(`JLX:`.yellow);
print(`No visual EDA, can't plot here 😅`.yellow);
print(`Did it in RStudio, screenshot in assets/JLX_2024-07-16_16-53-59_BST.png`.yellow);
print(`There is a slight negative correlation between the two`.yellow);
print();

print(`Let's start with the observed statistic: is there any correlation between age and serum?`.yellow);

ages = vitd.map(d => d.age);
serums = vitd.map(d => d.vitd_serum);

observed_stat = stats.correlation(ages, serums);
print(`The correlation between age and serum is ${observed_stat}`.yellow);
print(`Looks like there is a slight negative correlation between age and serum. This is consistent with the plot.`.yellow);
print();
print(`The null hypothesis is that there is no relationship between the two variables, i.e. H0: cor(age, serum) = 0. The alternative hypothesis is that there is a negative linear relationship between the two variables, i.e. Ha: cor(age, serum) < 0.`.yellow);

print(`In order to make a simulation-based approach, we need to simulate the null hypothesis. The null hypothesis is that there is no relationship between the two variables. We can do this by shuffling the 'age' variable and then calculating the correlation between the shuffled 'age' and 'vitd_serum' variables. We can then repeat this process many times to get a distribution of correlation values under the null hypothesis.`.yellow);
print();

bs_dist = stats.nullDistributionMulti([ages, serums], 10000, {
  null: 'independence',
  statistic: 'correlation',
});
// print(bs_dist);
mean = stats.mean(bs_dist);
sd = stats.standardDeviation(bs_dist);
print(`The mean of the null distribution is ${mean} and the standard deviation is ${sd}`.yellow);

p_value = stats.pValue(bs_dist, observed_stat, 'smaller');
print(`The p-value is ${p_value}`.yellow);

z_score = stats.zScore(observed_stat, mean, sd);
print(`The z-score is ${z_score}`.yellow);
ci = stats.confidenceInterval(bs_dist, 0.95);
print(`The 95% confidence interval is:`.yellow);
print(ci);
print();

print(`Based on the above, it looks like we can confidently reject the null hypothesis that there is no relationship between age and serum, and that there is evidence of a negative linear relationship between the two variables.`.green);
print();

print(`
For the rest of this problem, let's explore how our analysis changes if we use a **theory-based** approach.  

b. Do the hypotheses change if we use a theory-based approach instead of a simulation-based approach?  Explain why or why not.
`.gray);

print(`It doesn't feel to me like there is any change in the hypotheses.
`.yellow);

print(`c. For this problem, is the sample size assumption of the Central Limit Theorem met?  Hint: Use these [inference summary tables](https://mcconvil.github.io/stat100s24/inference_summary.html) to determine the required sample size.
`.gray);

print(`It is, we just need more than 30 samples.
`.yellow);

print(`d. Use 'cor.test()' to compute the z-score test statistic and corresponding p-value.  Interpret the $z$-score test statistic in context of the data.  Also, which distribution does the test statistic approximately follow when the sample size is large? 

e. Use 'cor.test()' to compute a 95% confidence interval for the population correlation coefficient.  Hint: Use 'two.sided' in the function to get the usual two-sided confidence interval.
`.gray)

inf = stats.Inference.Correlation(vitd, {
  variables: ['age', 'vitd_serum'],
  confidence: 0.95,
  direction: 'two-tailed',
});
// print(inf);
for (let key in inf.descriptions) {
  print(inf.descriptions[key].yellow);
}
print(``);
print(`Looks like the results are very similar. The z-score is ${inf.zScore} which means a high confidence to reject the null hpyotheis, and the distribution of the test statistic should follow the t-distribution with df. CI is also provided by hte inference package. ${inf.df}.`.yellow);

print(`
f. For this problem, does your theory-based inference *agree* with the simulation-based inference?  Justify your answer.
`.gray);

print(``);
print(`Looks like the results are very similar. The z-score is ${inf.zScore} which means a high confidence to reject the null hpyotheis, and the distribution of the test statistic should follow the t-distribution with df. CI is also provided by hte inference package. ${inf.df}. The CI between the bootstrap and the inference package are quite different, not sure why.
`.yellow);
print();
print();
print();
print();


print(`
### Problem 2

Often before we conduct a study we want to determine how **large our sample** should be to achieve a certain level of precision in our confidence interval.  This determination is called a **sample size calculation**.  To determine the sample size, we want to bound our Margin of Error by B (ME $\leq$ B) and solve for $n$.

a. Derive the sample size formula for a confidence interval for $\mu$, the population mean. 

In your solution fill-in the following

$$n \geq \frac{fill-in}{fill-in}$$.
`.gray);

print(`In the case of a mean, the formula is:`.yellow);
print(`  ${"t* s/sqrt(n) <= ME ".bold.red}`);
print();
print(`Solving for n:`.yellow)
print(`  ${"n >= (s*t*/ME)^2".bold.red}`);
print();



print(`
b. Unfortunately, our sample size formula relies on statistics from the study. We can't compute those statistics since we do a sample size calculation BEFORE collecting data.  To remedy this issue, researchers will usually either:

* Estimate the unknowns from previous studies.  
* Conduct a pilot study on a small group of cases and use this to estimate unknowns.

Notice that your sample size formula in (a) has $t^*$ in it.  **Explain why it would be difficult to find this critical value.**

To solve this issue, typically researchers will insert $z^*$ for $t^*$.  Although that is also what we will do, discuss the danger in doing so. 
`.gray)

print(`I have already discussed this somewhere before (wrap up 11?)
`.yellow);


print(`
c.  Let's determine the sample size needed to estimate $\mu$ with 90% confidence when we approximate $t^*$ with $z^*$ and $s = 15$.  Find the needed sample size for a margin of error within 1 unit, 2 units, 5 units.  Comment on the relationship between the sample size and the desired margin of error.
`.gray)

sample_size_1 = stats.SampleSize.Mean(.90, 1, 15);
sample_size_2 = stats.SampleSize.Mean(.90, 2, 15);
sample_size_5 = stats.SampleSize.Mean(.90, 5, 15);

print(`The sample size needed for a margin of error within 1 unit is ${sample_size_1}`.yellow);
print(`The sample size needed for a margin of error within 2 units is ${sample_size_2}`.yellow);
print(`The sample size needed for a margin of error within 5 units is ${sample_size_5}`.yellow);

print(`
d. With a margin of error of at most 4 units, determine the sample size needed to estimate $\mu$ when we approximate $t^*$ with $z^*$ and $s = 15$ at a confidence level of 90%, 95%, and 99%. Comment on the relationship between the sample size and the confidence level. 
`.gray)

sample_size_90 = stats.SampleSize.Mean(.90, 4, 15);
sample_size_95 = stats.SampleSize.Mean(.95, 4, 15);
sample_size_99 = stats.SampleSize.Mean(.99, 4, 15);
print(`The sample size needed for a margin of error within 4 units at a confidence level of 90% is ${sample_size_90}`.yellow);
print(`The sample size needed for a margin of error within 4 units at a confidence level of 95% is ${sample_size_95}`.yellow);
print(`The sample size needed for a margin of error within 4 units at a confidence level of 99% is ${sample_size_99}`.yellow);
print();
print();
print();
print();


print(`
### Problem 3

The TV show Mythbusters wanted to determine if yawns really are contagious.  Therefore, they recruited 50 people at a local flea market to participate in a study.  For each subject, a researcher would take the subject to a small room with a hidden camera.  The researcher would either yawn (treatment group) or not yawn (control group) as they led the subject into the room.  Then as the subject sat in the room, the researchers observed whether or not they yawned.  Mythbusters concluded that yawns are contagious. Let's see what conclusions we want to draw from their data.

a. Using a **theory-based** approach, conduct a hypothesis test and summarize your results.  Make sure to include:

* A useful exploratory data visualization and a relevant conclusion from this visualization.
* The null and alternative hypotheses, the observed test statistic, and the $p$-value.
* Check the sample size assumption of the CLT.  (If not met, make note of this but still complete the test.)
* An interpretation of the $p$-value in the context of the problem.
* Conclusions about the research conjecture.
`.grey);

yawn = csv.parse(fs.readFileSync('sample_data/mythbusters.csv', 'utf8'), {
  columns: true,
  skip_empty_lines: true,
  delimiter: ','
}).map(row => {
  row.yawned = row.yawned === 'yes' ? 1 : 0;
  return row;
});
// print(yawn);

print(`JLX:`.yellow);
print(`Let's start with simple EDA in here lol`.yellow);

control = yawn.filter(row => row.group == 'control');
treatment = yawn.filter(row => row.group === 'treatment');

yawned = control.map(row => row.yawned);
plotHistogram(yawned, {
  title: 'Control Group',
  color: 'marine',
  binStart: 0,
  binEnd: 2,
  binWidth: 1,
  decimals: 0,
});

ratio = stats.ratio(yawned, 1);
print(`Size of control group: ${control.length}`.yellow);
print(`The ratio of people who yawned in the control group is ${ratio}`.yellow);
print();

yawned = treatment.map(row => row.yawned);
plotHistogram(yawned, {
  title: 'Treatment Group',
  color: 'marine',
  binStart: 0,
  binEnd: 2,
  binWidth: 1,
  decimals: 0,
});
ratio = stats.ratio(yawned, 1);
print(`Size of treatment group: ${treatment.length}`.yellow);
print(`The ratio of people who yawned in the treatment group is ${ratio}`.yellow);
print();

print(`EDA tells us that the effect size is small, i.e. the difference in ratios is not that large, but we will still conduct the hypothesis test.
`.red);

print(`Let's run the hypothesis test:`.yellow);

inf = stats.Inference.DifferenceInProportions(yawn, {
  variables: ['group', 'yawned'],
  success: ['treatment', 1],
  confidence: 0.95,
});
// print(inf);
for (let key in inf.descriptions) {
  print("  " + inf.descriptions[key].green);
}

print(`
From the above:
- The observed statistic is very small, which is not surprising given the small effect size.
- The p-value is very large, which means that we fail to reject the null hypothesis.
- The sample size assumption of the CLT is not met (less than 10 succeses for control group).
- The p-value tells us that the data is consistent with the null hypothesis, i.e. there is no evidence that yawns are contagious.
- MYTHBUSTERS JUST GOT BUSTED! 🤣
`.yellow);





