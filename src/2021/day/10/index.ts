import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

const ALL_CLOSE = /(\)|\]|\}|\>)/g;
const ALL_CHUNKS = /(\(\)|\[\]|\{\}|\<\>)/g;

function score(char: string): number {
    switch (char) {
        // close
        case ')': return 3;
        case ']': return 57;
        case '}': return 1197;
        case '>': return 25137;
        // open
        case '(': return 1;
        case '[': return 2;
        case '{': return 3;
        case '<': return 4;
    }
}

// corrupts
function naviCorrupts(line: string): number {
    const nrOfValidChunks = [...line.matchAll(ALL_CHUNKS)].length;
    const result = line.replace(ALL_CHUNKS, '');
    if (nrOfValidChunks > 0) {
        return naviCorrupts(result);
    } else {
        const firstClose = [...line.matchAll(ALL_CLOSE)].at(0);
        if (firstClose) return score([...line].slice(firstClose.index, firstClose.index + 1).at(0));
        return 0;
    }
}

// incompletes
function naviImcompletes(line: string): number {
    const nrOfValidChunks = [...line.matchAll(ALL_CHUNKS)].length;
    const result = line.replace(ALL_CHUNKS, '');
    if (nrOfValidChunks > 0) {
        return naviImcompletes(result);
    } else {
        const firstClose = [...line.matchAll(ALL_CLOSE)].at(0);
        if (firstClose) return 0;
        return line.split('').reverse().reduce((acc, c) => acc * 5 + score(c), 0);
    }
}

export function day10(): void {
    const inp: string[] = read();

    // 1
    console.log('Assignment 1', inp.reduce((acc, c) => acc + naviCorrupts(c), 0));

    // 2
    const result = inp.map((i) => naviImcompletes(i)).filter((i) => i > 0).sort((a, b) => a - b);
    console.log('Assignment 2', result.at((result.length - 1) / 2));
}