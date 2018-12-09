/*
--- Day 7: The Sum of Its Parts ---
You find yourself standing on a snow-covered coastline; apparently, you landed a little off course. The region is too hilly to see the North Pole from here, but you do spot some Elves that seem to be trying to unpack something that washed ashore. It's quite cold out, so you decide to risk creating a paradox by asking them for directions.

"Oh, are you the search party?" Somehow, you can understand whatever Elves from the year 1018 speak; you assume it's Ancient Nordic Elvish. Could the device on your wrist also be a translator? "Those clothes don't look very warm; take this." They hand you a heavy coat.

"We do need to find our way back to the North Pole, but we have higher priorities at the moment. You see, believe it or not, this box contains something that will solve all of Santa's transportation problems - at least, that's what it looks like from the pictures in the instructions." It doesn't seem like they can read whatever language it's in, but you can: "Sleigh kit. Some assembly required."

"'Sleigh'? What a wonderful name! You must help us assemble this 'sleigh' at once!" They start excitedly pulling more parts out of the box.

The instructions specify a series of steps and requirements about which steps must be finished before others can begin (your puzzle input). Each step is designated by a single letter. For example, suppose you have the following instructions:

Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.
Visually, these requirements look like this:


  -->A--->B--
 /    \      \
C      -->D----->E
 \           /
  ---->F-----
Your first goal is to determine the order in which the steps should be completed. If more than one step is ready, choose the step which is first alphabetically. In this example, the steps would be completed as follows:

Only C is available, and so it is done first.
Next, both A and F are available. A is first alphabetically, so it is done next.
Then, even though F was available earlier, steps B and D are now also available, and B is the first alphabetically of the three.
After that, only D and F are available. E is not available because only some of its prerequisites are complete. Therefore, D is completed next.
F is the only choice, so it is done next.
Finally, E is completed.
So, in this example, the correct order is CABDFE.

In what order should the steps in your instructions be completed?


*/
var testInput = [
"Step C must be finished before step A can begin.",
"Step C must be finished before step F can begin.",
"Step A must be finished before step B can begin.",
"Step A must be finished before step D can begin.",
"Step B must be finished before step E can begin.",
"Step D must be finished before step E can begin.",
"Step F must be finished before step E can begin.",
];
function parseInput(s) {
  var [_, before, after] = s.match(/Step (\w+) must be finished before step (\w+) can begin./);
  return [before, after];
};
console.assert(parseInput(testInput[0]).join() == "C,A");

var stepDependencies = new Map();
var dependencySteps = new Map();
function reset() {
  stepDependencies.clear();
  dependencySteps.clear();
}
function load(before, after) {
  if (!stepDependencies.has(before)) {
    stepDependencies.set(before, new Set());
  }
  if (stepDependencies.has(after)) {
    stepDependencies.get(after).add(before);
  } else {
    stepDependencies.set(after, new Set([before]));
  }
  if (dependencySteps.has(before)) {
    dependencySteps.get(before).add(after);
  } else {
    dependencySteps.set(before, new Set([after]));
  }
};
function dump() {
  result = "";
  for (let [step, dependencies] of stepDependencies.entries()) {
    result += step + " depends on " + Array.from(dependencies.values()).join() + "\n";
  }
  for (let [dependency, steps] of dependencySteps.entries()) {
    result += dependency + " precedes " + Array.from(steps.values()).join() + "\n";
  }
  return result;
};
function nextStep() {
  var sortedSteps = Array.from(stepDependencies.keys()).sort();
  for (let step of sortedSteps) {
    if (stepDependencies.get(step).size == 0) {
      return step;
    }
  }
  return false;
};
function completeStep(step) {
  if (dependencySteps.has(step)) {
    for (let dependentStep of dependencySteps.get(step)) {
      stepDependencies.get(dependentStep).delete(step);
    }
    dependencySteps.delete(step);
  }
  stepDependencies.delete(step);
};
function processInput(input) {
  reset();
  result = "";
  for (let s of input) {
    let [before, after] = parseInput(s);
    load(before, after);
  }
  var step;
  while (step = nextStep()) {
    result += step;
    completeStep(step);
  }
  return result;
}
console.assert(processInput(testInput) == "CABDFE");

var input = [
"Step Y must be finished before step J can begin.",
"Step C must be finished before step L can begin.",
"Step L must be finished before step X can begin.",
"Step H must be finished before step R can begin.",
"Step R must be finished before step X can begin.",
"Step I must be finished before step B can begin.",
"Step N must be finished before step Q can begin.",
"Step F must be finished before step X can begin.",
"Step K must be finished before step G can begin.",
"Step G must be finished before step P can begin.",
"Step A must be finished before step S can begin.",
"Step O must be finished before step D can begin.",
"Step M must be finished before step W can begin.",
"Step Q must be finished before step J can begin.",
"Step X must be finished before step E can begin.",
"Step U must be finished before step V can begin.",
"Step Z must be finished before step D can begin.",
"Step P must be finished before step W can begin.",
"Step S must be finished before step J can begin.",
"Step J must be finished before step T can begin.",
"Step W must be finished before step T can begin.",
"Step V must be finished before step B can begin.",
"Step B must be finished before step T can begin.",
"Step D must be finished before step T can begin.",
"Step E must be finished before step T can begin.",
"Step I must be finished before step Z can begin.",
"Step X must be finished before step D can begin.",
"Step Q must be finished before step D can begin.",
"Step S must be finished before step T can begin.",
"Step R must be finished before step W can begin.",
"Step O must be finished before step V can begin.",
"Step C must be finished before step Q can begin.",
"Step C must be finished before step S can begin.",
"Step S must be finished before step E can begin.",
"Step A must be finished before step D can begin.",
"Step V must be finished before step T can begin.",
"Step K must be finished before step B can begin.",
"Step B must be finished before step D can begin.",
"Step V must be finished before step E can begin.",
"Step N must be finished before step M can begin.",
"Step Z must be finished before step T can begin.",
"Step L must be finished before step A can begin.",
"Step K must be finished before step Z can begin.",
"Step F must be finished before step J can begin.",
"Step M must be finished before step U can begin.",
"Step Z must be finished before step P can begin.",
"Step R must be finished before step E can begin.",
"Step M must be finished before step X can begin.",
"Step O must be finished before step E can begin.",
"Step K must be finished before step V can begin.",
"Step U must be finished before step D can begin.",
"Step K must be finished before step T can begin.",
"Step F must be finished before step W can begin.",
"Step I must be finished before step U can begin.",
"Step Z must be finished before step S can begin.",
"Step H must be finished before step D can begin.",
"Step O must be finished before step P can begin.",
"Step B must be finished before step E can begin.",
"Step X must be finished before step U can begin.",
"Step A must be finished before step J can begin.",
"Step Y must be finished before step V can begin.",
"Step U must be finished before step T can begin.",
"Step G must be finished before step B can begin.",
"Step U must be finished before step W can begin.",
"Step H must be finished before step W can begin.",
"Step G must be finished before step J can begin.",
"Step X must be finished before step Z can begin.",
"Step L must be finished before step R can begin.",
"Step Q must be finished before step X can begin.",
"Step I must be finished before step O can begin.",
"Step J must be finished before step E can begin.",
"Step N must be finished before step D can begin.",
"Step C must be finished before step B can begin.",
"Step I must be finished before step W can begin.",
"Step P must be finished before step J can begin.",
"Step D must be finished before step E can begin.",
"Step L must be finished before step J can begin.",
"Step R must be finished before step J can begin.",
"Step N must be finished before step A can begin.",
"Step F must be finished before step O can begin.",
"Step Y must be finished before step Q can begin.",
"Step L must be finished before step F can begin.",
"Step Q must be finished before step U can begin.",
"Step O must be finished before step T can begin.",
"Step Z must be finished before step E can begin.",
"Step Y must be finished before step K can begin.",
"Step G must be finished before step A can begin.",
"Step Q must be finished before step E can begin.",
"Step V must be finished before step D can begin.",
"Step F must be finished before step K can begin.",
"Step C must be finished before step E can begin.",
"Step F must be finished before step A can begin.",
"Step X must be finished before step B can begin.",
"Step G must be finished before step U can begin.",
"Step C must be finished before step H can begin.",
"Step Y must be finished before step W can begin.",
"Step R must be finished before step Z can begin.",
"Step W must be finished before step D can begin.",
"Step C must be finished before step T can begin.",
"Step H must be finished before step M can begin.",
"Step O must be finished before step Q can begin.",
];
console.log(processInput(input));
