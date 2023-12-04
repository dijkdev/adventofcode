////////////////////////////////////////////
//  THIS IS DAY 2                         //
//  https://adventofcode.com/2023/day/2   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

function p1(input: Game[]) {
  console.log("-- p1 ------------------");

  const max: Grab = { red: 12, green: 13, blue: 14 };

  const out = input
    .filter((game) => game.checkOverallMax(max))
    .reduce((sum, i) => sum + i.gameNr, 0);
  console.log(out);
  return "solution";
}

const colors = ["blue", "red", "green"] as const;

type Grab = Record<"blue" | "red" | "green", number>;

class Game {
  gameNr;
  grabs: Grab[] = [];

  constructor(line: string) {
    const [game, grabs] = line.split(": ");
    this.gameNr = +/^Game\s(\d+)/.exec(game)![1];
    grabs.split("; ").map((grab) => {
      const newGrab: Grab = {
        blue: 0,
        red: 0,
        green: 0,
      };
      colors.forEach((c) => {
        const match = new RegExp(`(\\d+)\\s${c}`, "gi").exec(grab);
        newGrab[c] = match ? +match[1] : 0;
      });
      this.grabs.push(newGrab);
    });
  }

  public checkOverallMax(maxima: Grab): boolean {
    const check = !this.grabs.some(
      (grab) =>
        grab.blue > maxima.blue ||
        grab.green > maxima.green ||
        grab.red > maxima.red,
    );
    // console.log(this.gameNr, check);
    return check;
  }

  public getMinimal(): Grab {
    const minimal: Grab = {
      blue: 0,
      red: 0,
      green: 0,
    };
    this.grabs.forEach((grab) => {
      if (grab.red > 0 && grab.red > minimal.red) {
        minimal.red = grab.red;
      }
      if (grab.green > 0 && grab.green > minimal.green) {
        minimal.green = grab.green;
      }
      if (grab.blue > 0 && grab.blue > minimal.blue) {
        minimal.blue = grab.blue;
      }
    });
    return minimal;
  }
}

function p2(input: Game[]) {
  console.log("-- p2 ------------------");

  const out = input
    .map((game) => game.getMinimal())
    .map((minimal) => minimal.red * minimal.green * minimal.blue)
    .reduce((sum, i) => sum + i, 0);

  console.log(out);
  return "solution";
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => new Game(l), "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    p2(read((l) => new Game(l), "2"));
  } else {
    p1(input);
    p2(read((l) => new Game(l), "2"));
  }
}
