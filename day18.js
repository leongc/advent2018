/*
https://adventofcode.com/2018/day/18
--- Day 18: Settlers of The North Pole ---
On the outskirts of the North Pole base construction project, many Elves are collecting lumber.

The lumber collection area is 50 acres by 50 acres; each acre can be either open ground (.), trees (|), or a lumberyard (#). You take a scan of the area (your puzzle input).

Strange magic is at work here: each minute, the landscape looks entirely different. In exactly one minute, an open acre can fill with trees, a wooded acre can be converted to a lumberyard, or a lumberyard can be cleared to open ground (the lumber having been sent to other projects).

The change to each acre is based entirely on the contents of that acre as well as the number of open, wooded, or lumberyard acres adjacent to it at the start of each minute. Here, "adjacent" means any of the eight acres surrounding that acre. (Acres on the edges of the lumber collection area might have fewer than eight adjacent acres; the missing acres aren't counted.)

In particular:

An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.
An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.
An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.
These changes happen across all acres simultaneously, each of them using the state of all acres at the beginning of the minute and changing to their new form by the end of that same minute. Changes that happen during the minute don't affect each other.

For example, suppose the lumber collection area is instead only 10 by 10 acres with this initial configuration:

Initial state:
*/
var testInput = [
".#.#...|#.",
".....#|##|",
".|..|...#.",
"..|#.....#",
"#.#|||#|#|",
"...#.||...",
".|....|...",
"||...#|.#|",
"|.||||..|.",
"...#.|..|.",
];

function next(grid) {
  var result = [];
  for (let y = 0; y < grid.length; y++) {
    var row = "";
    for (let x = 0; x < grid[y].length; x++) {
      var [adjacentTrees, adjacentLumberYards] = countAdjacent(grid, x, y);
      switch (grid[y][x]) {
        case ".": row += (adjacentTrees >= 3) ? "|" : "."; break;
        case "|": row += (adjacentLumberYards >= 3) ? "#" : "|"; break;
        case "#": row += (adjacentTrees >= 1 && adjacentLumberYards >= 1) ? "#" : "."; break;
      }
    }
    result.push(row);
  }
  return result;
}

function countAdjacent(grid, x, y) {
  var trees = 0;
  var lumberYards = 0;
  for (let i = Math.max(0, y-1); i < Math.min(y+2, grid.length); i++) {
    for (let j = Math.max(0, x-1); j < Math.min(x+2, grid[i].length); j++) {
      if (i == y && j == x) {
        continue;
      }
      switch (grid[i][j]) {
        case "|": trees++; break;
        case "#": lumberYards++; break;
      }
    }
  }  
  return [trees, lumberYards];
}
console.assert(countAdjacent(testInput, 0, 0).join() == [0, 1].join());
console.assert(countAdjacent(testInput, 3, 4).join() == [2, 3].join());
console.assert(countAdjacent(testInput, 9, 9).join() == [2, 0].join());

/*
After 1 minute:
*/
var test1 = [
".......##.",
"......|###",
".|..|...#.",
"..|#||...#",
"..##||.|#|",
"...#||||..",
"||...|||..",
"|||||.||.|",
"||||||||||",
"....||..|.",
];
console.assert(next(testInput).join('\n') == test1.join('\n'));
/*
After 2 minutes:
*/
var test2 = [
".......#..",
"......|#..",
".|.|||....",
"..##|||..#",
"..###|||#|",
"...#|||||.",
"|||||||||.",
"||||||||||",
"||||||||||",
".|||||||||",
];
console.assert(next(test1).join('\n') == test2.join('\n'));

/*
After 3 minutes:
*/
var test3 = [
".......#..",
"....|||#..",
".|.||||...",
"..###|||.#",
"...##|||#|",
".||##|||||",
"||||||||||",
"||||||||||",
"||||||||||",
"||||||||||",
];
console.assert(next(test2).join('\n') == test3.join('\n'));

/*
After 4 minutes:
.....|.#..
...||||#..
.|.#||||..
..###||||#
...###||#|
|||##|||||
||||||||||
||||||||||
||||||||||
||||||||||

After 5 minutes:
....|||#..
...||||#..
.|.##||||.
..####|||#
.|.###||#|
|||###||||
||||||||||
||||||||||
||||||||||
||||||||||

After 6 minutes:
...||||#..
...||||#..
.|.###|||.
..#.##|||#
|||#.##|#|
|||###||||
||||#|||||
||||||||||
||||||||||
||||||||||

After 7 minutes:
...||||#..
..||#|##..
.|.####||.
||#..##||#
||##.##|#|
|||####|||
|||###||||
||||||||||
||||||||||
||||||||||

After 8 minutes:
..||||##..
..|#####..
|||#####|.
||#...##|#
||##..###|
||##.###||
|||####|||
||||#|||||
||||||||||
||||||||||

After 9 minutes:
..||###...
.||#####..
||##...##.
||#....###
|##....##|
||##..###|
||######||
|||###||||
||||||||||
||||||||||

After 10 minutes:
.||##.....
||###.....
||##......
|##.....##
|##.....##
|##....##|
||##.####|
||#####|||
||||#|||||
||||||||||
After 10 minutes, there are 37 wooded acres and 31 lumberyards. Multiplying the number of wooded acres by the number of lumberyards gives the total resource value after ten minutes: 37 * 31 = 1147.
*/
function resourceValue(grid, minutes) {
  var g = grid;
  for (let m = 0; m < minutes; m++) {
    g = next(g);
  }
  var trees = g.join().match(/\|/g).length
  var lumberYards = g.join().match(/#/g).length
  return trees * lumberYards;
}
console.assert(resourceValue(testInput, 10) == 1147);
/*
What will the total resource value of the lumber collection area be after 10 minutes?
*/
var input = [
"..#..|..|..###.||......#.|##.##.|#.||..#..||...|.|",
"#.....#..#.|....|.#.|..#..||##.|.|.||#|........##.",
".||.|..|.|..##|...|.|.|#|..#.|..|#......||.#...#..",
"|...#..|..|...|.#||.|||#|..#|..#|..|.||...#.|.|##|",
"#......###....||...|#...#|#..||.|..|....##||#..#.#",
".#..#|....|.|...#....#..#.##......|..|.....|#|..|.",
"##.|.#.|||..|#.|#.......|..#....##..#|..|##|..|.|.",
"..#..#...#|..#.|.#||#.#..#.##|....#...#.||........",
"#.##.......|.#...#.|.|.#||##...|||.......||..|||.#",
"|#||...#.|.....|..##...###|#.|.|..##.#..|#....#..|",
"#..#.....##.#|##.#.||..||.|||#.|......|..#.||||.#.",
"..#....#||..|#.....|......#|..#|.|.|#.##|.||.#...#",
"..|#..|#.#|...#..#.#####..##..#...........##..#||.",
".|.|..|..#...#....|.|.....###.....|.#|.|||.|..##..",
"..#|.##..###...##||.|...|#.#.##.#....|..#.#..|##..",
"|...##|.|..##|.|...#..|||.#..##..#....##.....|....",
".#..#....#.#...#|##...#.#..##.|....|##..#..|.....|",
"...|...|.....|||.#...|||#.|...||..|#.|..#|....#.#.",
".|....#.......###.....|.#...#..#|..|#..##|........",
"|...|.#.|##.|||..#........|...|||.#.|#|.#..|.|#|..",
"#|.....|...|...|..##.#...|..|.#.###....#|.|#.#..#.",
".#...|..#.#|...#...|...#.|#..||....|##|.##..|.##.#",
".....##.|......|....|......#.|.|...#.....#|.....##",
"..#....#...#...#.|...#.......#||.##..|.#....#|....",
"|...|.......|||#.....#|.#........#.|..||.|...#.#..",
".#|###...#.|.|##...|...||##...|.|.|.....#|..#...#.",
"#|###..|...##|##.|..#....##.....#...#|..#|.#....|.",
".#.#...|..||...#...|..#......|....||.|#...||..#.#.",
"|.#..|####||.|..||.|.#..#....##.........#.#||...#.",
"....|.#.#...#....|..|..#..#.....|...#..|.....|.#..",
"|....|...|#.#|..#.....#|.|..#..#.#......#..#.#.|#|",
"..##.....|....#||...#..|..|.||.#.#....#|.#.|||.||#",
"#..#....#.|.|##|##....||.#.#.##..|#..|..||#....||.",
".|.|..|...#|#.|||.....||#....|.##......|||#..#.|..",
"...#..|.#.|......#..|..|.##|#..|...##..#......|...",
"#...##.|....#....#...##.|.....|||.#...#..|......#.",
"...|.||#.||..||....#|#|#..|...#.##..#.##.#|#.#..##",
"...|.|#...|.|.||..|#|#...|#|...#..|..#...|##|#....",
"..|..|.............####|..#.#.###.#..#.#.#|||.#|#.",
".###||.|#...|..|....#...|||...|...|.....#|.#|||.#.",
".##.|..............|..|..#..##..|##.|#.#..||.|....",
"|..#.|||..|.##......|.|.......#.##..||||......#|..",
"....#.||.#.||.|.|.#.|.##.|....##.#.||..||..|.#.|.|",
".|..|..#.#.....#|...##|.||.|.|#|.|.#.....#..|.....",
"..|..#|#|#....#.||....#||.|..#|#.........#..|..||#",
"..##|#......#.#|.|...||.#....|##..|.####.......|#.",
"|..||...#.#.##.|...|#|..|#..|#..|.#.#........#...|",
"|.|#...|.#.#...#|.#..#..#.......|#.||....#..|...||",
".||...||.||...|#||.#..|........|.....|.|.|.#...#.#",
".......#|........|..|...||...###.|..|#|.|.....||..",
];
console.log(resourceValue(input, 10));

/*
--- Part Two ---
This important natural resource will need to last for at least thousands of years. Are the Elves collecting this lumber sustainably?

What will the total resource value of the lumber collection area be after 1000000000 minutes?
*/

var g = input;
var t = 0;
function advance(minutes) {
  for (let m = 0; m < minutes; m++) {
    g = next(g); t++;
  }
  var trees = g.join().match(/\|/g).length
  var lumberYards = g.join().match(/#/g).length
  // console.log(g.join('\n'));
  console.log("t=" + t + "\t|=" + trees + "\t#=" + lumberYards);
  return trees * lumberYards;
}

// by inspection, pattern repeats every 28 around 448, and 1000000000 % 28 = 20
console.log(advance(468));
