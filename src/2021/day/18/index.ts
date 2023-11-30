import { readFileSync } from 'fs';

const FILE = __dirname + '/initials.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type Pair = { x: Element[], y: Element[], level: number };
type Element = number | Pair;

type SnailFishNr = Pair[];

function isNrPair(input: number[]): boolean {
    return input.length === 2 && Number.isInteger(input[0]) && Number.isInteger(input[1]);
}
function isLeft(input: number[]): boolean {
    return input.length === 2 && Number.isInteger(input[0]) && typeof input[1] === 'object';
}
function isRight(input: number[]): boolean {
    return input.length === 2 && typeof input[0] === 'object' && Number.isInteger(input[1]);
}

// const arr = [];

function findMe(input, level: number = 0): Pair[] {
    // console.log(level, input)
    if (isNrPair(input)) {
        return [{ x: input[0], y: input[1], level }];
    } else if (isLeft(input)) {
        return [{ x: input[0], y: findMe(input[1], level + 1), level }];
    } else if (isRight(input)) {
        return [{ x: findMe(input[0], level + 1), y: input[1], level }];
    } else {
        return input.map((i) => findMe(i, level + 1))
    }
}

function flatten(input: SnailFishNr) {
    console.log(input)
    input.flatMap((i) => {
        console.log(i)
    })

}

class HomeWorkSolver {
    constructor(private snailfishnr: SnailFishNr) { }

    reduce() {

    }

    shouldExplode() {

    }

    explode() {

    }

    shouldSplit() {

    }

    split() {

    }
}


function parseMe(line: string) {
    const first = JSON.parse(line);
    // console.log('first', first);
    const build = findMe(first);
    console.log('build', build.flat());
    console.log('flattie', flatten(build))
}

export function day18(): void {
    const inp: string[] = read().slice(0, 3);
    console.log(inp)
    // console.log(inp.map((i) => i.split('[')))
    inp.forEach((i) => parseMe(i))

    //1
    console.log('Assignment 1');

    // 2
    // console.log('Assignment 2', result.length);
}