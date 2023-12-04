/////////////////////
//  THIS IS DAY 1  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

function p1(input: string[]) {
  console.log("-- p1 ------------------");

  const out = input
    .map((line) => {
      const r = [...line].filter((s) => Number.isInteger(+s));
      return `${r.at(0)}${r.at(-1)}`;
    })
    .map((s) => +s)
    .reduce((sum, i) => sum + i, 0);
  console.log(out);
}

function p2(input: string[]) {
  console.log("-- p2 ------------------");

  const nrs: Record<string, string> = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };
  const re = new RegExp(Object.keys(nrs).join("|"), "gi");
  const replacer = (line: string) => line.replace(re, (match) => nrs[match]);
  const out = input.map(replacer).map(replacer);
  if (out.filter((o) => re.test(o)).length > 0) {
    console.log("still there, use more replacers!");
  }

  p1(out);
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    p2(read((l) => l, "2"));
  } else {
    p1(input);
    p2(read((l) => l, "2"));
  }
}
