////////////////////////////////////////////
//  THIS IS DAY 14                        //
//  https://adventofcode.com/2023/day/14  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

function sorta(a: string, b: string) {
  return b.charCodeAt(0) - a.charCodeAt(0);
}

class Dish {
  rolling: string[] = [];
  count = 0;

  constructor(readonly lines: string[]) {
    this.rolling = lines;
    this.print("start");
  }

  transpose() {
    this.rolling = [...Array(this.rolling[0].length)].map((v, idx) =>
      this.rolling.map((line) => line[idx]).join(""),
    );
    // this.print("transposed");
    return this;
  }

  print(name: string = "show") {
    console.log("_____________", name);
    this.rolling.forEach((line) => console.log(line));
  }

  reverse() {
    this.rolling = this.rolling.toReversed();

    // this.print("reversed");
    return this;
  }

  cycle() {
    this.transpose()
      .roll()
      .transpose()
      .roll()
      .reverse()
      .transpose()
      .roll()
      .transpose()
      .reverse()
      .transpose()
      .reverse()
      .transpose()
      .roll()
      .transpose()
      .reverse()
      .transpose();
    // this.print(`${++this.count} cycled`);
    return this;
  }

  roll() {
    this.rolling = this.rolling.map((line) =>
      line
        .split("#")
        .flatMap((part) => [...part].toSorted(sorta).join(""))
        .join("#"),
    );
    // this.print("rolled");
    return this;
  }

  score() {
    return this.rolling.map((line) =>
      [...line].map((c, i, all) => (c === "O" ? 1 : 0) * (all.length - i)),
    );
  }

  get() {
    return this.rolling;
  }
}

function p1(input: Dish) {
  console.log("-- p1 ------------------");

  const collect = input
    .transpose()
    .roll()
    .score()
    .flat()
    .reduce((sum, i) => sum + i, 0);
  console.log(collect);
}

function p2(input: Dish) {
  console.log("-- p2 ------------------");

  let collect = input;
  let count = 0;
  const times = 1_000_000_000;
  console.time("calc");
  while (count < times) {
    if (count % 100_000 === 0) {
      console.timeLog("calc");
      console.log(`${count}/${times} --> ${times - count} to go`);
    }
    collect = collect.cycle();
    count++;
  }
  // .score()
  // .flat()
  // .reduce((sum, i) => sum + i, 0);
  // collect.get().forEach((line) => console.log(line));

  console.log(collect.get());
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const dish = new Dish(input);

  if (part === "1") {
    p1(dish);
  } else if (part === "2") {
    p2(dish);
    // p2(read((l) => l, '2'));
  } else {
    p1(dish);
    p2(dish);
  }
}
