////////////////////////////////////////////
//  THIS IS DAY 7                         //
//  https://adventofcode.com/2023/day/7   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

const cardRanks = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const cardsRanksJ = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

function cardSort(a: string, b: string) {
  return cardRanks.indexOf(a) - cardRanks.indexOf(b);
}
function cardSortJ(a: string, b: string) {
  return cardsRanksJ.indexOf(a) - cardsRanksJ.indexOf(b);
}

class Camel {
  readonly hand: string;
  jHand: string = "";
  sHand!: Record<string, number>;
  readonly bid: number;
  score: number = 0;
  private joker: boolean = false;

  constructor(line: string) {
    const [hand, bid] = line.split(" ");
    this.hand = hand;
    this.bid = +bid;
    this.calculateHand();
  }

  private calculateHand() {
    let hand = this.hand;
    if (this.joker) {
      hand = this.jHand;
    }
    this.sHand = [...hand].reduce(
      (grps, card) => {
        if (grps[card] === undefined) {
          grps[card] = 0;
        }
        grps[card]++;
        return grps;
      },
      {} as Record<string, number>,
    );
  }

  enableJoker() {
    this.joker = true;
    const joke = this.sHand["J"];
    if (joke) {
      if (joke === 5) {
        this.jHand = this.hand.replaceAll("J", "A");
      } else {
        const most = Object.entries(this.sHand)
          .filter(([card]) => card !== "J")
          .sort(([ac, an], [bc, bn]) =>
            bn === an ? cardSortJ(ac, bc) : bn - an,
          )
          .at(0); // Get best card
        if (most) {
          this.jHand = this.hand.replaceAll("J", most![0]); // replace J by best card
        }
      }
    } else {
      this.jHand = this.hand;
    }
    this.calculateHand();
    return this;
  }

  private draw() {
    return Object.entries(this.sHand)
      .sort(([ac, an], [bc, bn]) => {
        if (an === bn) {
          return this.joker ? cardSortJ(ac, bc) : cardSort(ac, bc);
        }
        return bn - an;
      })
      .map(([card, nr]) => ({ [card]: nr }));
  }

  scoreHand() {
    this.score = this.draw().reduce((score, a) => {
      const [nr] = Object.values(a);
      return score + bonusPoints[nr];
    }, 0);
    return this;
  }
}

const bonusPoints: Record<string, number> = {
  "5": 1000,
  "4": 500,
  "3": 100,
  "2": 20,
  "1": 2,
};

function p1(input: Camel[]) {
  console.log("-- p1 ------------------");

  console.log(
    input
      .map((c) => c.scoreHand())
      .sort((a, b) => {
        if (a.score === b.score) {
          let i = 0;
          let diff = 0;
          do {
            diff = cardSort(b.hand.charAt(i), a.hand.charAt(i));
            i++;
          } while (diff === 0);
          return diff;
        }
        return a.score - b.score;
      })
      .map((c, i) => ({ bid: c.bid, rank: i + 1 }))
      .reduce((total, c) => total + c.rank * c.bid, 0),
  );
}

function p2(input: Camel[]) {
  console.log("-- p2 ------------------");

  console.log(
    input
      .map((c) => c.enableJoker().scoreHand())
      .sort((a, b) => {
        if (a.score === b.score) {
          let i = 0;
          let diff = 0;
          do {
            diff = cardSortJ(b.hand.charAt(i), a.hand.charAt(i));
            i++;
          } while (diff === 0);
          return diff;
        }
        return a.score - b.score;
      })
      .map((c, i) => ({ bid: c.bid, rank: i + 1 }))
      .reduce((total, c) => total + c.rank * c.bid, 0),
  );
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => new Camel(l), "1");
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
