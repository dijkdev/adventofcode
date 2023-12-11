////////////////////////////////////////////
//  THIS IS DAY 11                        //
//  https://adventofcode.com/2023/day/11  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Point {
  id: string;

  constructor(
    readonly x: number,
    readonly y: number,
    readonly s: string,
  ) {
    this.id = [x, y].join(",");
  }
}

class Sky {
  stars: Point[][] = [];
  rowsE: number[] = [];
  colsE: number[] = [];
  galaxies: Point[] = [];

  addLine(line: string) {
    const y = this.stars.length;
    const aha = [...line].map((s, idx) => new Point(idx, y, s));
    this.stars.push(aha);
  }

  prepare() {
    this.stars.forEach((row, r) => {
      if (row.every((rc) => rc.s === ".")) {
        this.rowsE.push(r);
      }
      const buildCol: Point[] = [];
      row.forEach((col, c) => {
        buildCol.push(this.stars[c][r]);
        if (col.s === "#") {
          this.galaxies.push(col);
        }
      });
      if (buildCol.every((rc) => rc.s === ".")) {
        this.colsE.push(r);
      }
    });
  }

  check(factor: number = 1) {
    const correctedFactor = factor - 1;
    return this.galaxies
      .flatMap((from, idx, all) => {
        return all
          .slice(idx)
          .filter((to) => to.id !== from.id)
          .map((to) => {
            const dist = Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
            const rr = this.rowsE.filter(
              (row) =>
                (from.y < row && to.y > row) || (to.y < row && from.y > row),
            ).length;
            const cc = this.colsE.filter(
              (col) =>
                (from.x < col && to.x > col) || (to.x < col && from.x > col),
            ).length;
            return dist + rr * correctedFactor + cc * correctedFactor;
          });
      })
      .reduce((sum, i) => sum + i);
  }
}

function p1(input: Sky) {
  console.log("-- p1 ------------------");

  console.log(input.check(2));
}

function p2(input: Sky) {
  console.log("-- p2 ------------------");

  console.log(input.check(1_000_000));
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const sky = new Sky();
  input.forEach((l) => sky.addLine(l));

  sky.prepare();

  if (part === "1") {
    p1(sky);
  } else if (part === "2") {
    p2(sky);
    // p2(read((l) => l, '2'));
  } else {
    p1(sky);
    p2(sky);
  }
}
