/*
https://adventofcode.com/2018/day/1
--- Day 1: Chronal Calibration ---
"We've detected some temporal anomalies," one of Santa's Elves at the Temporal Anomaly Research and Detection Instrument Station tells you. She sounded pretty worried when she called you down here. "At 500-year intervals into the past, someone has been changing Santa's history!"

"The good news is that the changes won't propagate to our time stream for another 25 days, and we have a device" - she attaches something to your wrist - "that will let you fix the changes with no such propagation delay. It's configured to send you 500 years further into the past every few days; that was the best we could do on such short notice."

"The bad news is that we are detecting roughly fifty anomalies throughout time; the device will indicate fixed anomalies with stars. The other bad news is that we only have one device and you're the best person for the job! Good lu--" She taps a button on the device and you suddenly feel like you're falling. To save Christmas, you need to get all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

After feeling like you've been falling for a few minutes, you look at the device's tiny screen. "Error: Device must be calibrated before first use. Frequency drift detected. Cannot maintain destination lock." Below the message, the device shows a sequence of changes in frequency (your puzzle input). A value like +6 means the current frequency increases by 6; a value like -3 means the current frequency decreases by 3.

For example, if the device displays frequency changes of +1, -2, +3, +1, then starting from a frequency of zero, the following changes would occur:

Current frequency  0, change of +1; resulting frequency  1.
Current frequency  1, change of -2; resulting frequency -1.
Current frequency -1, change of +3; resulting frequency  2.
Current frequency  2, change of +1; resulting frequency  3.
In this example, the resulting frequency is 3.

Here are other example situations:

+1, +1, +1 results in  3
+1, +1, -2 results in  0
-1, -2, -3 results in -6
Starting with a frequency of zero, what is the resulting frequency after all of the changes in frequency have been applied?

Your puzzle answer was 592.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
You notice that the device repeats the same frequency change list over and over. To calibrate the device, you need to find the first frequency it reaches twice.

For example, using the same list of changes above, the device would loop as follows:

Current frequency  0, change of +1; resulting frequency  1.
Current frequency  1, change of -2; resulting frequency -1.
Current frequency -1, change of +3; resulting frequency  2.
Current frequency  2, change of +1; resulting frequency  3.
(At this point, the device continues from the start of the list.)
Current frequency  3, change of +1; resulting frequency  4.
Current frequency  4, change of -2; resulting frequency  2, which has already been seen.
In this example, the first frequency reached twice is 2. Note that your device might need to repeat its list of frequency changes many times before a duplicate frequency is found, and that duplicates might be found while in the middle of processing the list.

Here are other examples:

+1, -1 first reaches 0 twice.
+3, +3, +4, -2, -4 first reaches 10 twice.
-6, +3, +8, +5, -6 first reaches 5 twice.
+7, +7, -2, -7, -4 first reaches 14 twice.
What is the first frequency your device reaches twice?

https://adventofcode.com/2018/day/1/input
*/

const day01input = [+10
,-9
,+12
,+5
,+13
,-6
,-19
,-4
,-17
,-1
,+7
,+18
,-13
,-15
,-6
,-11
,-12
,-9
,+12
,+2
,+14
,+11
,+17
,-10
,-21
,+6
,+18
,-4
,-16
,+15
,+8
,+13
,+12
,+4
,-1
,-19
,-7
,+14
,+8
,-3
,+5
,-9
,+16
,-11
,+21
,-3
,+23
,-8
,-16
,+11
,-3
,+1
,+16
,-3
,+14
,-9
,+17
,+5
,-3
,+17
,+12
,+19
,-12
,-14
,+13
,-3
,+6
,+15
,+18
,-8
,+14
,+14
,+3
,+18
,+4
,-9
,+12
,+6
,+8
,+18
,+12
,+13
,-6
,-13
,-13
,-17
,+14
,-3
,+2
,+12
,-6
,+16
,-9
,+6
,-1
,-4
,+17
,+9
,+6
,-3
,+9
,-15
,-11
,-17
,+7
,-9
,-18
,-21
,+2
,-11
,+12
,-21
,-8
,+14
,+5
,+17
,-4
,+8
,+4
,+9
,+7
,-5
,-7
,+6
,+19
,+20
,+22
,+8
,-11
,+17
,-1
,-1
,+14
,+11
,-9
,-18
,+19
,-10
,+5
,-17
,-19
,-4
,+3
,+7
,+5
,+5
,+21
,+17
,+17
,-12
,+13
,+15
,+18
,+17
,-4
,-7
,-15
,+1
,+5
,-16
,-9
,-11
,-5
,+7
,-10
,-15
,+3
,+11
,-6
,-9
,+10
,+17
,+15
,+7
,+13
,+15
,-6
,+10
,+7
,+12
,-4
,-12
,+3
,+7
,-15
,-13
,+16
,+1
,-9
,-18
,-10
,+6
,+9
,-11
,+7
,+10
,+11
,-10
,+18
,+4
,+5
,+19
,-1
,-16
,+18
,-4
,+5
,+11
,+10
,+17
,+4
,-1
,-13
,+2
,-10
,-17
,-12
,+16
,+16
,+12
,+14
,+12
,+18
,+12
,+2
,-13
,+15
,+16
,-6
,+10
,-13
,-15
,-12
,+6
,+19
,-6
,+9
,+3
,+19
,-3
,+5
,+3
,+6
,+23
,+4
,-18
,-17
,-15
,+1
,+4
,+13
,+11
,-13
,+6
,-18
,-13
,-7
,-13
,+5
,+1
,-19
,+11
,-9
,+5
,-1
,-11
,+8
,-11
,-1
,-14
,+11
,-13
,-15
,+16
,-18
,+7
,+16
,+18
,-13
,+7
,-8
,-12
,+16
,-2
,+9
,-14
,-10
,-17
,-8
,-16
,-19
,+5
,-1
,-2
,+4
,+7
,-19
,-20
,+19
,+17
,+12
,+17
,-14
,+19
,-17
,+7
,-2
,-6
,-19
,-8
,-7
,-2
,+21
,+19
,-12
,+18
,-15
,+33
,-4
,-1
,+2
,+5
,+12
,-1
,+4
,-9
,+23
,+1
,+16
,+1
,+13
,-16
,+9
,+4
,+12
,-1
,+9
,+22
,+1
,-5
,+12
,-14
,-22
,+9
,+28
,+2
,+3
,+10
,+22
,-10
,-2
,+23
,+7
,+14
,-18
,+7
,-9
,+10
,+9
,+11
,+6
,+12
,+11
,+13
,+9
,-4
,+9
,+7
,-19
,-5
,-6
,+5
,-13
,-11
,+13
,-8
,-2
,-9
,+3
,-15
,+20
,+8
,+10
,-14
,-13
,+2
,-11
,+5
,+7
,-13
,+15
,-21
,-16
,+19
,-21
,+10
,-33
,+7
,-28
,+12
,-19
,-25
,-14
,+11
,-32
,-23
,-10
,+17
,-32
,-16
,-18
,+8
,+2
,-74
,-17
,+7
,-8
,-8
,-12
,-12
,-16
,-19
,-2
,+20
,-4
,+19
,-21
,+18
,-10
,-17
,+10
,-20
,+15
,-19
,+13
,-7
,-17
,+4
,-18
,+9
,+17
,-23
,+21
,-27
,-11
,-18
,-23
,+6
,-17
,-9
,+8
,-19
,+10
,-8
,-8
,-7
,-7
,+12
,-18
,+5
,-3
,+12
,-17
,-2
,-13
,-3
,+8
,-2
,+14
,-21
,+16
,-19
,-14
,+1
,-2
,+11
,-3
,-21
,+8
,+2
,+9
,+24
,+18
,+14
,-19
,+12
,+17
,-9
,-6
,+10
,+13
,+13
,-24
,-5
,+27
,-20
,-15
,-6
,-21
,+4
,-19
,-1
,+31
,+17
,+14
,+8
,+11
,+7
,-20
,+7
,+17
,+4
,+7
,-5
,+11
,+26
,+8
,+19
,+19
,+34
,+15
,+8
,+3
,+4
,+10
,+6
,-28
,-13
,-7
,+3
,+19
,+18
,-13
,+9
,+61
,+33
,-39
,+26
,-53
,-5
,+2
,-8
,-30
,-9
,-4
,-16
,-15
,+32
,+15
,+28
,+20
,-88
,+5
,-14
,-16
,-51
,+26
,+5
,-7
,-7
,-22
,+2
,-14
,+8
,-15
,-20
,-40
,+22
,-27
,+2
,-18
,-38
,-23
,-10
,-8
,-3
,+8
,-27
,+17
,+33
,+16
,+77
,-35
,+52
,+339
,+3
,-275
,+81
,+169
,-299
,-668
,-79803
,-11
,+13
,-7
,+14
,+4
,-14
,-12
,-17
,-18
,-4
,+19
,+19
,+2
,-6
,-18
,+9
,+18
,-16
,+17
,-13
,-8
,+3
,+9
,+7
,+15
,-4
,+18
,+10
,+17
,-1
,-17
,-4
,+9
,-2
,-8
,-3
,+16
,-2
,-12
,-15
,-13
,-17
,-15
,-5
,-4
,+2
,-17
,-18
,+4
,+10
,-15
,+17
,-11
,-14
,-17
,-3
,-13
,-9
,-5
,-13
,+6
,-2
,-12
,-16
,-7
,+18
,-16
,+9
,+8
,-11
,-18
,+8
,-2
,+5
,-12
,+2
,+1
,-13
,-13
,-18
,-8
,-6
,-5
,-10
,+17
,-11
,-12
,-10
,-10
,-9
,+4
,+4
,+7
,+19
,+3
,-7
,+13
,-5
,-11
,-13
,-12
,-17
,-6
,+5
,-12
,+14
,+13
,-19
,+15
,+6
,-4
,-19
,-3
,-7
,-4
,-5
,+14
,-7
,-19
,+18
,+2
,-15
,+19
,-18
,-3
,-12
,+5
,-2
,-4
,-14
,+12
,-1
,-14
,+6
,+10
,-12
,-13
,-15
,+10
,-12
,-3
,+4
,+14
,+13
,+18
,-11
,+4
,-3
,-17
,+14
,-20
,+10
,+11
,+4
,-1
,+13
,-5
,+17
,+4
,-3
,-15
,+21
,+19
,-6
,-18
,-13
,-20
,-7
,-15
,-4
,+6
,-7
,-17
,+4
,-18
,-11
,-5
,+19
,+9
,+7
,-15
,+3
,+2
,+8
,-4
,+12
,-9
,-17
,-18
,+10
,+2
,-15
,+4
,+1
,-15
,-16
,+15
,+5
,-18
,+4
,-16
,+3
,-15
,-18
,-17
,-16
,-2
,+11
,-3
,+9
,+7
,+4
,-16
,+4
,-1
,-18
,-21
,-2
,-4
,+1
,+4
,-19
,-12
,-6
,+2
,+1
,-5
,-4
,-7
,-6
,-19
,+6
,-11
,+2
,+4
,+1
,+16
,-4
,-15
,+12
,+10
,+24
,+13
,+14
,-8
,-7
,+21
,-12
,+15
,+17
,-13
,+19
,-5
,-4
,+14
,+10
,-18
,+9
,+22
,-19
,+9
,+8
,+7
,+19
,+13
,+9
,-5
,-6
,-4
,-3
,-1
,+5
,+10
,+6
,+7
,+7
,+8
,-18
,+12
,+4
,+18
,+1
,+9
,-8
,+18
,-14
,+9
,-2
,-2
,+15
,+12
,-11
,+19
,+8
,+3
,-7
,+3
,-13
,-15
,-18
,-16
,-20
,-17
,+14
,-4
,+15
,-14
,+15
,+13
,+10
,-11
,-7
,-27
,-5
,-13
,-10
,-15
,-12
,-18
,+17
,+18
,+5
,-2
,+6
,-13
,-8
,+20
,-17
,+16
,-3
,+2
,+11
,-24
,+9
,+9
,+3
,-1
,-1
,+16
,-12
,+16
,+18
,-9
,+6
,+14
,+18
,-4
,-21
,+16
,+45
,+13
,-17
,+11
,+10
,+7
,+33
,+7
,+13
,-12
,-11
,+18
,+1
,+18
,+18
,+4
,-7
,+15
,-6
,+11
,-18
,+16
,-5
,+12
,-4
,-2
,+20
,+6
,-2
,-15
,-14
,+81142
];

function sum(input) {
  var result = 0;
  for (var i = 0; i < input.length; i++) {
    result += input[i];
  }
  return result;
}

console.assert(sum(day01input) === 592);
