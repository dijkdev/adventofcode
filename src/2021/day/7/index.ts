import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split(',');
}

function alignToSimple(crabs: number[], position: number): number {
    return crabs.map((crab) => Math.abs(crab - position)).reduce((sum, cost) => sum + cost);
}

function alignToIncreasing(crabs: number[], position: number): number {
    return crabs.map((crab) => [...Array(Math.abs(crab - position)).keys()].reduce((sum, c) => sum + c + 1, 0)).reduce((sum, cost) => sum + cost);
}

export function day7(): void {
    const inp = read().map((i) => +i);

    // 1
    const output1 = [...Array(Math.max(...inp)).keys()].map((i) => alignToSimple(inp, i));
    const cheapy1 = Math.min(...output1);
    console.log('Assignment 1', cheapy1, output1.indexOf(cheapy1));
    // 2
    const output2 = [...Array(Math.max(...inp)).keys()].map((i) => alignToIncreasing(inp, i));
    const cheapy2 = Math.min(...output2);
    console.log('Assignment 2', cheapy2, output2.indexOf(cheapy2));
}