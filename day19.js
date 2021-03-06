/*
https://adventofcode.com/2018/day/19
--- Day 19: Go With The Flow ---
With the Elves well on their way constructing the North Pole base, you turn your attention back to understanding the inner workings of programming the device.

Addition:
addr (add register) stores into register C the result of adding register A and register B.
*/
function addr(a, b, c, registers) {
  registers[c] = registers[a] + registers[b];
  return registers;
}
/*
addi (add immediate) stores into register C the result of adding register A and value B.
*/
function addi(a, b, c, registers) {
  registers[c] = registers[a] + b;
  return registers;
}
/*
Multiplication:
mulr (multiply register) stores into register C the result of multiplying register A and register B.
*/
function mulr(a, b, c, registers) {
  registers[c] = registers[a] * registers[b];
  return registers;
}
/*
muli (multiply immediate) stores into register C the result of multiplying register A and value B.
*/
function muli(a, b, c, registers) {
  registers[c] = registers[a] * b;
  return registers;
}
/*
Bitwise AND:
banr (bitwise AND register) stores into register C the result of the bitwise AND of register A and register B.
*/
function banr(a, b, c, registers) {
  registers[c] = registers[a] & registers[b];
  return registers;
}
/*
bani (bitwise AND immediate) stores into register C the result of the bitwise AND of register A and value B.
*/
function bani(a, b, c, registers) {
  registers[c] = registers[a] & b;
  return registers;
}
/*
Bitwise OR:
borr (bitwise OR register) stores into register C the result of the bitwise OR of register A and register B.
*/
function borr(a, b, c, registers) {
  registers[c] = registers[a] | registers[b];
  return registers;
}
/*
bori (bitwise OR immediate) stores into register C the result of the bitwise OR of register A and value B.
*/
function bori(a, b, c, registers) {
  registers[c] = registers[a] | b;
  return registers;
}
/*
Assignment:
setr (set register) copies the contents of register A into register C. (Input B is ignored.)
*/
function setr(a, b, c, registers) {
  registers[c] = registers[a];
  return registers;
}
/*
seti (set immediate) stores value A into register C. (Input B is ignored.)
*/
function seti(a, b, c, registers) {
  registers[c] = a;
  return registers;
}
/*
Greater-than testing:
gtir (greater-than immediate/register) sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
*/
function gtir(a, b, c, registers) {
  registers[c] = (a > registers[b]) ? 1: 0;
  return registers;
}
/*
gtri (greater-than register/immediate) sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
*/
function gtri(a, b, c, registers) {
  registers[c] = (registers[a] > b) ? 1 : 0;
  return registers;
}
/*
gtrr (greater-than register/register) sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
*/
function gtrr(a, b, c, registers) {
  registers[c] = (registers[a] > registers[b]) ? 1 : 0;
  return registers;
}
/*
Equality testing:
eqir (equal immediate/register) sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
*/
function eqir(a, b, c, registers) {
  registers[c] = (a == registers[b]) ? 1 : 0;
  return registers;
}
/*
eqri (equal register/immediate) sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
*/
function eqri(a, b, c, registers) {
  registers[c] = (registers[a] == b) ? 1 : 0;
  return registers;
}
/*
eqrr (equal register/register) sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
*/
function eqrr(a, b, c, registers) {
  registers[c] = (registers[a] == registers[b]) ? 1 : 0;
  return registers;
}
var ops = [addr, addi, mulr, muli, banr, bani, borr, bori, setr, seti, gtir, gtri, gtrr, eqir, eqri, eqrr];
var nameOpMap = new Map(ops.map(op => [op.name, op]));
/*
You can't help but notice that the device's opcodes don't contain any flow control like jump instructions. The device's manual goes on to explain:

"In programs where flow control is required, the instruction pointer can be bound to a register so that it can be manipulated directly. This way, setr/seti can function as absolute jumps, addr/addi can function as relative jumps, and other opcodes can cause truly fascinating effects."

This mechanism is achieved through a declaration like #ip 1, which would modify register 1 so that accesses to it let the program indirectly access the instruction pointer itself. To compensate for this kind of binding, there are now six registers (numbered 0 through 5); the five not bound to the instruction pointer behave as normal. Otherwise, the same rules apply as the last time you worked with this device.

When the instruction pointer is bound to a register, its value is written to that register just before each instruction is executed, and the value of that register is written back to the instruction pointer immediately after each instruction finishes execution. Afterward, move to the next instruction by adding one to the instruction pointer, even if the value in the instruction pointer was just updated by an instruction. (Because of this, instructions must effectively set the instruction pointer to the instruction before the one they want executed next.)

The instruction pointer is 0 during the first instruction, 1 during the second, and so on. If the instruction pointer ever causes the device to attempt to load an instruction outside the instructions defined in the program, the program instead immediately halts. The instruction pointer starts at 0.

It turns out that this new information is already proving useful: the CPU in the device is not very powerful, and a background process is occupying most of its time. You dump the background process' declarations and instructions to a file (your puzzle input), making sure to use the names of the opcodes rather than the numbers.

For example, suppose you have the following program:
*/
var testInput = [
"#ip 0",
"seti 5 0 1",
"seti 6 0 2",
"addi 0 1 0",
"addr 1 2 3",
"setr 1 0 0",
"seti 8 0 4",
"seti 9 0 5",
];
/*
When executed, the following instructions are executed. Each line contains the value of the instruction pointer at the time the instruction started, the values of the six registers before executing the instructions (in square brackets), the instruction itself, and the values of the six registers after executing the instruction (also in square brackets).

ip=0 [0, 0, 0, 0, 0, 0] seti 5 0 1 [0, 5, 0, 0, 0, 0]
ip=1 [1, 5, 0, 0, 0, 0] seti 6 0 2 [1, 5, 6, 0, 0, 0]
ip=2 [2, 5, 6, 0, 0, 0] addi 0 1 0 [3, 5, 6, 0, 0, 0]
ip=4 [4, 5, 6, 0, 0, 0] setr 1 0 0 [5, 5, 6, 0, 0, 0]
ip=6 [6, 5, 6, 0, 0, 0] seti 9 0 5 [6, 5, 6, 0, 0, 9]
*/
function executeProgram(lines, r0 = 0) {
  var ipReg = parseInt(lines[0].match(/#ip (\d+)/)[1]);
  var program = [];
  for (let i = 1; i < lines.length; i++) {
    var line = lines[i].split(' ');
    var op = nameOpMap.get(line[0]);
    var args = line.slice(1).map(x => parseInt(x));
    var instruction = [op, args];
    program.push(instruction);
  }
  var registers = [r0];
  for (let r = 1; r < 6; r++) {
    registers[r] = 0;
  }
  var pc = registers[ipReg];
  var steps = 0;
  var debugLine;
  while (0 <= pc && pc < program.length && steps < 100000000001) {
    var [op, args] = program[pc];
    registers[ipReg] = pc;
    if (steps % 10000000 == 0) {
      debugLine = "step=" + steps + "\tip=" + pc + " [" + registers.join(', ') + "] " + op.name + " " + args.join(" ");
    }
    op.apply(undefined, args.concat([registers]));
    if (steps % 10000000 == 0) {
      debugLine += " [" + registers.join(', ') + "] ";
      console.log(debugLine);
    }
    pc = registers[ipReg];
    pc++;
    steps++;
  }
  return registers[0];
}
/*
In detail, when running this program, the following events occur:

The first line (#ip 0) indicates that the instruction pointer should be bound to register 0 in this program. This is not an instruction, and so the value of the instruction pointer does not change during the processing of this line.
The instruction pointer contains 0, and so the first instruction is executed (seti 5 0 1). It updates register 0 to the current instruction pointer value (0), sets register 1 to 5, sets the instruction pointer to the value of register 0 (which has no effect, as the instruction did not modify register 0), and then adds one to the instruction pointer.
The instruction pointer contains 1, and so the second instruction, seti 6 0 2, is executed. This is very similar to the instruction before it: 6 is stored in register 2, and the instruction pointer is left with the value 2.
The instruction pointer is 2, which points at the instruction addi 0 1 0. This is like a relative jump: the value of the instruction pointer, 2, is loaded into register 0. Then, addi finds the result of adding the value in register 0 and the value 1, storing the result, 3, back in register 0. Register 0 is then copied back to the instruction pointer, which will cause it to end up 1 larger than it would have otherwise and skip the next instruction (addr 1 2 3) entirely. Finally, 1 is added to the instruction pointer.
The instruction pointer is 4, so the instruction setr 1 0 0 is run. This is like an absolute jump: it copies the value contained in register 1, 5, into register 0, which causes it to end up in the instruction pointer. The instruction pointer is then incremented, leaving it at 6.
The instruction pointer is 6, so the instruction seti 9 0 5 stores 9 into register 5. The instruction pointer is incremented, causing it to point outside the program, and so the program ends.
What value is left in register 0 when the background process halts?
*/
console.assert(executeProgram(testInput) == 6);

var input = [
"#ip 2",
"addi 2 16 2",
"seti 1 1 1",
"seti 1 8 5",
"mulr 1 5 4",
"eqrr 4 3 4",
"addr 4 2 2",
"addi 2 1 2",
"addr 1 0 0",
"addi 5 1 5",
"gtrr 5 3 4",
"addr 2 4 2",
"seti 2 0 2",
"addi 1 1 1",
"gtrr 1 3 4",
"addr 4 2 2",
"seti 1 1 2",
"mulr 2 2 2",
"addi 3 2 3",
"mulr 3 3 3",
"mulr 2 3 3",
"muli 3 11 3",
"addi 4 7 4",
"mulr 4 2 4",
"addi 4 6 4",
"addr 3 4 3",
"addr 2 0 2",
"seti 0 3 2",
"setr 2 0 4",
"mulr 4 2 4",
"addr 2 4 4",
"mulr 2 4 4",
"muli 4 14 4",
"mulr 4 2 4",
"addr 3 4 3",
"seti 0 4 0",
"seti 0 4 2",
];
console.log(executeProgram(input));

/*
--- Part Two ---
A new background process immediately spins up in its place. It appears identical, but on closer inspection, you notice that this time, register 0 started with the value 1.

What value is left in register 0 when this new background process halts?
*/
console.log(executeProgram(input, 1));
