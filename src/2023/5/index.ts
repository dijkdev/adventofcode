////////////////////////////////////////////
//  THIS IS DAY 5                         //
//  https://adventofcode.com/2023/day/5   //

import { Part } from "../../util/part";
import { read } from "../../util/read";

class Garden {
  mappers: GardenMap[] = [];
  constructor(readonly seeds: number[]) {}

  lookup(seed: number, from: string = "seed"): number {
    const nextMap = this.mappers.find((map) => map.from === from);
    return nextMap ? this.lookup(nextMap.check(seed), nextMap.to) : seed;
  }

  lookupRev(seed: number, from: string = "location"): number {
    const nextMap = this.mappers.find((map) => map.to === from);
    return nextMap
      ? this.lookupRev(nextMap.checkRev(seed), nextMap.from)
      : seed;
  }

  lowest() {
    return Math.min(...this.seeds.map((seed) => this.lookup(seed)));
  }

  lowestExploded() {
    const extraSeeds = new GardenMap("range-to-seed");
    for (let i = 0; i < this.seeds.length - 1; i += 2) {
      extraSeeds.maps.push({ dest: this.seeds[i], range: this.seeds[i + 1] });
    }
    this.mappers.push(extraSeeds);
    let amount = 0;
    while (true) {
      if (this.lookupRev(amount) < 0) {
        return amount; // found it
      }
      amount++;
    }
  }
}

type GardenMapLine = {
  src?: number;
  dest: number;
  range: number;
};

class GardenMap {
  from: string;
  to: string;
  maps: GardenMapLine[] = [];

  constructor(readonly mapName: string) {
    const [from, to] = mapName.split("-to-");
    this.from = from;
    this.to = to;
  }

  check(lookFor: number) {
    const map = this.maps.find(
      (line) => lookFor >= line.src! && lookFor < line.src! + line.range,
    );
    return map ? map.dest + (lookFor - map.src!) : lookFor;
  }

  checkRev(lookFor: number) {
    const map = this.maps.find(
      (line) => lookFor >= line.dest && lookFor < line.dest + line.range,
    );
    if (map) {
      return map.src === undefined ? -42 : map.src + (lookFor - map.dest);
    }
    return lookFor;
  }
}

function p1(garden: Garden) {
  console.log("-- p1 ------------------");

  console.log(garden.lowest());
}

function p2(garden: Garden) {
  console.log("-- p2 ------------------");

  console.log(garden.lowestExploded());
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const seeds = [...input.shift()!.matchAll(/\s*(\d+)\s*/g)].map(
    ([_, v]) => +v,
  );
  const garden = new Garden(seeds);

  input.forEach((line) => {
    const mapName = line.match(/([\w-]+)\smap:/);
    if (mapName) {
      garden.mappers.push(new GardenMap(mapName[1]));
    }
    const mappers = [...line.matchAll(/\s*(\d+)\s*/g)];
    if (mappers.length > 0) {
      const [dest, src, len] = mappers.map(([_, v]) => +v);
      garden.mappers.at(-1)?.maps.push({ src, dest, range: len });
    }
  });

  if (part === "1") {
    p1(garden);
  } else if (part === "2") {
    p2(garden);
    // p2(read((l) => l, '2'));
  } else {
    p1(garden);
    p2(garden);
  }
}
