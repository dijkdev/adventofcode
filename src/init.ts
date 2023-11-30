import { existsSync, mkdirSync, writeFileSync } from "fs";

function init() {
  const YEAR = new Date().getFullYear();
  const DAY = `${process.argv.at(2) ?? new Date().getDate()}`;

  console.log("INIT", YEAR, "DAY", DAY);

  const path = __dirname + "/" + YEAR + "/" + DAY;
  if (!existsSync(path)) {
    console.log("Should create dir", path);
    mkdirSync(path, { recursive: true });
  } else {
    console.log("exists, go ahead");
  }

  ["test.txt", "input.txt"]
    .map((file) => path + "/" + file)
    .filter((path) => !existsSync(path))
    .forEach((path) => {
      console.log("write file", path);
      writeFileSync(path, "");
    });

  const srcFile = path + "/" + "index.ts";
  const base = `/////////////////////
//  THIS IS DAY ${DAY.padEnd(2, " ")} //

import { Part } from "../../util/part";
import { read } from "../../util/read";

function p1() {
  return "solution";
}

function p2() {
  return "solution";
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l);
  console.log("Go day", day, "part", part, "#input", input.length);

  if (part === "1") {
    p1();
  } else if (part === "2") {
    p2();
  } else {
    p1();
    p2();
  }
}

`;

  //   if (!existsSync(srcFile)) {
  writeFileSync(srcFile, base);
  //   }
}

init();
