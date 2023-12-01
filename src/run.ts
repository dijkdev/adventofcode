import { existsSync } from "fs";
import { Part } from "./util/part";

function run() {
  const YEAR = new Date().getFullYear();
  const DAY = `${process.argv.at(2) ?? new Date().getDate()}`;
  const PART = (process.argv.at(3) ?? "BOTH") as Part;

  const path = import.meta.dir + "/" + YEAR + "/" + DAY;
  if (!existsSync(path)) {
    console.log("Directory does not exist yet, run `bun new-day <daynr>`");
    process.exit(1);
  }

  console.log("Run", YEAR, "day", DAY, "part", PART);
  import(`./${YEAR}/${DAY}`).then((file) => file.go(DAY, PART));
}

run();
