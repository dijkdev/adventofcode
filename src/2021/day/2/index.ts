import { readFileSync } from 'fs';
import { SimpleSubmarine, Submarine } from './submarine';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

function moveSub(lines: string[], sub: Submarine | SimpleSubmarine) {
    lines
        .map((line) => ({
            command: line.split(' ')[0],
            units: +line.split(' ')[1]
        }))
        .forEach(({ command, units }) => sub.move(command, units));
    return sub.localize();
}

export function day2(): void {
    const inp = read();
    // 1
    console.log('Assignment 1', moveSub(inp, new SimpleSubmarine()));
    // 2
    console.log('Assignment 2', moveSub(inp, new Submarine()));
}
