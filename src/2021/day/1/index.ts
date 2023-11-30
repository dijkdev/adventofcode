import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): number[] {
    return readFileSync(FILE, 'utf8').split('\n').map((line) => +line);
}

function findIncreased(nrs: number[]): number {
    return nrs.reduce<number[]>((acc, nr, i, input) => {
        const previous: number = i > 0 ? input[i - 1] as number : -1;
        if (previous > 0 && nr > previous) {
            acc.push(nr);
        }
        return acc;
    }, []).length;
}

function collectWithSum(nrs: number[], collect: number = 3): number[] {
    return nrs
        .reduce<number[][]>((acc, _, i, input) => {
            if (i + collect <= input.length) {
                acc.push(input.slice(i, i + collect));
            }
            return acc;
        }, [])
        .map((collected) => collected.reduce((a, b) => a + b));
}

export function day1(): void {
    const inp = read();
    // 1
    console.log('Assignment 1', findIncreased(inp));
    // 2
    console.log('Assignment 2', findIncreased(collectWithSum(inp)));
}