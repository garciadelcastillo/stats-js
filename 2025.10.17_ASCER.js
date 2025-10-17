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
const { row } = require('jStat');
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
//  █████╗ ███████╗ ██████╗███████╗██████╗ 
// ██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗
// ███████║███████╗██║     █████╗  ██████╔╝
// ██╔══██║╚════██║██║     ██╔══╝  ██╔══██╗
// ██║  ██║███████║╚██████╗███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝╚═╝  ╚═╝
//                                                                                                                    

// Trying to replicate some results I have been computing for the 
// ASCER Ceramic Tile Perception study. 
`);


let tile_dataset = csv.parse(fs.readFileSync('sample_data/tile_image_dataset_processed_02_experts+consumers.csv', 'utf8'), {
    columns: true,
    skip_empty_lines: true,
    delimiter: ','
});

// Get the first 700 values for experts only
let tile_dataset_experts = tile_dataset.slice(0, 700);

print(`Found ${tile_dataset_experts.length} rows in the tile dataset.`);

let exp_means = [];
let exp_sds = [];
for (let i = 0; i < 4; i++) {
    exp_means[i] = tile_dataset_experts.map(row => parseFloat(row[`exp_q${i+1}_mean`]));
    exp_sds[i] = tile_dataset_experts.map(row => parseFloat(row[`exp_q${i+1}_sd`]));
    print(`For the MEAN of expert ratings of question ${i}, we have:`)
    print(`  Mean: ${stats.mean(exp_means[i]).toFixed(4)}`);
    print(`  Standard Deviation of Means: ${stats.standardDeviation(exp_means[i]).toFixed(4)}`);
    print(`For the SD of expert ratings of question ${i}, we have:`)
    print(`  Mean: ${stats.mean(exp_sds[i]).toFixed(4)}`);
    print(`  Standard Deviation of SDs: ${stats.standardDeviation(exp_sds[i]).toFixed(4)}`);
    print();
}




/**
    I want now to replicate this Python code in JS


def mean_sd_stats(x, y, drop_na=True):
    """
    Given arrays x (means) and y (SDs):
      - returns Pearson r, two-sided p-value,
        95% CI for r (Fisher z),
        and slope/intercept from a simple linear regression y = a*x + b.
      - If drop_na is True, removes any (x, y) pairs where either is missing (NaN).
    """
    x = np.asarray(x)
    y = np.asarray(y)

    if drop_na:
        mask = ~(
            np.isnan(x) | np.isnan(y)
        )
        x = x[mask]
        y = y[mask]

    # Pearson correlation and p-value
    r, p = pearsonr(x, y)

    # 95% CI for r using Fisher z-transform
    n = len(x)
    z = np.arctanh(r)                 # Fisher z
    se = 1 / np.sqrt(n - 3)           # standard error of z
    z_lo, z_hi = z - 1.96*se, z + 1.96*se
    r_lo, r_hi = np.tanh([z_lo, z_hi])

    # Simple linear regression (least squares): y = a*x + b
    a, b = np.polyfit(x, y, 1)

    return r, p, (r_lo, r_hi), a, b

    rows = []
    for i in range(1, 5):
        x = df[f"exp_q{i}_mean"].values
        y = df[f"exp_q{i}_sd"].values
        r, p, (r_lo, r_hi), a, b = mean_sd_stats(x, y)
        rows.append({
            "Question": f"Q{i}",
            "r": r,
            "95% CI (r)": f"[{r_lo:.3f}, {r_hi:.3f}]",
            "p-value": p,
            "slope (ΔSD/Δmean)": a,
            "intercept": b
        })

    results = pd.DataFrame(rows)


The log looks like this: 



  Question         r      95% CI (r)       p-value  slope (ΔSD/Δmean)  \
0       Q1  0.592101  [0.542, 0.638]  1.891604e-67           0.232716   
1       Q2  0.488019  [0.429, 0.543]  3.625225e-43           0.184491   
2       Q3  0.101385  [0.027, 0.174]  7.263354e-03           0.033173   
3       Q4  0.542956  [0.489, 0.593]  6.374471e-55           0.268024   

   intercept  
0   0.422988  
1   0.624410  
2   0.908485  
3   0.394391  


 */

// Calculate the mean-sd correlation and regression for each question
print(`Calculating mean-SD correlations and regressions for each question:`);

const DECIMALS = 3;

for (let i = 0; i < 4; i++) {

    let x = exp_means[i];
    let y = exp_sds[i];
    let n = x.length;
    let r = stats.correlation(x, y);

    // Calculate 95% CI for r using Fisher z-transform
    // let z = 0.5 * Math.log((1 + r) / (1 - r)); // Fisher z
    let z = Math.atanh(r); // alternative way
    let se = 1 / Math.sqrt(n - 3); // standard error of z
    let z_lo = z - 1.96 * se;
    let z_hi = z + 1.96 * se;
    let r_lo = Math.tanh(z_lo);
    let r_hi = Math.tanh(z_hi);
    
    // Let's manually bootstrap the samples, 
    // choosing n samples with replacement, 
    // keeping the x y pairs. 
    let bootstrap_samples = 1000;
    let r_bootstrap = [];
    for (let b = 0; b < bootstrap_samples; b++) {
        let x_sample = [];
        let y_sample = [];
        for (let j = 0; j < n; j++) {
            let idx = Math.floor(stats.random() * n);
            x_sample.push(x[idx]);
            y_sample.push(y[idx]);
        }
        let r_b = stats.correlation(x_sample, y_sample);
        r_bootstrap.push(r_b);
    }
    let ci = stats.confidenceInterval(r_bootstrap, 0.95);

    // P-value calculation (two-sided)
    // JLX: looks more involved than I thought, not a simple bootstrap,
    // need to use the beta distribution... See: 
    // https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.pearsonr.html
    // https://github.com/scipy/scipy/blob/v1.11.4/scipy/stats/_stats_py.py
    

    print(`For question ${i+1}:`);
    print(`  Pearson r: ${r.toFixed(DECIMALS)}`);
    print(`  95% CI for r (Fisher): [${r_lo.toFixed(DECIMALS)}, ${r_hi.toFixed(DECIMALS)}]`);
    print(`  95% CI for r (Bootstrap): [${ci.lower.toFixed(DECIMALS)}, ${ci.upper.toFixed(DECIMALS)}]`);
    // print(`  95% CI for r: [${ci.lower.toFixed(6)}, ${ci.upper.toFixed(6)}]`);
}




