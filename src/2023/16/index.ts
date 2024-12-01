////////////////////////////////////////////
//  THIS IS DAY 16                        //
//  https://adventofcode.com/2023/day/16  //

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

class Contraption {
  points: Point[][] = [];
  constructor() {}

  addLine(line: string) {
    const y = this.points.length;
    const aha = [...line].map((s, idx) => new Point(idx, y, s));
    this.points.push(aha);
  }

  start() {}

  next(point: Point, last: Point): Point[] {
    if (point.s === ".") {
      return [this.nextP(point, last)];
    } else if (point.s === "-") {
    } else if (point.s === "|") {
    } else if (point.s === "\\") {
    } else if (point.s === "/") {
    }
    return [];
  }

  nextP(active: Point, last: Point) {
    if (active.x < this.points.length && last.x < active.x) {
      return this.points[active.x + 1][active.y];
    }
    if (active.x > 0 && last.x < active.x) {
      return this.points[active.x - 1][active.y];
    }
    if (active.y < this.points[0].length && last.y < active.y) {
      return this.points[active.x][active.y + 1];
    }
    if (active.y > 0 && last.y < active.y) {
      return this.points[active.x][active.y - 1];
    }
    throw "Not possible";
  }
}

function p1(input: Contraption) {
  console.log("-- p1 ------------------");

  console.log(input);
}

function p2(input: string[]) {
  console.log("-- p2 ------------------");
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const con = new Contraption();
  input.forEach((l) => con.addLine(l));

  if (part === "1") {
    p1(con);
  } else if (part === "2") {
    p2(input);
    // p2(read((l) => l, '2'));
  } else {
    p1(con);
    p2(input);
  }
}
