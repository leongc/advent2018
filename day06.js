/*
https://adventofcode.com/2018/day/6

--- Day 6: Chronal Coordinates ---
The device on your wrist beeps several times, and once again you feel like you're falling.

"Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify new target coordinates."

The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous? It recommends you check manual page 729. The Elves did not give you a manual.

If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from the other points.

Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations that are closest to that coordinate (and aren't tied in distance to any other coordinate).

Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

1, 1
1, 6
8, 3
3, 4
5, 5
8, 9
If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

..........
.A........
..........
........C.
...D......
.....E....
.B........
..........
..........
........F.
This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's closest coordinate can be determined, shown here in lowercase:

aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf
Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

What is the size of the largest area that isn't infinite?

*/
var testInput = [
[1, 1],
[1, 6],
[8, 3],
[3, 4],
[5, 5],
[8, 9],
];
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
console.assert(extents(testInput).toString() == [[1,1],[8,9]].toString());

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

function dump(grid, delimiter='') {
  var result = "";
  for (var j = 0; j < grid.length; j++) {
    result += grid[j].join(delimiter) + "\n";
  }
  return result;
}
console.assert(dump(makeGrid([0,0], [1,0])) == "    \n    \n    \n");

function encodePoint(xy) {
  return xy[0] + (xy[1] * 1000);
}
function decodePoint(encoded) {
  return [encoded % 1000, Math.floor(encoded / 1000)];
}
var charA = "A".charCodeAt(0);
function addPoint(grid, encodedPointSets, xy, group, minxy = [0,0]) {
  var groupChar = String.fromCharCode(charA + group);
  var gridx = xy[0] - minxy[0] + 1;
  var gridy = xy[1] - minxy[1] + 1;
  var prev = grid[gridy][gridx];
  if (prev == " ") {
    grid[gridy][gridx] = groupChar;
    encodedPointSets[group].add(encodePoint(xy));
    return true;
  }
  if (prev != "." && prev != groupChar) {
    grid[gridy][gridx] = ".";
    encodedPointSets[prev.charCodeAt(0) - charA].delete(encodePoint(xy));
  }
  return false;
}
function nextPointSets(grid, encodedPointSets, minxy = [0,0]) {
  var result = [];
  for (var group = 0; group < encodedPointSets.length; group++) {
    var set = new Set();
    for (let encodedPoint of encodedPointSets[group]) {
      var [x, y] = decodePoint(encodedPoint);
      var gridx = x - minxy[0] + 1;
      var gridy = y - minxy[1] + 1;
      if (gridy > 0 && grid[gridy-1][gridx] == " ") { set.add([x, y-1]); }
      if (gridx > 0 && grid[gridy][gridx-1] == " ") { set.add([x-1, y]); }
      if (gridy < grid.length-1 && grid[gridy+1][gridx] == " ") { set.add([x, y+1]); }
      if (gridx < grid[gridy].length-1 && grid[gridy][gridx+1] == " ") { set.add([x+1, y]); }
      // keep-alive points at edges to represent infinity
      if (gridy == 0 || gridy == grid.length - 1 || gridx == 0 || gridx == grid[gridy].length - 1) { set.add([x, y]); }
    }
    result[group] = set;
  }
  return result;
}
function findMaxFiniteArea(initialPoints) {
  var maxFiniteArea = 0;
  function addAll(grid, encodedPointSets, nextPointSets, minxy = [0,0]) {
    for (var group = 0; group < nextPointSets.length; group++) {
      if (nextPointSets[group].size == 0) {
        // group is finite
        if (encodedPointSets[group].size > maxFiniteArea) {
          maxFiniteArea = encodedPointSets[group].size;
        }
      }
      for (let point of nextPointSets[group]) {
        addPoint(grid, encodedPointSets, point, group, minxy);
      }
    }
  }
  var [minxy, maxxy] = extents(initialPoints);
  var grid = makeGrid(minxy, maxxy);
  var encodedPointSets = [];
  for (var group = 0; group < initialPoints.length; group++) {
    encodedPointSets[group] = new Set();
    addPoint(grid, encodedPointSets, initialPoints[group], group, minxy);
  }
  // console.log(dump(grid));

  var stepsRemaining = Math.ceil(((maxxy[0] - minxy[0]) + (maxxy[1] - minxy[1])) / 2);
  while (stepsRemaining-- > 0 && dump(grid).indexOf(' ') > -1) {
    var nps = nextPointSets(grid, encodedPointSets, minxy);
    addAll(grid, encodedPointSets, nps, minxy);
    // console.log("stepsRemaining = " + stepsRemaining);
    // console.log(dump(grid));
  }
  return maxFiniteArea;
}
console.assert(findMaxFiniteArea(testInput) == 17);

var input = [
[61, 90],
[199, 205],
[170, 60],
[235, 312],
[121, 290],
[62, 191],
[289, 130],
[131, 188],
[259, 82],
[177, 97],
[205, 47],
[302, 247],
[94, 355],
[340, 75],
[315, 128],
[337, 351],
[73, 244],
[273, 103],
[306, 239],
[261, 198],
[355, 94],
[322, 69],
[308, 333],
[123, 63],
[218, 44],
[278, 288],
[172, 202],
[286, 172],
[141, 193],
[72, 316],
[84, 121],
[106, 46],
[349, 77],
[358, 66],
[309, 234],
[289, 268],
[173, 154],
[338, 57],
[316, 95],
[300, 279],
[95, 285],
[68, 201],
[77, 117],
[313, 297],
[259, 97],
[270, 318],
[338, 149],
[273, 120],
[229, 262],
[270, 136],
];
console.log(findMaxFiniteArea(input));

/*
--- Part Two ---
On the other hand, if the coordinates are safe, maybe the best you can do is try to find a region near as many coordinates as possible.

For example, suppose you want the sum of the Manhattan distance to all of the coordinates to be less than 32. For each location, add up the distances to all of the given coordinates; if the total of those distances is less than 32, that location is within the desired region. Using the same coordinates as above, the resulting region looks like this:

..........
.A........
..........
...###..C.
..#D###...
..###E#...
.B.###....
..........
..........
........F.
In particular, consider the highlighted location 4,3 located at the top middle of the region. Its calculation is as follows, where abs() is the absolute value function:

Distance to coordinate A: abs(4-1) + abs(3-1) =  5
Distance to coordinate B: abs(4-1) + abs(3-6) =  6
Distance to coordinate C: abs(4-8) + abs(3-3) =  4
Distance to coordinate D: abs(4-3) + abs(3-4) =  2
Distance to coordinate E: abs(4-5) + abs(3-5) =  3
Distance to coordinate F: abs(4-8) + abs(3-9) = 10
Total distance: 5 + 6 + 4 + 2 + 3 + 10 = 30
Because the total distance to all coordinates (30) is less than 32, the location is within the region.

This region, which also includes coordinates D and E, has a total size of 16.

Your actual region will need to be much larger than this example, though, instead including all locations with a total distance of less than 10000.

What is the size of the region containing all locations which have a total distance to all given coordinates of less than 10000?
*/
function makeZeroGrid(minxy, maxxy) {
  result = [];
  for (var y = minxy[1]; y <= maxxy[1]; y++) {
    var row = [];
    for (var x = minxy[0]; x <= maxxy[0]; x++) {
      row.push(0);
    }
    result.push(row);
  }
  return result;
}

function sumGridDistance(grid, minxy, originxy) {
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      grid[y][x] += Math.abs(x + minxy[0] - originxy[0]) + Math.abs(y + minxy[1] - originxy[1]);
    }
  }
}

function countSmallerCells(grid, limit) {
  var result = 0;
  for (var y = 0; y < grid.length; y++) {
    for (var x = 0; x < grid[y].length; x++) {
      if (grid[y][x] < limit) {
        result++;
      }
    }
  }
  return result;
}

function countClosest(points, limit) {
  var [minxy, maxxy] = extents(points);
  var grid = makeZeroGrid(minxy, maxxy);
  for (let point of points) {
    sumGridDistance(grid, minxy, point);
  }
  return countSmallerCells(grid, limit);
}

console.assert(countClosest(testInput, 32) == 16);

console.log(countClosest(input, 10000));
