/*
https://adventofcode.com/2018/day/10
--- Day 10: The Stars Align ---
It's no use; your navigation system simply isn't capable of providing walking directions in the arctic circle, and certainly not in 1018.

The Elves suggest an alternative. In times like these, North Pole rescue operations will arrange points of light in the sky to guide missing Elves back to base. Unfortunately, the message is easy to miss: the points move slowly enough that it takes hours to align them, but have so much momentum that they only stay aligned for a second. If you blink at the wrong time, it might be hours before another message appears.

You can see these points of light floating in the distance, and record their position in the sky and their velocity, the relative change in position per second (your puzzle input). The coordinates are all given from your perspective; given enough time, those positions and velocities will move the points into a cohesive message!

Rather than wait, you decide to fast-forward the process and calculate what the points will eventually spell.

For example, suppose you note the following points:

position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>
Each line represents one point. Positions are given as <X, Y> pairs: X represents how far left (negative) or right (positive) the point appears, while Y represents how far up (negative) or down (positive) the point appears.

At 0 seconds, each point has the position given. Each second, each point's velocity is added to its position. So, a point with velocity <1, -2> is moving to the right, but is moving upward twice as quickly. If this point's initial position were <3, 9>, after 3 seconds, its position would become <6, 3>.

Over time, the points listed above would move like this:

Initially:
........#.............
................#.....
.........#.#..#.......
......................
#..........#.#.......#
...............#......
....#.................
..#.#....#............
.......#..............
......#...............
...#...#.#...#........
....#..#..#.........#.
.......#..............
...........#..#.......
#...........#.........
...#.......#..........

After 1 second:
......................
......................
..........#....#......
........#.....#.......
..#.........#......#..
......................
......#...............
....##.........#......
......#.#.............
.....##.##..#.........
........#.#...........
........#...#.....#...
..#...........#.......
....#.....#.#.........
......................
......................

After 2 seconds:
......................
......................
......................
..............#.......
....#..#...####..#....
......................
........#....#........
......#.#.............
.......#...#..........
.......#..#..#.#......
....#....#.#..........
.....#...#...##.#.....
........#.............
......................
......................
......................

After 3 seconds:
......................
......................
......................
......................
......#...#..###......
......#...#...#.......
......#...#...#.......
......#####...#.......
......#...#...#.......
......#...#...#.......
......#...#...#.......
......#...#..###......
......................
......................
......................
......................

After 4 seconds:
......................
......................
......................
............#.........
........##...#.#......
......#.....#..#......
.....#..##.##.#.......
.......##.#....#......
...........#....#.....
..............#.......
....#......#...#......
.....#.....##.........
...............#......
...............#......
......................
......................
After 3 seconds, the message appeared briefly: HI. Of course, your message will be much longer and will take many more seconds to appear.

What message will eventually appear in the sky?


*/

var testInput = [
"position=< 9,  1> velocity=< 0,  2>",
"position=< 7,  0> velocity=<-1,  0>",
"position=< 3, -2> velocity=<-1,  1>",
"position=< 6, 10> velocity=<-2, -1>",
"position=< 2, -4> velocity=< 2,  2>",
"position=<-6, 10> velocity=< 2, -2>",
"position=< 1,  8> velocity=< 1, -1>",
"position=< 1,  7> velocity=< 1,  0>",
"position=<-3, 11> velocity=< 1, -2>",
"position=< 7,  6> velocity=<-1, -1>",
"position=<-2,  3> velocity=< 1,  0>",
"position=<-4,  3> velocity=< 2,  0>",
"position=<10, -3> velocity=<-1,  1>",
"position=< 5, 11> velocity=< 1, -2>",
"position=< 4,  7> velocity=< 0, -1>",
"position=< 8, -2> velocity=< 0,  1>",
"position=<15,  0> velocity=<-2,  0>",
"position=< 1,  6> velocity=< 1,  0>",
"position=< 8,  9> velocity=< 0, -1>",
"position=< 3,  3> velocity=<-1,  1>",
"position=< 0,  5> velocity=< 0, -1>",
"position=<-2,  2> velocity=< 2,  0>",
"position=< 5, -2> velocity=< 1,  2>",
"position=< 1,  4> velocity=< 2,  1>",
"position=<-2,  7> velocity=< 2, -2>",
"position=< 3,  6> velocity=<-1, -1>",
"position=< 5,  0> velocity=< 1,  0>",
"position=<-6,  0> velocity=< 2,  0>",
"position=< 5,  9> velocity=< 1, -2>",
"position=<14,  7> velocity=<-2,  0>",
"position=<-3,  6> velocity=< 2, -1>",
];
function parseLine(line) {
  var [_, px, py, vx, vy] = line.match(/position=<\s*(-?\d+),\s+(-?\d+)> velocity=<\s*(-?\d+),\s+(-?\d+)>/);
  return [parseInt(px), parseInt(py), parseInt(vx), parseInt(vy)];
}
console.assert(parseLine(testInput[0]).join().toString() == [9,1,0,2].join().toString());
console.assert(parseLine(testInput[30]).join().toString() == [-3,6,2,-1].join().toString());

function process(lines) {
  var stars = [];
  for (let line of lines) {
    stars.push(parseLine(line));
  }
  return stars;
}
function starProjector(steps) {
  return function(star) {
    var [px, py, vx, vy] = star;
    return [px + (steps * vx), py + (steps * vy)];
  };
}
console.assert([[9,1,0,2], [-3,6,2,-1]].map(starProjector(3)).join().toString() == [[9,7], [3,3]].join().toString());

function extents(points) {
  var minx = Infinity;
  var maxx = -Infinity;
  var miny = Infinity;
  var maxy = -Infinity;
  for (let point of points) {
    var [x, y] = point;
    if (x < minx) { minx = x; }
    if (x > maxx) { maxx = x; }
    if (y < miny) { miny = y; }
    if (y > maxy) { maxy = y; }
  }
  return [[minx, miny], [maxx, maxy]];
}  
console.assert(extents(process(testInput).map(starProjector(0))).toString() == [[-6,-4],[15,11]].toString());

function makeGrid(minxy, maxxy) {
  result = [];
  for (var y = minxy[1]; y <= maxxy[1] + 2; y++) {
    var row = [];
    for (var x = minxy[0]; x <= maxxy[0] + 2; x++) {
      row.push(" ");
    }
    result.push(row);
  }
  return result;
}

function addPoints(grid, points, minxy = [0,0]) {
  for (let xy of points) {
    var gridx = xy[0] - minxy[0] + 1;
    var gridy = xy[1] - minxy[1] + 1;
    grid[gridy][gridx] = "#";
  }
}

function dump(grid, delimiter='') {
  var result = "";
  for (var j = 0; j < grid.length; j++) {
    result += grid[j].join(delimiter) + "\n";
  }
  return result;
}

function showFuture(lines, steps) {
  var points = process(lines).map(starProjector(steps));
  var [minxy, maxxy] = extents(points);
  var grid = makeGrid(minxy, maxxy);
  addPoints(grid, points, minxy);
  return dump(grid);
}
console.log(showFuture(input, 10639));


var input = [
"position=<-42346,  10806> velocity=< 4, -1>",
"position=<-31708, -21106> velocity=< 3,  2>",
"position=<-10445, -10472> velocity=< 1,  1>",
"position=<-21064, -42388> velocity=< 2,  4>",
"position=< 53393,  32093> velocity=<-5, -3>",
"position=<-52992,  10809> velocity=< 5, -1>",
"position=<-52965,  42724> velocity=< 5, -4>",
"position=<-42326, -10464> velocity=< 4,  1>",
"position=< 10872, -31750> velocity=<-1,  3>",
"position=<-10433, -42381> velocity=< 1,  4>",
"position=< 32115, -42384> velocity=<-3,  4>",
"position=< 21496, -42389> velocity=<-2,  4>",
"position=< 53378,  21454> velocity=<-5, -2>",
"position=< 21460, -42387> velocity=<-2,  4>",
"position=<-21044, -42381> velocity=< 2,  4>",
"position=< 32131,  10806> velocity=<-3, -1>",
"position=<-10429, -10472> velocity=< 1,  1>",
"position=< 10874,  32091> velocity=<-1, -3>",
"position=< 32128,  53371> velocity=<-3, -5>",
"position=<-10409,  32086> velocity=< 1, -3>",
"position=<-52973,  53370> velocity=< 5, -5>",
"position=<-31678,  32093> velocity=< 3, -3>",
"position=<-21071, -10463> velocity=< 2,  1>",
"position=< 42749, -21111> velocity=<-4,  2>",
"position=<-52961, -21106> velocity=< 5,  2>",
"position=<-52981,  10809> velocity=< 5, -1>",
"position=<-42358, -42387> velocity=< 4,  4>",
"position=<-52972,  21448> velocity=< 5, -2>",
"position=< 21516,  10814> velocity=<-2, -1>",
"position=< 21503, -31746> velocity=<-2,  3>",
"position=< 42779,  21452> velocity=<-4, -2>",
"position=< 53393, -31747> velocity=<-5,  3>",
"position=<-21062,  21445> velocity=< 2, -2>",
"position=<-42318,  21446> velocity=< 4, -2>",
"position=< 10863, -53024> velocity=<-1,  5>",
"position=<-52976, -31747> velocity=< 5,  3>",
"position=<-31702, -31750> velocity=< 3,  3>",
"position=<-21047, -21102> velocity=< 2,  2>",
"position=< 21485,  32093> velocity=<-2, -3>",
"position=<-31703, -53021> velocity=< 3,  5>",
"position=<-21067, -53022> velocity=< 2,  5>",
"position=< 21517, -10463> velocity=<-2,  1>",
"position=< 10849, -21103> velocity=<-1,  2>",
"position=< 10866, -10471> velocity=<-1,  1>",
"position=<-21040,  53362> velocity=< 2, -5>",
"position=< 21479,  10810> velocity=<-2, -1>",
"position=<-10416, -10470> velocity=< 1,  1>",
"position=< 32136,  21447> velocity=<-3, -2>",
"position=< 53382,  42732> velocity=<-5, -4>",
"position=< 10821, -42381> velocity=<-1,  4>",
"position=<-52997, -53020> velocity=< 5,  5>",
"position=< 21476, -10472> velocity=<-2,  1>",
"position=<-10433, -21105> velocity=< 1,  2>",
"position=< 21516,  32085> velocity=<-2, -3>",
"position=< 42759,  32086> velocity=<-4, -3>",
"position=< 32115, -42386> velocity=<-3,  4>",
"position=< 53421, -10469> velocity=<-5,  1>",
"position=<-42330,  32090> velocity=< 4, -3>",
"position=<-31707, -21103> velocity=< 3,  2>",
"position=<-42357,  42727> velocity=< 4, -4>",
"position=< 42794,  10807> velocity=<-4, -1>",
"position=<-10457,  42729> velocity=< 1, -4>",
"position=<-21056,  42724> velocity=< 2, -4>",
"position=< 53428, -21111> velocity=<-5,  2>",
"position=< 42738, -21107> velocity=<-4,  2>",
"position=< 10882, -21102> velocity=<-1,  2>",
"position=<-42371,  42732> velocity=< 4, -4>",
"position=< 10863,  42727> velocity=<-1, -4>",
"position=< 32136, -42387> velocity=<-3,  4>",
"position=< 53412,  32088> velocity=<-5, -3>",
"position=<-42354, -42389> velocity=< 4,  4>",
"position=< 21492,  32085> velocity=<-2, -3>",
"position=<-52973,  10806> velocity=< 5, -1>",
"position=<-10428,  32092> velocity=< 1, -3>",
"position=<-10447,  32093> velocity=< 1, -3>",
"position=<-21063,  32088> velocity=< 2, -3>",
"position=<-10401, -42385> velocity=< 1,  4>",
"position=<-21069,  32093> velocity=< 2, -3>",
"position=<-42353, -53026> velocity=< 4,  5>",
"position=< 53418, -53021> velocity=<-5,  5>",
"position=< 42781, -53023> velocity=<-4,  5>",
"position=<-52988,  53362> velocity=< 5, -5>",
"position=<-21072,  21449> velocity=< 2, -2>",
"position=< 53390,  21453> velocity=<-5, -2>",
"position=< 42783, -10464> velocity=<-4,  1>",
"position=< 32142, -10467> velocity=<-3,  1>",
"position=<-10428,  32089> velocity=< 1, -3>",
"position=< 53417,  10814> velocity=<-5, -1>",
"position=<-42318, -10463> velocity=< 4,  1>",
"position=<-52987,  53362> velocity=< 5, -5>",
"position=<-42358, -10466> velocity=< 4,  1>",
"position=<-52997,  21445> velocity=< 5, -2>",
"position=<-21096, -53019> velocity=< 2,  5>",
"position=<-42345,  53368> velocity=< 4, -5>",
"position=<-52962,  32093> velocity=< 5, -3>",
"position=<-42342, -21104> velocity=< 4,  2>",
"position=<-52997, -31745> velocity=< 5,  3>",
"position=<-10424, -42385> velocity=< 1,  4>",
"position=<-52964, -42389> velocity=< 5,  4>",
"position=< 21460,  53367> velocity=<-2, -5>",
"position=<-52969, -53021> velocity=< 5,  5>",
"position=< 10850, -31744> velocity=<-1,  3>",
"position=<-42358, -53020> velocity=< 4,  5>",
"position=<-31695,  53363> velocity=< 3, -5>",
"position=<-10416, -31744> velocity=< 1,  3>",
"position=<-21056,  53371> velocity=< 2, -5>",
"position=< 42747,  53371> velocity=<-4, -5>",
"position=<-42350, -53020> velocity=< 4,  5>",
"position=< 42746, -42383> velocity=<-4,  4>",
"position=<-31693, -21106> velocity=< 3,  2>",
"position=<-10453,  10815> velocity=< 1, -1>",
"position=< 42786, -10471> velocity=<-4,  1>",
"position=< 32099, -42382> velocity=<-3,  4>",
"position=< 10829, -42383> velocity=<-1,  4>",
"position=<-10401,  42727> velocity=< 1, -4>",
"position=< 53430, -42383> velocity=<-5,  4>",
"position=<-31690, -21103> velocity=< 3,  2>",
"position=<-52976,  32085> velocity=< 5, -3>",
"position=<-21056, -53019> velocity=< 2,  5>",
"position=<-31727, -53020> velocity=< 3,  5>",
"position=< 21468, -53026> velocity=<-2,  5>",
"position=<-42318, -53021> velocity=< 4,  5>",
"position=<-52952, -31741> velocity=< 5,  3>",
"position=< 42738,  21451> velocity=<-4, -2>",
"position=< 53428, -31741> velocity=<-5,  3>",
"position=<-31703,  42726> velocity=< 3, -4>",
"position=<-42356,  10806> velocity=< 4, -1>",
"position=< 10853,  53366> velocity=<-1, -5>",
"position=<-21069,  21445> velocity=< 2, -2>",
"position=<-52979,  53366> velocity=< 5, -5>",
"position=< 10829, -31745> velocity=<-1,  3>",
"position=< 21476,  32085> velocity=<-2, -3>",
"position=< 32150, -42384> velocity=<-3,  4>",
"position=< 32115, -10470> velocity=<-3,  1>",
"position=< 53387, -21111> velocity=<-5,  2>",
"position=< 10865,  32091> velocity=<-1, -3>",
"position=<-21094,  21454> velocity=< 2, -2>",
"position=<-31727,  10810> velocity=< 3, -1>",
"position=< 10856, -42389> velocity=<-1,  4>",
"position=< 53433, -42387> velocity=<-5,  4>",
"position=< 10865,  32086> velocity=<-1, -3>",
"position=< 21509, -42389> velocity=<-2,  4>",
"position=<-52965, -10465> velocity=< 5,  1>",
"position=< 10850,  21452> velocity=<-1, -2>",
"position=<-21044,  21445> velocity=< 2, -2>",
"position=<-31731, -21102> velocity=< 3,  2>",
"position=<-31686, -10463> velocity=< 3,  1>",
"position=<-31718,  10806> velocity=< 3, -1>",
"position=<-21062, -42389> velocity=< 2,  4>",
"position=< 42754,  32084> velocity=<-4, -3>",
"position=< 21481, -10469> velocity=<-2,  1>",
"position=<-52972,  53369> velocity=< 5, -5>",
"position=<-21088,  42730> velocity=< 2, -4>",
"position=< 32123, -42386> velocity=<-3,  4>",
"position=<-31698,  53365> velocity=< 3, -5>",
"position=< 32120, -31747> velocity=<-3,  3>",
"position=<-21048, -21108> velocity=< 2,  2>",
"position=< 32151,  21450> velocity=<-3, -2>",
"position=<-53005, -31745> velocity=< 5,  3>",
"position=< 32131, -42380> velocity=<-3,  4>",
"position=< 53427, -42380> velocity=<-5,  4>",
"position=<-31709,  10806> velocity=< 3, -1>",
"position=<-21061,  53366> velocity=< 2, -5>",
"position=<-21059,  32085> velocity=< 2, -3>",
"position=<-21064, -42385> velocity=< 2,  4>",
"position=< 21516, -10467> velocity=<-2,  1>",
"position=<-31727,  21447> velocity=< 3, -2>",
"position=<-42363,  42723> velocity=< 4, -4>",
"position=<-10444,  21446> velocity=< 1, -2>",
"position=< 32144,  21454> velocity=<-3, -2>",
"position=< 21516, -10468> velocity=<-2,  1>",
"position=<-42374, -10469> velocity=< 4,  1>",
"position=< 21497,  32086> velocity=<-2, -3>",
"position=< 53409, -53019> velocity=<-5,  5>",
"position=<-10439, -53024> velocity=< 1,  5>",
"position=< 42762, -31745> velocity=<-4,  3>",
"position=<-42364, -31741> velocity=< 4,  3>",
"position=<-52994, -53028> velocity=< 5,  5>",
"position=< 53377,  53365> velocity=<-5, -5>",
"position=<-42374,  32092> velocity=< 4, -3>",
"position=<-10424, -42389> velocity=< 1,  4>",
"position=< 21510, -42389> velocity=<-2,  4>",
"position=<-10404, -21106> velocity=< 1,  2>",
"position=< 53409,  21451> velocity=<-5, -2>",
"position=<-10441, -42382> velocity=< 1,  4>",
"position=<-42350,  32085> velocity=< 4, -3>",
"position=<-42337,  53363> velocity=< 4, -5>",
"position=< 21493,  21445> velocity=<-2, -2>",
"position=<-10441,  42732> velocity=< 1, -4>",
"position=<-31699,  32088> velocity=< 3, -3>",
"position=< 32101,  53371> velocity=<-3, -5>",
"position=< 42782,  10808> velocity=<-4, -1>",
"position=<-21064, -53021> velocity=< 2,  5>",
"position=< 53388,  10815> velocity=<-5, -1>",
"position=< 21468, -21103> velocity=<-2,  2>",
"position=<-10401, -42384> velocity=< 1,  4>",
"position=< 10837,  42724> velocity=<-1, -4>",
"position=< 32134, -31750> velocity=<-3,  3>",
"position=< 10866,  21454> velocity=<-1, -2>",
"position=< 32149,  32093> velocity=<-3, -3>",
"position=<-42350, -53024> velocity=< 4,  5>",
"position=<-10401,  32087> velocity=< 1, -3>",
"position=< 32143, -42383> velocity=<-3,  4>",
"position=<-21043,  10807> velocity=< 2, -1>",
"position=< 32157, -42380> velocity=<-3,  4>",
"position=< 53422, -21110> velocity=<-5,  2>",
"position=<-10444,  53363> velocity=< 1, -5>",
"position=<-10441,  42730> velocity=< 1, -4>",
"position=< 10831,  21454> velocity=<-1, -2>",
"position=<-21038,  32093> velocity=< 2, -3>",
"position=<-21048, -53026> velocity=< 2,  5>",
"position=< 21494,  21449> velocity=<-2, -2>",
"position=< 53401, -53025> velocity=<-5,  5>",
"position=<-31687,  42725> velocity=< 3, -4>",
"position=< 42765, -31750> velocity=<-4,  3>",
"position=<-42348, -10463> velocity=< 4,  1>",
"position=<-10445,  53362> velocity=< 1, -5>",
"position=< 53393,  10812> velocity=<-5, -1>",
"position=<-10425,  21453> velocity=< 1, -2>",
"position=<-53005,  42725> velocity=< 5, -4>",
"position=<-52997, -31747> velocity=< 5,  3>",
"position=< 53403,  32093> velocity=<-5, -3>",
"position=<-52997,  21450> velocity=< 5, -2>",
"position=< 32111, -42389> velocity=<-3,  4>",
"position=< 21470,  10806> velocity=<-2, -1>",
"position=<-10441, -31748> velocity=< 1,  3>",
"position=< 32140,  32086> velocity=<-3, -3>",
"position=<-21064,  42728> velocity=< 2, -4>",
"position=< 21508,  21450> velocity=<-2, -2>",
"position=<-52969,  21451> velocity=< 5, -2>",
"position=< 32110, -31741> velocity=<-3,  3>",
"position=<-10414, -53023> velocity=< 1,  5>",
"position=<-52989,  21447> velocity=< 5, -2>",
"position=< 42794, -10465> velocity=<-4,  1>",
"position=<-52968,  21445> velocity=< 5, -2>",
"position=<-21072,  21446> velocity=< 2, -2>",
"position=<-42345, -31749> velocity=< 4,  3>",
"position=<-21040,  21451> velocity=< 2, -2>",
"position=<-52997,  21446> velocity=< 5, -2>",
"position=<-52986, -10472> velocity=< 5,  1>",
"position=<-21069,  10815> velocity=< 2, -1>",
"position=< 32123, -21109> velocity=<-3,  2>",
"position=< 10857, -42385> velocity=<-1,  4>",
"position=< 32149, -31741> velocity=<-3,  3>",
"position=<-53005, -42382> velocity=< 5,  4>",
"position=<-21037,  42732> velocity=< 2, -4>",
"position=< 42798,  42732> velocity=<-4, -4>",
"position=<-31703,  21453> velocity=< 3, -2>",
"position=<-52964, -31750> velocity=< 5,  3>",
"position=<-42358,  32092> velocity=< 4, -3>",
"position=<-21060, -10468> velocity=< 2,  1>",
"position=<-10457, -42380> velocity=< 1,  4>",
"position=< 10822, -21102> velocity=<-1,  2>",
"position=<-42374, -31750> velocity=< 4,  3>",
"position=<-21046,  53362> velocity=< 2, -5>",
"position=< 32148,  21454> velocity=<-3, -2>",
"position=<-31735, -21110> velocity=< 3,  2>",
"position=<-31675,  42732> velocity=< 3, -4>",
"position=<-42342, -42385> velocity=< 4,  4>",
"position=< 32107,  42730> velocity=<-3, -4>",
"position=< 42791,  10814> velocity=<-4, -1>",
"position=< 42746,  21448> velocity=<-4, -2>",
"position=<-42322, -53023> velocity=< 4,  5>",
"position=< 21477, -53024> velocity=<-2,  5>",
"position=< 10821, -10468> velocity=<-1,  1>",
"position=< 32119, -42385> velocity=<-3,  4>",
"position=<-42349, -42389> velocity=< 4,  4>",
"position=< 32128,  10814> velocity=<-3, -1>",
"position=<-31727,  10809> velocity=< 3, -1>",
"position=<-21063,  10810> velocity=< 2, -1>",
"position=<-52989,  53370> velocity=< 5, -5>",
"position=< 42786,  10814> velocity=<-4, -1>",
"position=< 42766, -31745> velocity=<-4,  3>",
"position=<-31723,  21454> velocity=< 3, -2>",
"position=<-42358,  21449> velocity=< 4, -2>",
"position=< 32133, -31746> velocity=<-3,  3>",
"position=<-53003, -31750> velocity=< 5,  3>",
"position=<-21043, -31749> velocity=< 2,  3>",
"position=<-31735, -21108> velocity=< 3,  2>",
"position=< 32123, -10471> velocity=<-3,  1>",
"position=<-52979,  21445> velocity=< 5, -2>",
"position=<-31694, -21108> velocity=< 3,  2>",
"position=<-42333, -53022> velocity=< 4,  5>",
"position=<-21044,  10806> velocity=< 2, -1>",
"position=<-52960,  53363> velocity=< 5, -5>",
"position=<-10409, -21107> velocity=< 1,  2>",
"position=<-42374,  42732> velocity=< 4, -4>",
"position=< 42754, -42385> velocity=<-4,  4>",
"position=< 21488, -10467> velocity=<-2,  1>",
"position=<-31706, -53019> velocity=< 3,  5>",
"position=<-10433, -42382> velocity=< 1,  4>",
"position=< 21500,  21445> velocity=<-2, -2>",
"position=<-31695, -21110> velocity=< 3,  2>",
"position=<-42358,  42732> velocity=< 4, -4>",
"position=<-10416,  42729> velocity=< 1, -4>",
"position=<-10441, -53024> velocity=< 1,  5>",
"position=< 32144, -42388> velocity=<-3,  4>",
"position=<-52988, -21111> velocity=< 5,  2>",
"position=<-21096, -21105> velocity=< 2,  2>",
"position=< 53377,  21453> velocity=<-5, -2>",
"position=<-52997, -31743> velocity=< 5,  3>",
"position=< 10849,  42728> velocity=<-1, -4>",
"position=<-21048,  42731> velocity=< 2, -4>",
"position=< 10837,  21451> velocity=<-1, -2>",
"position=< 21484,  42730> velocity=<-2, -4>",
"position=<-31726, -10472> velocity=< 3,  1>",
"position=<-42355, -42385> velocity=< 4,  4>",
"position=< 32131, -31750> velocity=<-3,  3>",
"position=<-21043,  21454> velocity=< 2, -2>",
"position=<-42366,  10807> velocity=< 4, -1>",
"position=<-21096, -53024> velocity=< 2,  5>",
"position=<-42342, -10470> velocity=< 4,  1>",
"position=<-31706,  53367> velocity=< 3, -5>",
"position=< 42779, -10470> velocity=<-4,  1>",
"position=< 42789, -42389> velocity=<-4,  4>",
"position=< 53398,  32085> velocity=<-5, -3>",
"position=<-42355,  53366> velocity=< 4, -5>",
"position=< 10869,  10810> velocity=<-1, -1>",
"position=< 32147,  53368> velocity=<-3, -5>",
"position=<-31708, -21106> velocity=< 3,  2>",
"position=< 53409,  32093> velocity=<-5, -3>",
"position=< 21492,  42728> velocity=<-2, -4>",
];
