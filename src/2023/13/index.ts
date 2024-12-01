////////////////////////////////////////////
//  THIS IS DAY 13                        //
//  https://adventofcode.com/2023/day/13  //

import { Part } from "../../util/part";
import { read } from "../../util/read";

interface Out {
  hori: Result;
  verti: Result;
}

interface Result {
  leftLen: number;
  matchLen: number;
  match: number;
}

class Pattern {
  lines: string[] = [];

  constructor() {}

  addLine(line: string) {
    this.lines.push(line);
  }

  tryThemAll() {
    const o = this.lines
      .map((line, lidx) => {
        return [...Array(this.lines[0].length)]
          .map((v, idx) => {
            const newLines = this.lines.map((tLine, tIdx) => {
              if (tIdx === lidx) {
                return [...tLine]
                  .map((c, cIdx) => {
                    if (cIdx === idx) {
                      return c === "." ? "#" : ".";
                    }
                    return c;
                  })
                  .join("");
              }
              return tLine;
            });
            return {
              hori: this.hori(newLines),
              verti: this.verti(newLines),
            };
          })
          .filter(({ hori, verti }) => hori.leftLen > 0 || verti.leftLen > 0);
      })
      .filter((e) => e.length > 0)
      .flat();

    // if (o.length > 0) {
    //   console.log("HM", o);
    // }
    return o;
  }

  hori(lines: string[] = this.lines): Result {
    const matches = lines.reduce((acc, line, idx, all) => {
      if (idx < all.length && line.includes(all[idx + 1])) {
        acc.push(idx);
      }
      return acc;
    }, [] as number[]);
    const checks = matches
      .map((match) => {
        const half1 = lines.slice(0, match + 1).toReversed();
        const half2 = lines.slice(match + 1);

        const [shortest, longest] = [half1, half2]
          .sort((a, b) => a.length - b.length)
          .map((h) => h.join(""));
        if (longest.includes(shortest)) {
          return {
            leftLen: half1.length,
            matchLen: shortest.length / lines[0].length,
            match,
          };
        }
        return {
          leftLen: 0,
          matchLen: 0,
          match,
        };
      })
      .sort((a, b) => b.matchLen - a.matchLen);
    return checks.length > 0
      ? checks[0]
      : {
          leftLen: 0,
          matchLen: 0,
          match: -1,
        };
  }

  verti(lines: string[] = this.lines): Result {
    const transposed = [...Array(lines[0].length)].map((v, idx) => {
      return lines.map((line) => line[idx]).join("");
    });
    return this.hori(transposed);
  }
}

function p1(input: Pattern[]) {
  console.log("-- p1 ------------------");

  const out = input
    .map((p) => {
      // const result = { hori: p.hori().leftLen, verti: p.verti().leftLen };
      const result = { hori: p.hori(), verti: p.verti() };
      // console.log(result);
      return { hori: result.hori.leftLen, verti: result.verti.leftLen };
    })
    .reduce((sum, { hori, verti }) => sum + hori * 100 + verti, 0);
  console.log(out);
}

function p2(input: Pattern[]) {
  console.log("-- p2 ------------------");

  const out = input
    .map((p, i) => {
      // console.log(i, "GO");
      const p1Result = { hori: p.hori(), verti: p.verti() };
      // console.log(i, { p1Result });
      const p2Result = p.tryThemAll();
      // console.log(i, { p2Result });
      const findCorrect = p2Result
        .filter(({ hori, verti }) => hori.match > 0 || verti.match > 0)
        .filter(({ hori, verti }) => {
          let horiB =
            p1Result.hori.leftLen === 0
              ? hori.leftLen > 0
              : hori.match !== p1Result.hori.match;
          let vertiB =
            p1Result.verti.leftLen === 0
              ? verti.leftLen > 0
              : verti.match !== p1Result.verti.match;

          return horiB || vertiB;
        });
      // console.log("hori", findCorrect);
      return { p1Result, p2Result: findCorrect[0] };
    })
    .filter(({ p2Result }) => p2Result !== undefined)
    .reduce((sum, { p1Result, p2Result }) => {
      // console.log({ p1Result, p2Result });
      if (
        p1Result.hori.leftLen === 0
          ? p2Result.hori.leftLen > 0
          : p2Result.hori.match !== p1Result.hori.match
      ) {
        return sum + p2Result.hori.leftLen * 100;
      } else if (
        p1Result.verti.leftLen === 0
          ? p2Result.verti.leftLen > 0
          : p2Result.verti.match !== p1Result.verti.match
      ) {
        return sum + p2Result.verti.leftLen;
      }
      return sum + p2Result.hori.leftLen * 100 + p2Result.verti.leftLen;
    }, 0);
  console.log("final", out);
  // tried 24959
}

export function go(day: number, part: Part = "BOTH") {
  const input = read((l) => l, "1");
  console.log("Go day", day, "part", part, "#input", input.length);

  const patterns: Pattern[] = input.reduce(
    (acc, line) => {
      if (line.length === 0) {
        acc.push(new Pattern());
      } else {
        acc.at(-1)!.addLine(line);
      }
      return acc;
    },
    [new Pattern()] as Pattern[],
  );

  if (part === "1") {
    p1(patterns);
  } else if (part === "2") {
    p2(patterns);
    // p2(read((l) => l, '2'));
  } else {
    p1(patterns);
    p2(patterns);
  }
}
