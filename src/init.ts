import { existsSync, mkdirSync, writeFileSync } from "fs";

function init() {
  const YEAR = new Date().getFullYear();
  const DAY = `${process.argv.at(2) ?? new Date().getDate()}`;

  console.log("INIT", YEAR, "DAY", DAY);

  const path = import.meta.dir + "/" + YEAR + "/" + DAY;
  const srcFile = path + "/" + "index.ts";
  if (existsSync(srcFile)) {
    console.log("File(s) exist already, go ahead");
    process.exit(0);
  }

  if (!existsSync(path)) {
    console.log("Should create dir", path);
    mkdirSync(path, { recursive: true });
  } else {
    console.log("exists, go ahead");
  }

  ["test1.txt", "test2.txt", "input.txt"]
    .map((file) => path + "/" + file)
    .filter((path) => !existsSync(path))
    .forEach((path) => {
      console.log("write file", path);
      writeFileSync(path, "");
    });

  const base = `////////////////////////////////////////////
//  THIS IS DAY ${DAY.padEnd(2, " ")}                        //
//  https://adventofcode.com/${YEAR}/day/${DAY.padEnd(2, " ")}  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

function p1(input: string[]) {


  return "solution";
}

function p2(input: string[]) {


  return "solution";
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, '1');
  console.log("Go day", day, "part", part, '#input', input.length);
  
  if (part === "1") {
    p1(input);
  } else if (part === "2") {
    p2(read((l) => l, '2'));
  } else {
    p1(input);
    p2(read((l) => l, '2'));
  }
}

`;

  writeFileSync(srcFile, base);
}

init();
