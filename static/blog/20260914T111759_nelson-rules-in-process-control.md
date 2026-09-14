# Nelson Rules for Statistical Process Control

## Why control charts need more than one rule

Statistical Process Control (SPC) helps teams decide whether a process is behaving normally or whether something unusual needs attention. A control chart usually shows a centre line, an upper control limit, and a lower control limit.

The limits are commonly set at three standard deviations from the process average. If the process is stable and approximately normal, only about 0.27% of individual points should fall outside those limits by chance.

That simple test is useful for large problems, but it can miss smaller changes. A process can slowly drift, stay above its average, or begin to alternate between two states without producing a point outside the limits. The Nelson rules add pattern checks for these situations.

Lloyd Nelson published the eight rules in 1984. They are best understood as signals for investigation, not as automatic proof that a process is broken.

## The eight rules in plain language

The chart is divided into zones one, two, and three standard deviations from the centre line. The rules look for unusual patterns in those zones.

| Rule | Signal | What it may mean |
| :---- | :---- | :---- |
| **1** | One point is beyond 3 standard deviations. | A major event, equipment failure, measurement error, or data-entry problem. |
| **2** | Nine points in a row are on the same side of the centre line. | A sustained shift, such as a new material lot or machine setting. |
| **3** | Six points in a row keep increasing or keep decreasing. | Gradual wear, drift, overheating, or sensor ageing. |
| **4** | Fourteen points in a row alternate up and down. | Over-adjustment, alternating sources, or another oscillating process. |
| **5** | Two of three points are beyond 2 standard deviations on the same side. | An early warning of a moderate shift. |
| **6** | Four of five points are beyond 1 standard deviation on the same side. | An early warning of a smaller, persistent shift. |
| **7** | Fifteen points in a row stay within 1 standard deviation of the centre line. | Less variation than expected, rounding, subgrouping, or an improved process. |
| **8** | Eight points in a row are outside the central 1-standard-deviation zone, with points on both sides. | A mixture of two populations or two operating states. |

Rules 1 to 6 mainly look for shifts and trends. Rules 7 and 8 look for changes in spread or for data that may come from more than one population.

## What the rules are trying to catch

### A single unusual point

Rule 1 is the traditional Shewhart signal. A point beyond the 3-sigma limits is unlikely under a stable process. Check the measurement first, then look for a physical cause such as a broken tool, a power problem, or a batch error.

### A shift or trend

Rules 2, 5, and 6 look for points that spend too much time on one side of the average. They can identify a process shift before it becomes large enough to cross the control limit.

Rule 3 looks for a steady rise or fall. Typical causes include tool wear, a falling chemical concentration, a temperature change, or sensor drift.

### Alternation and unusual variation

Rule 4 detects repeated up-and-down movement. This can happen when an operator responds to every small fluctuation and creates a larger one, a behaviour often called tampering. It can also happen when samples alternate between two machines or feed lines.

Rule 7 detects an unusual lack of variation. Possible explanations include rounding, data filtering, incorrect subgrouping, or a genuine process improvement that makes the old limits obsolete.

Rule 8 detects points that avoid the central band. This can indicate a mixture, for example when samples come alternately from two unblended tanks or two production lines.

## False alarms and alert fatigue

Every rule can produce a false alarm. The rules are designed to find unusual patterns, so they should not all be enabled automatically for every process.

The more rules that run at the same time, the more often a stable process will produce a signal. The average number of points before a false signal is called the in-control average run length, or ARL0. For Rule 1 alone, the theoretical ARL0 is about 370 points. A set of rules has a shorter ARL0 because it has more ways to signal.

This creates an operational risk. If operators see constant nuisance alerts, they may stop investigating them. They may also adjust a stable process in response to ordinary variation, increasing the variation they were trying to remove.

For that reason, a rule set should reflect the cost of missing a real problem and the cost of investigating a false one.

## Check the data before using the rules

The usual probabilities behind the Nelson rules assume that observations are approximately normal and independent.

- **Check the distribution.** Strong skew or heavy tails can make outer-zone signals more common than expected. Consider a suitable transformation or use subgroup averages.
- **Check for autocorrelation.** Nearby observations in a continuous process may be related. This can create false trend and run signals. Model the process or apply the rules to appropriately prepared residuals.
- **Choose the chart type carefully.** The rules work most naturally with individual-value charts and average-value charts.

Moving-range charts have their own dependence because adjacent ranges share a measurement. In practice, use Rules 1 to 4 cautiously on moving-range charts and avoid applying Rules 5 to 8 without a clear statistical justification. Attribute charts, such as p, np, c, and u charts, also need distribution-specific decisions rather than a direct copy of the rules for normal data.

## Phase I and Phase II use

SPC is often used in two phases:

- **Phase I establishes the baseline.** Use historical data to understand the process, estimate the average and variation, and investigate unusual patterns. The full set of rules can be useful as a diagnostic tool, provided the results are reviewed by someone who understands the process.
- **Phase II monitors routine work.** Use a smaller, risk-based rule set so that operators see signals they can act on.

A practical starting point is:

| Process | Suggested rules |
| :---- | :---- |
| Standard, low-risk process | Rule 1 |
| Critical quality characteristic | Rules 1, 2, and 5 |
| Process where wear is expected | Rules 1 and 3 |
| Investigation of a new baseline | Consider all eight rules temporarily |

These are starting points, not universal requirements. The final choice should reflect the process, the sampling method, and the consequences of a missed signal.

## How to respond to a signal

Treat a rule violation as a prompt to ask questions:

1. Confirm that the measurement and chart limits are correct.
2. Identify which rule fired and when the pattern began.
3. Check equipment, materials, operators, settings, and environmental records.
4. Look at the raw observations rather than only the charted summary.
5. Record the cause and the action taken.

Different signals suggest different checks:

| Signal | First checks |
| :---- | :---- |
| Rule 1 | Measurement system, equipment failure, batch records, and data entry. |
| Rules 2, 5, or 6 | Material lots, machine offsets, shifts, and environmental changes. |
| Rule 3 | Tool wear, temperature, chemical concentration, and sensor calibration. |
| Rule 4 | Manual adjustments, alternating sources, and autocorrelation. |
| Rules 7 or 8 | Sampling design, subgrouping, rounding, histograms, and separate process streams. |

The chart can show when a pattern became visible. It cannot, by itself, identify the physical cause.

## A practical example

Imagine a biopharmaceutical plant monitoring fill volume, pH, dissolution, and assay results across several filling lines. The plant initially enabled all eight rules on every chart. It generated many alerts, and staff began dismissing most of them. Genuine signals then took longer to investigate.

The engineering team reviewed the historical data and found that some fill-volume charts alternated because samples came from two filling heads. They changed the sampling plan and monitored each head separately. For routine monitoring, they used Rule 1 for less critical measures, Rules 1, 2, and 5 for critical quality attributes, and Rules 1 and 3 for equipment where wear was expected. Rules 7 and 8 remained available for periodic diagnostic reviews instead of the daily dashboard.

The lesson is not that one rule set is always correct. It is that a useful SPC system must balance sensitivity with trust. A signal is valuable only when people believe it is worth investigating.

## Conclusion

The Nelson rules help control charts detect more than single extreme points. They can reveal shifts, trends, alternating behaviour, unexpectedly low variation, and mixtures of different process states.

They work best when used selectively. Check the data assumptions, choose rules that match the process, and treat each signal as the start of an investigation. A short list of trusted alerts is usually more useful than a complete list that nobody believes.

## References

- [The Nelson Rules: Tests for Special Causes in SPC Charts](https://www.superengineer.net/blog/spc-nelson-rules-tests), Superengineer
- [Lloyd Nelson: The Man Who Developed the Special Cause Variation](https://blog.simana.com/lloyd-nelson), Simana
- [Nelson Rules](https://en.wikipedia.org/wiki/Nelson_rules), Wikipedia
- [Nelson Rules for Shewhart Charts](https://metricgate.com/docs/nelson-rules-qcc/), MetricGate
- [Western Electric and Nelson Rules in Pharma SPC Charts](https://ifactoryapp.com/blog/western-electric-nelson-rules-pharma), iFactory
- [Zone Rules Analysis Calculator](https://metricgate.com/docs/zone-rules-analysis/), MetricGate
- [Decision Rules in SPC: Western Electric Rules and Zones](https://sixsigmadsi.com/glossary/decision-rules/), Six Sigma Development Solutions
- [Nelson Rules](https://www.leansixsigmadefinition.com/glossary/nelson-rules/), Lean Six Sigma Definition
- [Package `shewhartr` Reference Manual](https://cran.r-universe.dev/shewhartr/doc/manual.html), CRAN
- [Using the Nelson Rules for Control Charts in Minitab](https://blog.minitab.com/en/blog/statistics-in-the-field/using-the-nelson-rules-for-control-charts-in-minitab), Minitab
