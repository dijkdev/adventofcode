import { readFileSync } from "fs";

export function read<T>(mapper: (line: string) => T, part: string = "1"): T[] {
  const YEAR = new Date().getFullYear();
  const DAY = process.argv.at(2) ?? new Date().getDate();
  const env = process.env.ENV;
  const FILE = `src/${YEAR}/${DAY}/${
    env === "production" ? "input.txt" : `test${part}.txt`
  }`;
  console.log("read", FILE);
  const out: string[] = readFileSync(FILE, "utf8").split("\n");
  if (env === "development") {
    out.forEach((o) => console.log(o));
  }
  if (mapper) {
    return out.map(mapper);
  }
  return out as T[];
}
