import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

function countNrs(lines: string[]) {
    let result: Map<string, number>[] = [];
    result = lines
        .reduce((acc, line) => {
            [...line].forEach((l, i) => {
                if (!acc.at(i)) acc.push(new Map());
                const charMap: Map<string, number> = acc.at(i);
                if (charMap.has(l)) charMap.set(l, charMap.get(l) + 1);
                else charMap.set(l, 1);
            })
            return acc;
        }, []);
    return result;
}

const max = (acc, cur) => cur[1] >= acc[1] ? cur : acc;
const min = (acc, cur) => cur[1] <= acc[1] ? cur : acc;

function gamma(list: Map<string, number>[]) { return find(list, max); }

function epsilon(list: Map<string, number>[]) { return find(list, min); }

function doit(list: string[], fn, idx: number) {
    const winningAtIdx = verdeling(countNrs(list), fn)[idx];
    return list.filter((f) => f.charAt(idx) === winningAtIdx[0]);
}

function oxygen(input: string[], startIdx: number = 0) {
    const result = doit(input, max, startIdx);
    if (result.length > 1) {
        return oxygen(result, startIdx + 1)
    }
    return +('0b' + result[0]);
}

function co2(input: string[], startIdx: number = 0) {
    const result = doit(input, min, startIdx);
    if (result.length > 1) {
        return co2(result, startIdx + 1)
    }
    return +('0b' + result[0]);
}

function verdeling(list: Map<string, number>[], reduceFn: (acc: [string, number], cur: [string, number]) => [string, number]) {
    const result = list.reduce((acc, current) => {
        const found = [...current.entries()].reduce(reduceFn);
        acc.push(found)
        return acc;
    }, []);
    return result;
}


function find(list: Map<string, number>[], reduceFn: (acc: [string, number], cur: [string, number]) => [string, number]): number {
    return +('0b' + verdeling(list, reduceFn).map(([k]) => k).join(''));
}

export function day3(): void {
    const inp = read();
    // 1
    const nrs = countNrs(inp);
    console.log('Assignment 1', gamma(nrs) * epsilon(nrs));
    // 2
    console.log('Assignment 2', oxygen(inp) * co2(inp));
}