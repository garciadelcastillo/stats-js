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
// ██████╗ ███████╗███████╗████████╗ █████╗ 
// ██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗
// ██████╔╝███████╗█████╗     ██║   ╚█████╔╝
// ██╔═══╝ ╚════██║██╔══╝     ██║   ██╔══██╗
// ██║     ███████║███████╗   ██║   ╚█████╔╝
// ╚═╝     ╚══════╝╚══════╝   ╚═╝    ╚════╝ 
//                                                                                                               

// Some calculations for the PSet8
`);


print(`

### Problem 1

After graduating, you decide to apply for positions as a statistical consultant. A friend who graduated a few years prior and already works in the field has sent you the following set of scenarios. If she is impressed by your responses, she will recommend your name to the hiring team. For each response, be sure to fully explain your reasoning.

a.  A pharmaceutical company is planning to run an initial trial on a potential new cholesterol lowering drug compound to assess whether they should continue to invest money on its development. They would like your recommendation as to whether the initial trial should be run at the $\alpha = 0.05$ or $\alpha = 0.10$ significance level. Limit your answer to no more than five sentences.

  \textcolor{Coral}{JL: two arguments can be done here. 1. Because it is a health drug, 0.05 should be used to be more sure. However, because the question is just about an initial trial (experimental), perhaps a 0.10 is acceptable as an initial exploration, so long as it is followed by a proper study with a much lower $\alpha$.}


Melatonin pills are a popular remedy for providing insomnia relief. A company developed a new formulation of melatonin pill and conducted a randomized controlled trial on a random sample of 2,000 American adults who were already experiencing insomnia and using melatonin pills. A 95% confidence interval for mean increase in sleep hours per typical night was calculated based on data from the trial: (0.09, 0.13) hours. A hypothesis test for the null hypothesis of no effect resulted in $p$-value 0.0001.

b.  Assess whether the evidence suggests the new formulation is a substantial improvement over melatonin pills currently available on the market. Limit your response to no more than five sentences.

      \textcolor{Coral}{JL: while $p$-value is very low, it can be argued that the effect size is also super low (95\% confidence of a mean increase of about $0.11h \approx 6 mins$), so no substantial improvement.}

c.  The company would like to announce in a press release that based on these data there is only a 0.01% chance that their new melatonin pill is not actually effective, or in other words, that there is a 99.99% chance that their new formulation on average improves the amount of sleep in American adults with insomnia. Explain why this statement is misleading.

      \textcolor{Coral}{JL: it's misleading because it may increase sleep marginally.}


d.  Suppose that a researcher in environmental science is working on an analysis using data collected at 200 locations across the United States during January of 2024 and January of 2014. The researcher proposes the following approach: for each location, conduct a two-sided hypothesis test at the $\alpha = 0.05$ significance level to compare the mean temperature in January 2024 to the mean temperature in January 2014. He plans to conclude there is evidence of temperature warming for the locations at which mean temperature in January 2024 is significantly higher than mean temperature in January 2014, and specifically present only those significant results to his principal investigator.

    Identify at least one aspect of this analysis plan that is problematic; explain your reasoning as to why there is an issue.
    
      \textcolor{Coral}{JL: you cannot present partial results or infer global warming from isolated locations.}


### Problem 2

Let's consider the game of roulette. When an American roulette wheel is spun, a ball eventually comes to rest in one of its 38 numbered and equally sized slots. The slots have colors: 18 red, 18 black, and 2 green. The slots are numbered 00, 0, 1, 2, ... 36. We will assume you can only bet on 1, 2, ... 36 (not 00 or 0).

The simplest version of the game is that you can bet on either a number or a color:

-   If you bet \$1 on a **color** (red or black) and the ball lands in a slot of that color, then you get \$2 back for a net profit of \$1. Otherwise, your net profit is -\$1.\
-   If you bet \$1 on a **number** (1-36) and the ball lands in that number's slot, then you get \$36 back for a net profit of \$35. Otherwise, your net profit is -\$1.

a.  Let $X$ = net profit in roulette when you bet \$1 on red. Give the probability distribution for $X$. Hint: Remember that there are 38 slots the ball can land on.


| x    |   \$1   |  -\$1   |
|------|---------|---------|
| p(x) | $\frac{18}{38}$ | $1-\frac{18}{38}$ |


b.  Determine the mean and standard deviation for the random variable $X$ as defined in part (a). (Feel free to use R as a calculator.) Interpret what the mean is telling us about our expected profits in a game of roulette when betting on color.
`);


let X = [
    [1, 18/38],
    [-1, 1-18/38]
];
let mean = stats.meanDistribution(X);
let sd = stats.standardDeviationDistribution(X);
print(`The mean is ${mean} and the standard deviation is ${sd}. The mean tells us that we can expect to ${(mean > 0 ? "WIN" : "LOSE")} about ${Math.abs(100*mean).toFixed(1)} cents per game of roulette when betting on color.`);

print(`
c.  Let $Y$ = net profit in roulette when you bet \$1 on 9. Give the probability distribution for $Y$.


| y    | \$35 | -\$1 |
|------|---------|---------|
| p(y) | $\frac{1}{38}$| $1-\frac{1}{38}$ |



d.  Determine the mean and standard deviation for the random variable $Y$ as defined in (c). (Feel free to use R as a calculator.) Interpret what the mean is telling us about our expected profits in a game of roulette when betting on a specific number.
`)


let Y = [
    [35, 1/38],
    [-1, 1-1/38]
];
mean = stats.meanDistribution(Y);
sd = stats.standardDeviationDistribution(Y);
print(`The mean is ${mean} and the standard deviation is ${sd}. The mean tells us that we can expect to ${(mean > 0 ? "WIN" : "LOSE")} about ${Math.abs(100*mean).toFixed(1)} cents per game of roulette when betting on a specific number.`);
print();
print();
print();
print();

    

print(`
### Problem 3

A national survey conducted by the Pew Research Center in 2023 produced the following estimates about highest level of educational attainment and LinkedIn use among US adults:

 - 37\% have a high school diploma or less; 10\% of these adults have used LinkedIn
 
 - 15\% have completed some college; 28\% of these adults have used LinkedIn
 
 - 48\% have a college degree or higher; 53\% of these adults have used LinkedIn

a.  Suppose we have a random sample of 1000 US adults. Based on the information above, distribute these adults into the following table:


| Table               | LinkedIn User | Non-LinkedIn User | Total   |
|---------------------|---------------|-------------------|---------|
| High school or less | 37            | 333               | 370     |
| Some college        | 42            | 108               | 150     |
| College or more     | 254           | 226               | 480     |
| Total               | 333           | 667               | 1000    |


b.  What percentage of US adults who use LinkedIn have a high school diploma or less?

`);

let stat = 37 / 333;
print(`The percentage of US adults who use LinkedIn and STRICTLY have a high school diploma or less is ${100*stat.toFixed(2)}%. 
However, if we assume that everyone who went to college also has high school, then that percentage is 100%`);


print(`
c.  What percentage of US adults who use LinkedIn have some college education?

`);

stat = 42 / 333;
print(`The percentage of US adults who use LinkedIn and STRICTLY have some college education is ${100*stat.toFixed(2)}%.`);

stat = (254 + 42) / 333;
print(`However, if we assume that everyone who went to college also has some college, then that percentage is ${100*stat.toFixed(2)}%.`)


print(`
d.  What percentage of US adults who use LinkedIn have a college degree?

`);

stat = 254 / 333;
print(`The percentage of US adults who use LinkedIn and STRICTLY have a college degree is ${100*stat.toFixed(2)}%.`);


print(`
e. Among LinkedIn users, which educational groups are underrepresented relative to the overall population? In other words, when we condition on being a LinkedIn user, which educational groups are less likely than they were when we didn't condition on anything? Reference specific numerical values to justify your answer.

`);

print(`The high school or less group is underrepresented relative to the overall population.`);

print(`


### Problem 4

A common mistake with conditional probabilities is to equate P($A$ given $B$) with P($B$ given $A$); in lecture, we discussed an example involving two events (being twins, being polar bears) and used this example to develop intuition for the definition of conditional probability.

In this problem, you will come up with your **own** example.

a. Describe an example where P($A$ given $B$) does not equal P($B$ given $A$). Be sure to clearly define what $A$ and $B$ represent.




b.  For your example in part (a), which probability do you think is more likely? Justify your answer.




c. With the same events defined in part (a), explain why P($A$ given $B$) is not equal to P($A$ and $B$), using language accessible to someone who has not taken a statistics course. (*Hint*: Try framing the explanation in terms of a hypothetical population of 100 individuals.)





### Problem 5

For this problem, we want you to practice using 'R' functions that you **haven't** already been exposed to as part of Stat 100. In other words, we want you to practice developing your independence as a coder. We recommend trying to use the internet as a resource (as it will still be there for you after Stat 100). But, if you get stuck, feel free to use Slack or Office Hours for help.

**For Problem 5 (only), you are allowed (but also not required) to use generative AI (GAI) models like ChatGPT. If you use generative AI models, please include any prompt(s) used and describe the assistance that GAI provided.**

For this problem, let's return to 'camTrees' and focus on different Maples owned by Harvard and MIT.

'''{r}
# library(bosTrees)
# maples <- camTrees %>%
#   filter(Ownership %in% c("Harvard", "MIT"),
#          CommonName %in% c("Japanese Maple", "Norway Maple",
#                            "Red Maple", "Sugar Maple",
#                            "Silver Maple"))
'''

a.  Re-create the following 'ggplot' that contains both a histogram of 'Diameter' and a density curve (i.e., smoothed version of the histogram).

'''{r, echo = FALSE}
# #| out-width: "90%"
# 
# knitr::include_graphics("images/pset8_pr5.png")
'''

Notes:

-   You don't need to use the same colors that we did but you should color both the histogram and the density curve.
-   'mapping = aes(y = after_stat(density))' could prove useful somewhere in your code to ensure the histogram and density curve are using the same scale for the 'y' axis.
-   [Check out the other potential 'theme_XXX()'s](https://ggplot2.tidyverse.org/reference/ggtheme.html) beyond the default gray theme.

'''{r}



'''

b.  For a quantitative variable, the coefficient of variation, given by $\sigma/\mu$, provides a standardized measure of variability. We can estimate it with $s/\bar{x}$. Use the 'dplyr' functions (not 'infer' functions) 'sample_n()' and 'summarize()' to

-   Create a new dataset that contains the trees in 'maples' with a recorded 'Diameter'.
-   Take a **single** bootstrap sample of the remaining trees.
-   Compute the coefficient of variation of 'Diameter' on your bootstrapped sample.

'''{r}



'''

c.  Back in [Week 2](https://mcconvil.github.io/stat100s24/stat100_wk02wed.html#/segmented-barplots-1) when we learned about segmented bar graphs, we saw that there are advantages to plotting raw counts and advantages to plotting proportions. [Mosaic graphs](https://cran.r-project.org/web/packages/ggmosaic/vignettes/ggmosaic.html) try to give you the best of both worlds in a single graph!

Using the R package, 'ggmosaic', create a mosaic plot which

-   showcases the relationship between 'Ownership' and 'CommonName'.
-   provides a sense of how the sample sizes in each category vary.

Explain how your graph is trying to capture the best of both worlds and what conclusions can be drawn from the graph.

'''{r}
# Make sure to first install ggmosaic!



'''

`);


let good_article_url = `https://www.scientificamerican.com/article/the-significant-problem-of-p-values/`;
let good_article = `The Significant Problem of P-Values`;

print(`
### Problem 6

The pitfalls of $p$-values have been discussed for decades and in 2016 the *ASA Statement on p-Values and Statistical Significance* was developed primarily to discuss what not to do with $p$-values.

a.  To better understand the debate around the use of $p$-values, read the article "The Significant Problem of *P* Values" (written by Lydia Denworth) in the file 'scientific_american_p_values.pdf', posted [on Canvas](https://canvas.harvard.edu/courses/126492/modules/items/1637155).

b.  Describe one reason why it is not advisable to label all results with $p < 0.05$ as "significant" and all results with $p \geq 0.05$ as not significant.





c.  Take a look at the section "Statistical Significance" on pages 5-7, which is intended to explain some concepts underpinning statistical significance in language accessible to those who have not taken a statistics course. Describe something you thought was explained/illustrated particularly well in this section.





d. Try doing some $p$-hacking of your own with ["Hack Your Way To Scientific Glory"](https://projects.fivethirtyeight.com/p-hacking/) to reach a "publishable" result. How did you get to the statistically "significant" result?






e.  One proposed reform involves requiring study authors to publicly pre-register their statistical analysis plans prior to any data collection and to report when they deviate from them. Explain why this approach can help guard against $p$-hacking.
`)