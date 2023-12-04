////////////////////////////////////////////
//  THIS IS DAY 3                         //
//  https://adventofcode.com/2023/day/3   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Point {
  digs: string[] = [];
  on: boolean = false;
  symbolAt: string = "";

  constructor() {}

  agg() {
    return +this.digs.join("");
  }

  around(line: string[], row: number, col: number): void {
    const arr: number[][] = [];

    if (row > 0) {
      arr.push([-1, 0]);
    }
    if (row > 0 && col < [...line[row - 1]].length - 1) {
      arr.push([-1, 1]);
    }
    if (col < [...line[row]].length - 1) {
      arr.push([0, 1]);
    }
    if (row < line.length - 1 && col < [...line[row + 1]].length - 1) {
      arr.push([1, 1]);
    }
    if (row < line.length - 1) {
      arr.push([1, 0]);
    }
    if (row < line.length - 1 && col > 0) {
      arr.push([1, -1]);
    }
    if (col > 0) {
      arr.push([0, -1]);
    }
    if (row > 0 && col > 0) {
      arr.push([-1, -1]);
    }
    const found = arr.find(([rd, cd]) =>
      /[^\d.]/.test([...line[row + rd]][col + cd]),
    );
    if (found) {
      const [rd, cd] = found;
      this.symbolAt = [[...line[row + rd]][col + cd], row + rd, col + cd].join(
        "|",
      );
    }
    this.on = this.on || !!found;
  }
}

function p1(input: string[]) {
  console.log("-- p1 ------------------");

  const collect: Point[] = [];
  let nrMem: Point | undefined;
  input.forEach((line, lineNr) => {
    [...line].forEach((col, colNr) => {
      if (/\d/.test(col)) {
        if (nrMem === undefined) {
          nrMem = new Point();
        }
        nrMem.around(input, lineNr, colNr);
        nrMem.digs.push(col);
      } else {
        if (nrMem) {
          collect.push(nrMem);
          nrMem = undefined;
        }
      }
    });
  });
  console.log(
    collect
      .filter((c) => c.on)
      .map((c) => c.agg())
      .reduce((sum, i) => sum + i, 0),
  );
}

function p2(input: string[]) {
  console.log("-- p2 ------------------");
  const collect: Point[] = [];
  let nrMem: Point | undefined;
  input.forEach((line, lineNr) => {
    [...line].forEach((col, colNr) => {
      if (/\d/.test(col)) {
        if (nrMem === undefined) {
          nrMem = new Point();
        }
        nrMem.around(input, lineNr, colNr);
        nrMem.digs.push(col);
      } else {
        if (nrMem) {
          collect.push(nrMem);
          nrMem = undefined;
        }
      }
    });
  });
  const found = collect
    .filter((c) => c.symbolAt?.startsWith("*"))
    .map((c) => ({
      nr: c.agg(),
      symbolAt: c.symbolAt,
    }))
    .reduce(
      (acc, e) => {
        if (acc[e.symbolAt] === undefined) {
          acc[e.symbolAt] = [];
        }
        acc[e.symbolAt].push(e.nr);
        return acc;
      },
      {} as Record<string, number[]>,
    );

  console.log(
    Object.values(found)
      .filter((nrs) => nrs.length === 2)
      .reduce((total, [f, l]) => total + f * l, 0),
  );
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    p2(input);
  } else {
    p1(input);
    p2(input);
  }
}
