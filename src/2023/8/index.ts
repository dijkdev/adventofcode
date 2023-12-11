////////////////////////////////////////////
//  THIS IS DAY 8                         //
//  https://adventofcode.com/2023/day/8   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

// GCD and LCM algoritms based on https://learnersbucket.com/examples/algorithms/find-the-lcm-of-two-numbers-in-javascript/
function gcd(first: number, sec: number): number {
  return sec === 0 ? first : gcd(sec, first % sec);
}

function lcm(first: number, sec: number) {
  return (first * sec) / gcd(first, sec);
}

type Mapst = Record<string, { l: string; r: string }>;
type Outcome = { node: string; count: number };

class Maze {
  constructor(
    readonly instructions: string[],
    readonly map: Mapst,
  ) {}

  static fromLines(input: string[]) {
    const instructions = [...input.shift()!];
    input.shift();

    const map: Mapst = Object.fromEntries(
      input.map((line) => {
        const [node, l, r] = [...line.matchAll(/[\w\d]+/g)].flat();
        return [[node], { l, r }];
      }),
    );
    return new Maze(instructions, map);
  }

  traverso(endGame: string, node: string, count: number = 0): Outcome {
    if (node.endsWith(endGame)) {
      return { node, count };
    }
    const nextI = this.instructions[count % this.instructions.length];
    return this.traverso(
      endGame,
      nextI === "L" ? this.map[node].l : this.map[node].r,
      count + 1,
    );
  }
}

function p1(input: string[]) {
  console.log("-- p1 ------------------");

  const maze = Maze.fromLines(input);
  console.log(maze.traverso("ZZZ", "AAA").count);
}

function p2(input: string[]) {
  console.log("-- p2 ------------------");

  const maze = Maze.fromLines(input);
  const out = Object.keys(maze.map)
    .filter((i) => i.endsWith("A"))
    .map((sp) => maze.traverso("Z", sp).count)
    .reduce((total, i) => lcm(total, i));
  console.log(out);
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    p2(input);
    p2(read((l) => l, "2"));
  } else {
    p1(input);
    p2(read((l) => l, "2"));
  }
}
