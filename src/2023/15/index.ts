////////////////////////////////////////////
//  THIS IS DAY 15                        //
//  https://adventofcode.com/2023/day/15  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

function p1(input: string[]) {
  console.log("-- p1 ------------------");
}

function p2(input: string[]) {
  console.log("-- p2 ------------------");
}

function hash(list: number[], start: number = 0): number {
  const val = ((start + list[0]) * 17) % 256;
  return list.length === 1 ? val : hash(list.slice(1), val);
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const go = input.map((line) => {
    const spl = line.split(",");
    console.log(spl.length);
    return spl.map((str) => [...str].map((c) => c.charCodeAt(0)));
  });
  console.log(
    go.map((gg) => {
      const ggo = gg.map((g) => hash(g));
      return ggo.reduce((sum, i) => sum + i, 0);
    }),
  );
  // console.log(calc([...input[1]].map((c) => c.charCodeAt(0))));

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
