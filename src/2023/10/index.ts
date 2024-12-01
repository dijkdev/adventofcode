////////////////////////////////////////////
//  THIS IS DAY 10                        //
//  https://adventofcode.com/2023/day/10  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Point {
  id: string;

  constructor(
    readonly x: number,
    readonly y: number,
    readonly s: string,
  ) {
    // console.log(`At (${x},${y}) is a ${s}`);
    this.id = [s, x, y].join(";");
  }
}

class Diagram {
  lands: Point[][] = [];
  start!: Point;

  addLine(line: string) {
    const y = this.lands.length;
    const aha = [...line].map((s, idx) => new Point(y, idx, s));
    this.lands.push(aha);
  }

  findS() {
    // console.log("lands", this.lands);
    const start = this.lands.flat().find((land) => land.s === "S");
    if (!start) {
      throw Error("no startpoint?");
    }
    this.start = start;
    return start;
  }

  safe(x: number, y: number) {
    return (
      y >= 0 && y < this.lands.length && x >= 0 && x < this.lands[0].length
    );
  }

  next(point: Point, last: Point) {
    // console.log("find next for", point);
    const coors: number[][] = [];
    switch (point.s) {
      case "|":
        coors.push([-1, 0], [+1, 0]);
        break;
      case "-":
        coors.push([0, -1], [0, +1]);
        break;
      case "L":
        coors.push([-1, 0], [0, +1]);
        break;
      case "J":
        coors.push([-1, 0], [0, -1]);
        break;
      case "7":
        coors.push([+1, 0], [0, -1]);
        break;
      case "F":
        coors.push([+1, 0], [0, +1]);
        break;
      case ".":
      default:
    }
    const options = coors
      .filter(([x, y]) => this.safe(point.x + x, point.y + y))
      .map(([x, y]) => this.lands[point.x + x][point.y + y]);
    // console.log(
    //   "Found next 2",
    //   options.map((o) => o.id),
    //   " last should be there",
    //   last.id,
    //   options.some((o) => o.id === last.id),
    // );
    if (options.some((o) => o.id === last.id)) {
      return options.find((n) => n.id !== last.id);
    }
    return undefined;
  }

  finder() {
    const listy: string[] = [];
    const st = [];
    // console.log("START", this.start);
    if (this.start.x > 0) {
      st.push(this.lands[this.start.x - 1][this.start.y]);
    }
    if (this.start.y < this.lands.length) {
      st.push(this.lands[this.start.x][this.start.y + 1]);
    }
    if (this.start.x < this.lands[this.start.x].length) {
      st.push(this.lands[this.start.x + 1][this.start.y]);
    }
    if (this.start.y > 0) {
      st.push(this.lands[this.start.x][this.start.y - 1]);
    }
    const startPoints = st.filter((s) => s.s !== ".");
    // console.log("startpoints", startPoints);
    return startPoints
      .map((sp) => {
        const arr: Point[] = [];
        const end = this.look(sp, this.start, arr);
        // console.log("PATH", arr);
        return arr.indexOf(arr.at(arr.length / 2)!) + 1;
      })
      .filter((f) => f > 0);
  }

  look(start: Point, last: Point, been: Point[], count: number = 0): Point {
    const next = this.next(start, last);
    if (next) {
      been.push(start);
      return this.look(next, start, been, count + 1);
    }
    return start;
  }
}

function p1(input: string[]) {
  console.log("-- p1 ------------------");

  const diagrams: Diagram[] = input.reduce(
    (acc, line) => {
      if (line.length === 0) {
        acc.push(new Diagram());
      } else {
        acc.at(-1)!.addLine(line);
      }
      return acc;
    },
    [new Diagram()] as Diagram[],
  );

  console.log(
    diagrams.map((d) => {
      d.findS();
      return d.finder();
    }),
    // .filter((f, i, ar) => ar.indexOf(f) === i)
    // .at(0),
  );
}

function p2(input: string[]) {
  console.log("-- p2 ------------------");

  const diagrams: Diagram[] = input.reduce(
    (acc, line) => {
      if (line.length === 0) {
        acc.push(new Diagram());
      } else {
        acc.at(-1)!.addLine(line);
      }
      return acc;
    },
    [new Diagram()] as Diagram[],
  );

  console.log(
    diagrams.slice(0, 1).map((d) => {
      d.findS();
      return d.finder();
    }),
  );
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    // p2(input);
    p2(read((l) => l, "2"));
  } else {
    p1(input);
    p2(read((l) => l, "2"));
  }
}
