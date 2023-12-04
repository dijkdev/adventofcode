////////////////////////////////////////////
//  THIS IS DAY 4                         //
//  https://adventofcode.com/2023/day/4   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Card {
  cardNr: number = -1;
  drawn: number[] = [];
  winners: number[] = [];
  matches: number[] = [];
  score: number = 0;

  constructor(line: string) {
    const [card, numbers] = line.split(":");
    this.cardNr = +/(\d+)/.exec(card)![0];
    const [drawnNrs, winNrs] = numbers.split("|");
    this.drawn = [...drawnNrs.matchAll(/\s*(\d+)\s*/g)].map(([_, v]) => +v);
    this.winners = [...winNrs.matchAll(/\s*(\d+)\s*/g)].map(([_, v]) => +v);
  }

  play(): this {
    this.matches = this.drawn.filter((d) => this.winners.includes(d));
    if (this.matches.length > 0) {
      this.score = [...Array(this.matches.length - 1)].reduce(
        (total) => total * 2,
        1,
      );
    }
    return this;
  }
}

function p1(input: Card[]) {
  console.log("-- p1 ------------------");

  console.log(input.reduce((sum, c) => sum + c.score, 0));
}

function p2(input: Card[]) {
  console.log("-- p2 ------------------");

  const copies: Record<string, number> = {};
  input.forEach((card) => {
    copies[card.cardNr] = 1;
  });

  input.forEach((card) => {
    [...Array(copies[card.cardNr])].forEach(() => {
      [...Array(card.matches.length)].forEach((_, i) => {
        copies[card.cardNr + i + 1]++;
      });
    });
  });
  console.log(Object.values(copies).reduce((sum, v) => sum + v, 0));
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => new Card(l).play(), "1");
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
