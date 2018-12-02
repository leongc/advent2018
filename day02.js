/*
https://adventofcode.com/2018/day/2
--- Day 2: Inventory Management System ---
You stop falling through time, catch your breath, and check the screen on the device. "Destination reached. Current Year: 1518. Current Location: North Pole Utility Closet 83N10." You made it! Now, to find those anomalies.

Outside the utility closet, you hear footsteps and a voice. "...I'm not sure either. But now that so many people have chimneys, maybe he could sneak in that way?" Another voice responds, "Actually, we've been working on a new kind of suit that would let him fit through tight spaces like that. But, I heard that a few days ago, they lost the prototype fabric, the design plans, everything! Nobody on the team can even seem to remember important details of the project!"

"Wouldn't they have had enough fabric to fill several boxes in the warehouse? They'd be stored together, so the box IDs should be similar. Too bad it would take forever to search the warehouse for two similar box IDs..." They walk too far away to hear any more.

Late at night, you sneak to the warehouse - who knows what kinds of paradoxes you could cause if you were discovered - and use your fancy wrist device to quickly scan every box and produce a list of the likely candidates (your puzzle input).

To make sure you didn't miss any, you scan the likely candidate boxes again, counting the number that have an ID containing exactly two of any letter and then separately counting those with exactly three of any letter. You can multiply those two counts together to get a rudimentary checksum and compare it to what your device predicts.

For example, if you see the following box IDs:

abcdef contains no letters that appear exactly two or three times.
bababc contains two a and three b, so it counts for both.
abbcde contains two b, but no letter appears exactly three times.
abcccd contains three c, but no letter appears exactly two times.
aabcdd contains two a and two d, but it only counts once.
abcdee contains two e.
ababab contains three a and three b, but it only counts once.
Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. Multiplying these together produces a checksum of 4 * 3 = 12.

What is the checksum for your list of box IDs?

https://adventofcode.com/2018/day/2/input
*/

const input = [
"mphcuiszrnjzxwkbgdzqeoyxfa",
"mihcuisgrnjzxwkbgdtqeoylia",
"mphauisvrnjgxwkbgdtqeiylfa",
"mphcuisnrnjzxwkbgdgqeoylua",
"mphcuisurnjzxwkbgdtqeoilfi",
"mkhcuisvrnjzowkbgdteeoylfa",
"mphcoicvrnjzxwksgdtqeoylfa",
"mxhcuisvrndzxwkbgdtqeeylfa",
"dphcuisijnjzxwkbgdtqeoylfa",
"mihvuisvrqjzxwkbgdtqeoylfa",
"mphcuisrrnvzxwkbgdtqeodlfa",
"mphtuisdrnjzxskbgdtqeoylfa",
"mphcutmvsnjzxwkbgdtqeoylfa",
"mphcunsvrnjzswkggdtqeoylfa",
"mphcuisvrwjzxwkbpdtqeoylfr",
"mphcujsdrnjzxwkbgdtqeovlfa",
"mpfcuisvrdjzxwkbgdtteoylfa",
"mppcuisvrpjzxwkbgdtqeoywfa",
"mphcuisvrnjzxwkbfptqroylfa",
"mphcuisvrnjzxwkbgstoeoysfa",
"mphcufsvrnjzcwkbgdeqeoylfa",
"mphcuissrnjzxwkbgdkquoylfa",
"sphcuxsvrnjzxwkbgdtqioylfa",
"mphcuiivrhjzxwkbgdtqevylfa",
"echcuisvrnjzxwkbgltqeoylfa",
"mphcuisvrljexwkbvdtqeoylfa",
"mpjcuisvrnjzxwkhidtqeoylfa",
"mphcuisvrfjzmwkbgdtqeoylfl",
"mwhcuisvrnjzxwkbgdtqeoytfm",
"mphcuisvrsjzxwkbgdaqeoylfh",
"mohcuisvrnjzxwkbgdtqtoymfa",
"maycuisvrnjzxwkbgdtqboylfa",
"pphcuisvqnjzxwkbgdtqeoylfd",
"mprcuisvrnjtxwmbgdtqeoylfa",
"mfhcuisgrnjzxckbgdtqeoylfa",
"mphiubsvrnjzxwkbgdtqeoyufa",
"dphctisvrnjzxwkbgdtqeoylfk",
"mphcuisvrnjznwksgdtqeoyzfa",
"mpwcuisvrnjziwkbgdtqaoylfa",
"mphduzsvrnjznwkbgdtqeoylfa",
"mphccisvrnjzxwebgdtqeoylqa",
"xphcuisvrnjzxwkfvdtqeoylfa",
"mphcupsvrnjzxwkbgdtfeoylpa",
"mphcuisvrtjzjwkbgdtqeoylfe",
"mpbcuisvrnjzxwkbgdmieoylfa",
"mphcuisvrnjzxwkbgjtqetylaa",
"mphcuisvrnjzxwpbgdtgdoylfa",
"ophcufsvrqjzxwkbgdtqeoylfa",
"iphcuhsvrnjzxwkbgetqeoylfa",
"mphcuisvunjzxwwbgdtqeoylqa",
"mphcpisvrnjzowkbgdtveoylfa",
"mphcuisvrnjzxhkbgdtqeotlla",
"mphcuisvrnjzxwkbodtgeoylha",
"mphcuisvrjjzxwkbwdtqtoylfa",
"mphcwisvrnjnxwkbgjtqeoylfa",
"mplcuicqrnjzxwkbgdtqeoylfa",
"mphcuisvrnjzxydbgdtqeoylfn",
"ophckisvrnjzxwkbgdtqeozlfa",
"mphcuisvrkjzxwkbgdtteoblfa",
"yphcuisvrnjcxwkbggtqeoylfa",
"mphcuisvrnazxwfbqdtqeoylfa",
"mphcuisvrmjzxwkbgdtlwoylfa",
"mphctksvrnjzxwibgdtqeoylfa",
"mphcuisprnjzxlebgdtqeoylfa",
"mphcuisnrnjzxakbgdtueoylfa",
"mphcuiavrnjoxwtbgdtqeoylfa",
"nphcuisvrnjzxwkbgdtqzoylfk",
"mphcuisrrnjmxwkbgdtqdoylfa",
"mphcuisvrujzxwkvgdtqehylfa",
"mphcuisvrnfzxwkogdtqebylfa",
"mphcuisvrnjwdwkbgdtqeoyxfa",
"mphcuisvrntzxwkrgxtqeoylfa",
"mpzcuisvrnjzxwebgdtqeoylsa",
"aphcuikvrnjzxwwbgdtqeoylfa",
"mphcqisvrnjzxwkpgdtqeoelfa",
"mphcuusvrnjzxwkbgdtjeodlfa",
"mphcuisvrnjzewkbgdtteoylza",
"mphcuisvanjzxwkbgdtheoylfc",
"mphcjishrnjzxwkbgltqeoylfa",
"mpxcuislrnjzxwkbgdtqeoynfa",
"mphcuisvrnjjxwkbgdtmeoxlfa",
"mphcimsvrnjzxwkbsdtqeoylfa",
"mphcxisvcnjzxwjbgdtqeoylfa",
"mphcuisbrvjzxwkbgdtqeoymfa",
"mplcuisvrnjzxwkbgdtaenylfa",
"mphcuihvrnjzxwkygytqeoylfa",
"mphcbisvrnjzxhkbgdtqezylfa",
"mphcuisarnjzxwkbgatqeoylfv",
"mphcumsvrnjzxwkbgdrqebylfa",
"mlhcuisvrnwzxwkbgdtqeoylfx",
"mpkcuisvrkjzxwkbgdtqeoylfo",
"mphcuissrnjzxwkbgdtqmoylfc",
"mphcuiwvrnjuxwkfgdtqeoylfa",
"mphcuicvlnjzxwkbgdvqeoylfa",
"mphcuisvrvvzxwkbfdtqeoylfa",
"myhcuisvrnjpxwkbgntqeoylfa",
"mpocuisvrnjzxwtbgitqeoylfa",
"mphcuisvrnjzxwkbgdtwewyqfa",
"mphcuisvtnjzxwwbgdtqeoolfa",
"mphcuisvrnjzxgkbgdyqeoyyfa",
"mphcuisvrdjzxwkbgpyqeoylfa",
"bphcuisvrnjzxwkbgxtqefylfa",
"sphcuisvrdjzxwktgdtqeoylfa",
"mphcuvsvrnjmxwobgdtqeoylfa",
"mphcuisvrnjzxwkbsdtqeuylfb",
"mnhcmisvynjzxwkbgdtqeoylfa",
"mphckisvrnjzxwkhgdkqeoylfa",
"mpacuisvrnjzxwkbgdtqeoolaa",
"mpgcuisvrnjzxwkbzdtqeoynfa",
"mphcuisvrojzxwkbzdtqeoylga",
"mphcuisvknjfxwkbydtqeoylfa",
"mphcuistrnjzxwkbgdqqeuylfa",
"bpvcuiszrnjzxwkbgdtqeoylfa",
"mphcuxsvrnjzswkbgdtqeoelfa",
"mphcuisvbnjzxwlbgdtqeoylla",
"mphcuisvonczxwkbgktqeoylfa",
"mphcuisvrnkzxwvbgdtquoylfa",
"mphcuisvrnjzxokfgdtqeoylia",
"tphcuisvrnjzxwkbjdwqeoylfa",
"mihcuisvrnjzpwibgdtqeoylfa",
"mphcuisvrejzxwkbgdtqjuylfa",
"mprcuisvrnjixwkxgdtqeoylfa",
"mpqcuiszrnjzxwkbgdtqeodlfa",
"mphcuasvrnjzzakbgdtqeoylva",
"mphcuisvrnjzmwkbtdtqeoycfa",
"mphcuisvrnjzxwkbcdtqioylxa",
"mphckisvrnjzxwkbcdtqeoylfm",
"mphcuisvrnjuxwbogdtqeoylfa",
"mphcuisdrnjzxwkbldtqeoylfx",
"mphcuisvrnjoxwkbgdtqeyyyfa",
"mphcuicvqnjzxwkbgdtqeoylna",
"mpmcuisvrnjzxwkbgdtqktylfa",
"mphcuisvrnqzxwkggdtqeoykfa",
"mphcuisvryjzxwkbydtqejylfa",
"mphcugsvrnjzxwkbghtqeeylfa",
"rphcuusvrnjzxwkwgdtqeoylfa",
"zphwuiyvrnjzxwkbgdtqeoylfa",
"cphcuivvrnjzxwkbgdtqenylfa",
"mphcuisvrnjzxwkagotqevylfa",
"mprcuisvrcjzxwkbgdtqeoytfa",
"mphjugsvrnezxwkbgdtqeoylfa",
"mphcuisvryjzxwkbgltqeoylaa",
"mphcursvrnjzxfkbgdtqeoydfa",
"mphcuisvrcuzxwkbgdtqeoylfw",
"mphcuisvrijzxwkbgdtqeoelfh",
"xphcuisvenjzxjkbgdtqeoylfa",
"mphcuisvrnazxwkbgdeqeoylaa",
"mphcuisbrsjzxwkbgdtqeoygfa",
"mlhvuisvrnjzxwkbgdtqeoylfh",
"mphcuisvrnjzxukbgdtqeoyhfy",
"mpzcuilvrnjzawkbgdtqeoylfa",
"hphcuisjfnjzxwkbgdtqeoylfa",
"mahcuisvrnjzxwkegdtqeoylfi",
"mphcuixvrnjzcwkbgdtqetylfa",
"mphcuisvrnjzxwkdgdtqeoklfj",
"mlhcuisvrnjzxwkbgdteeoylka",
"mphcuifvrnjbxwkrgdtqeoylfa",
"mphcuasvrnjzzwkbgdtqeoylva",
"mphcuisvrnjzxwkboutqeoylba",
"mbhcuisvcnjzxwklgdtqeoylfa",
"mpbcuisvrnjzxgkbgdtqesylfa",
"mphcuisvrnjfswkbgdtqeoylfd",
"mphcuisvrnjzxwkbgdoweoysfa",
"uphcuisvrnjzrwkbgdtqelylfa",
"mphcuisvrnjzxwkbgdtqyoylsi",
"mpqcuiqvxnjzxwkbgdtqeoylfa",
"mphcuisorfjzxwkbgatqeoylfa",
"mphcuisvrntfxwkbzdtqeoylfa",
"mphcuisvrnrzxwkbgdtueoylfl",
"mphcuisvrnjzewkagdtyeoylfa",
"mpocuisdrnjzxwkbgdtqeozlfa",
"mphcuisvrnjjxwkbgdtoeoylfm",
"mphcuisvenjzxwkbgdtqwoylza",
"mpmcuisvrnjzxwkbgdtqeoxlfr",
"mphcuisvgnjhxwkbgdtqeoplfa",
"mphcuisvrnjzowkdgdtqeoyyfa",
"mphcuisqynjzxwkbgdtqeoylda",
"hphcuisvgnjzxwkbgdtbeoylfa",
"iphcuipvrnuzxwkbgdtqeoylfa",
"mphcuisvrnjzsikbpdtqeoylfa",
"mpwcuhsvrnjzxbkbgdtqeoylfa",
"mnhjuisvcnjzxwkbgdtqeoylfa",
"mphcudsvrnjzxwkbgdtqloilfa",
"mpncuiwvrwjzxwkbgdtqeoylfa",
"mphcuisvrnjgawkbgdtqeoylya",
"mphcuisvrnjzxwkbggtteoslfa",
"mphcuisvrnjzxwkbgdvqeoylpe",
"mphcuisvrnczxfkbgktqeoylfa",
"mphcuifvrnjzxwkbgdbmeoylfa",
"mphcuisvrnjytwkbgdtqeoylla",
"mphcuisvrnjzxwkbgdtjeoxlfn",
"mphjuisvrnjzxwkbghtqeoyffa",
"mphcuisvrnjzxkrbgdtqeoylaa",
"mphcbisvrnjzxwkbgttqeoylfs",
"mphkuksvbnjzxwkbgdtqeoylfa",
"nphcuidvrnjzxwhbgdtqeoylfa",
"mphguzsvrnjzxwkbgdaqeoylfa",
"mihcuisfrnjzxwkbgdtqhoylfa",
"mphcuisvrnrzxwpbgdtqesylfa",
"zphcuisvrnjzxwkbddtqeoylaa",
"mphcuigvmnjzxwkbgdtqeoylba",
"mjhcuisvrnjzxjkbgdtqeoylha",
"mphnuisvrnjznwkbgdtqnoylfa",
"mkhcuisvrnjcxwkbgdqqeoylfa",
"mphcuisvenjzxwbbqdtqeoylfa",
"qphcuisnrnjzawkbgdtqeoylfa",
"mphcuisvrdjzxwkbgdtqeoywca",
"mphcuzsvvnjzxwfbgdtqeoylfa",
"pphcuxsvrnjzxwkbgdtmeoylfa",
"mphiuvsvrnjzxlkbgdtqeoylfa",
"mphlqisvrnjzxkkbgdtqeoylfa",
"mmhcuisvrnjzxwkbgatqeoylea",
"mphduisrrnjoxwkbgdtqeoylfa",
"mphcuisvrnjnxwkvgdyqeoylfa",
"mphcuvsvrnjzxgkbgdtqeoylfz",
"mphcuisvryjzxwkbggtqkoylfa",
"iphcuisvrdjzxwkbgotqeoylfa",
"mphcuisvrnjzxwhbgdtqwoyofa",
"mphcorbvrnjzxwkbgdtqeoylfa",
"mghcuisvrnpzxykbgdtqeoylfa",
"mphauisvrnjnxwkbzdtqeoylfa",
"mphcgisvrnjzxwkwgdtqeoygfa",
"mphcuisvrnjzxwkggotqeoylba",
"mphcuesvrnjzxwkbgdwqebylfa",
"yphcuisvrnjzxwkbgdxqeoylja",
"ephyuisvrnjzywkbgdtqeoylfa",
"mfhcuisqrnjzxwkbgdlqeoylfa",
"mphkuisvrnjzxwkbertqeoylfa",
"mphcuusgrnjzxwkbggtqeoylfa",
"mphcuildrnjvxwkbgdtqeoylfa",
"mphcuiuvrnjzlwkbgwtqeoylfa",
"mppcuisvrljzxwkbgdtqeoylfw",
"mphcwiwvrnjzxwsbgdtqeoylfa",
"mphcubivrnjzxwkqgdtqeoylfa",
"mphcuisvrnjpxwkngdtqeoylpa",
"pchcuisvrgjzxwkbgdtqeoylfa",
"mphcuisvlnjzxwkbgdtmeoylfw",
"mphcuisvrnjzywkbgdvqeoylfj",
"mpzcuisvrnezxwktgdtqeoylfa",
"mphcuisvrnjbxwkbgzrqeoylfa",
"mphcuisvrnjzxwktgdtqeodtfa",
"jphcuiavrnjzxwkbgdtqeoylfv",
"mphcuisvrnjzxwkbddppeoylfa",
"mphcuissrkjzxwkbgxtqeoylfa",
"mphcuisvrhjzxwxbgdtqeoylxa",
"mphcvisvgnjjxwkbgdtqeoylfa",
"mphcuisprnjwxwtbgdtqeoylfa",
"mphcuissrnjzxqkbgdtqeoymfa",
"mphcuiabrnjzxokbgdtqeoylfa",
"mphcuisvrnczxwkbgmtpeoylfa"];

const testInput = [
"abcdef", // contains no letters that appear exactly two or three times.
"bababc", // contains two a and three b, so it counts for both.
"abbcde", // contains two b, but no letter appears exactly three times.
"abcccd", // contains three c, but no letter appears exactly two times.
"aabcdd", // contains two a and two d, but it only counts once.
"abcdee", // contains two e.
"ababab"];// contains three a and three b, but it only counts once.

function getLetterCount(s) {
  var result = {};
  for (var i=0; i<s.length; i++) {
    var prevCount = result[s[i]];
    result[s[i]] = (prevCount === undefined) ? 1 : (prevCount + 1);
  }
  return result;
}

console.assert(JSON.stringify(getLetterCount("")) == JSON.stringify({}));
console.assert(JSON.stringify(getLetterCount("a")) == JSON.stringify({"a":1}));
console.assert(JSON.stringify(getLetterCount("aa")) == JSON.stringify({"a":2}));
console.assert(JSON.stringify(getLetterCount("abb")) == JSON.stringify({"a":1, "b":2}));
console.assert(JSON.stringify(getLetterCount("ababa")) == JSON.stringify({"a":3, "b":2}));

function hasCounts(n, letterCounts) {
  var letters = keys(letterCounts);
  for (var i = 0; i < letters.length; i++) {
    if (letterCounts[letters[i]] == n) {
      return true;
    }
  }
  return false;
}

console.assert(hasCounts(1, {"a":1,"b":3}) === true);
console.assert(hasCounts(2, {"a":1,"b":3}) === false);
console.assert(hasCounts(3, {"a":1,"b":3}) === true);

function checksum(strings) {
  var twos = 0;
  var threes = 0;
  for (var i = 0; i < strings.length; i++) {
    var s = strings[i];
    var letterCount = getLetterCount(s);
    if (hasCounts(2, letterCount)) {
      twos++;
    }
    if (hasCounts(3, letterCount)) {
      threes++;
    }
  }
  return twos * threes;
}

console.assert(checksum(testInput) === 12);
console.log(checksum(input));

/*
--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
*/
function chomp(n, s) {
  return s.substring(0,n) + s.substring(n+1);
}
console.assert(chomp(2, "abcde") == "abde");

function findSimilar(inputs) {
  for (var i = 0; i < inputs[0].length; i++) {
    var set = new Set();
    for (var j = 0; j < inputs.length; j++) {
      var sub = chomp(i, inputs[j]);
      if (set.has(sub)) {
        return sub;
      }
      set.add(sub);
    }
  }
  return "not found";
}
const testInput2 = [
  "abcde",
  "fghij",
  "klmno",
  "pqrst",
  "fguij",
  "axcye",
  "wvxyz"];
console.assert(findSimilar(testInput2) == "fgij");
console.log(findSimilar(input));
