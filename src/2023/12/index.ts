////////////////////////////////////////////
//  THIS IS DAY 12                        //
//  https://adventofcode.com/2023/day/12  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Spring {
  conditions: string;
  groups: number[];

  constructor(line: string) {
    const [conditions, groups] = line.split(" ");
    this.conditions = conditions;
    this.groups = groups.split(",").map((g) => +g);
  }

  check() {
    const hm = this.conditions.split(".").filter((c) => c !== "");
    console.log("spl", hm);
    let count = 0;
    if (hm.length < this.groups.length) {
      console.log("SMALL");
      const max = this.groups.map((g) => "#".repeat(g)).join(".");
      console.log(max);
      hm.forEach((h, i) => {
        console.log("sma", this.groups[i], h);
        if (this.groups[i] < h.length) {
          // console.log("ADD", h.length);
          count += h.length;
        } else if (this.groups[i] === h.length) {
          // console.log("ADD", 0);
        }
      });
    } else if (hm.length === this.groups.length) {
      console.log("SAME");
      hm.forEach((h, i) => {
        // console.log("same", this.groups[i], h);
        if (this.groups[i] < h.length) {
          // console.log("ADD", h.length);
          count += h.length;
        } else if (this.groups[i] === h.length) {
          // console.log("ADD", 0);
        }
      });
      if (count === 0) {
        count += 1;
      }
    }
    console.log(this.conditions, this.groups.join(","), "==> total", count);
    // this.groups.forEach((group, idx) => {
    //   const tr = this.conditions.slice(idx, idx + group);

    //   console.log(group, tr);
    // });
  }
}

function p1(input: Spring[]) {
  console.log("-- p1 ------------------");

  console.log(input);
  input.slice(0, 10).map((s) => s.check());
}

function p2(input: Spring[]) {
  console.log("-- p2 ------------------");
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => new Spring(l), "1");
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
