////////////////////////////////////////////
//  THIS IS DAY 6                         //
//  https://adventofcode.com/2023/day/6   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Game {
  constructor(
    readonly time: number,
    readonly distance: number,
  ) {}

  breakers() {
    return Array.from({ length: this.time }, (_, i) => i).reduce<number[]>(
      (recs, tHold) => {
        const distance = (this.time - tHold) * tHold;
        if (distance > this.distance) {
          recs.push(distance);
        }
        return recs;
      },
      [],
    );
  }
}

function p1(input: Game[]) {
  console.log("-- p1 ------------------");

  console.log(
    input.map((g) => g.breakers().length).reduce((power, i) => power * i),
  );
}

function p2(input: Game[]) {
  console.log("-- p2 ------------------");

  const ultraTime = +input.map((g) => g.time).join("");
  const ultraDistance = +input.map((g) => g.distance).join("");

  const ultraGame = new Game(ultraTime, ultraDistance);
  console.log(ultraGame.breakers().length);
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const times = [...input[0].matchAll(/\s*(\d+)\s*/g)].map(([_, v]) => +v);
  const distances = [...input[1].matchAll(/\s*(\d+)\s*/g)].map(([_, v]) => +v);
  const games: Game[] = times.map((time, i) => new Game(time, distances[i]));

  if (part === "1") {
    p1(games);
  } else if (part === "2") {
    p2(games);
    // p2(read((l) => l, '2'));
  } else {
    p1(games);
    p2(games);
  }
}
