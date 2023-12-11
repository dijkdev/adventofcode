////////////////////////////////////////////
//  THIS IS DAY 9                         //
//  https://adventofcode.com/2023/day/9   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Sensor {
  start: number[] = [];

  constructor(line: string) {
    this.start = [...line.matchAll(/\s*(-?\d+)\s*/g)].map(([_, v]) => +v);
  }

  look(nrs: number[] = this.start, add: number = 0, count: number = 0): number {
    if (nrs.every((nr) => nr === 0)) {
      return add;
    }
    const next = nrs.reduce((nxt, nr, idx, all) => {
      if (idx < all.length - 1) {
        nxt.push(all[idx + 1] - nr);
      }
      return nxt;
    }, [] as number[]);
    return this.look(next, nrs.at(-1)! + add, count + 1);
  }
}

function p1(input: Sensor[]) {
  console.log("-- p1 ------------------");

  const solution = input.map((s) => s.look()).reduce((sum, i) => sum + i);
  console.log(solution);
}

function p2(input: Sensor[]) {
  console.log("-- p2 ------------------");

  const solution = input
    .map((s) => s.look(s.start.toReversed()))
    .reduce((sum, i) => sum + i);
  console.log(solution);
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => new Sensor(l), "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    p2(input);
    // p2(read((l) => l, '2'));
  } else {
    p1(input);
    p2(input);
  }
}
