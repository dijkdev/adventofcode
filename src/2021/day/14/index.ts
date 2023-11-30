import { readFileSync } from 'fs';

const FILE = __dirname + '/test.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type Rule = { pair: string, insert: string };

function readRules(lines: string[]): Rule[] {
    return lines.map((line) => line.split(' -> ')).map(([pair, insert]) => ({ pair, insert }));
}

function makeReg(rules: Rule[]): RegExp {
    const bigreg = rules.map((rule) => rule.pair).join('|');
    return new RegExp(`(?=(${bigreg}))`, 'g');
}

function applyStep(polymer: string, rules: Rule[], reg: RegExp) {
    return [...polymer.matchAll(reg)]
        .map((match) => ({ insert: rules.find((rule) => rule.pair === match[1]).insert, idx: match.index + 1 }))
        .reduce((acc, match, idx) => acc.slice(0, match.idx + idx) + match.insert + acc.slice(match.idx + idx), polymer);
}

function countRules(polymer: string, rules: Rule[]) {
    const strarr = [];
    for (let i = 0; i < polymer.length - 1; i++) {
        strarr.push(polymer.slice(i, i + 2))
    }
    console.log(strarr)

    const counter = new Map<string, number>();
    strarr.forEach((p) => {
        if (!counter.has(p)) counter.set(p, 0);
        counter.set(p, counter.get(p) + 1);
    })
    console.log(counter)
    // console.log(uses)
}

function outcome(polymer: string) {
    const counter = new Map<string, number>();
    [...polymer].forEach((p) => {
        if (!counter.has(p)) counter.set(p, 0);
        counter.set(p, counter.get(p) + 1);
    })
    const max = [...counter.entries()].find(([_, count]) => count === Math.max(...counter.values()));
    const min = [...counter.entries()].find(([_, count]) => count === Math.min(...counter.values()));
    console.log(min, max, max[1] - min[1])
    return max[1] - min[1];
}

export function day14(): void {
    const inp: string[] = read();

    const polymerStart = inp.at(0);
    const rules = readRules(inp.slice(2));
    const rulesReg = makeReg(rules);

    // 1
    // console.time('ass1');
    // const result = [...Array(10).keys()].reduce((acc, step) => {
    //     const afterstep = applyStep(acc, rules, rulesReg);
    //     console.timeLog('ass1', step + 1, afterstep.length)
    //     return afterstep;
    // }, polymerStart);
    // console.log('Assignment 1', outcome(result));
    // console.timeEnd('ass1')
    // console.log(`The script uses approximately ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`);

    // 2
    console.time('ass2');
    const result = [...Array(5).keys()].reduce((acc, step) => {
        // countRules(acc, rules);
        // return acc;
        const afterstep = applyStep(acc, rules, rulesReg);
        console.timeLog('ass2', step + 1, afterstep.length)
        return afterstep;
    }, polymerStart);

    console.log(result);
    countRules(result, rules);
    console.log('Assignment 2', outcome(result));
    console.timeEnd('ass2')
    console.log(`The script uses approximately ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`);
}