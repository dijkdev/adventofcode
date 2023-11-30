import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

function readInstructions(lines: string[]): Instruction[] {
    return lines.slice(lines.indexOf('') + 1).reduce<Instruction[]>((acc, i) => {
        const matchY = i.match(/y=(\d+)/);
        if (matchY) acc.push({ isX: false, value: +matchY[1] })
        const matchX = i.match(/x=(\d+)/);
        if (matchX) acc.push({ isX: true, value: +matchX[1] })
        return acc;
    }, []);
}

type Dot = { v: number };

function makeDotGrid(lines: string[]): Dot[][] {
    const maxX = lines.map((line) => +line.split(',')[0]).reduce((acc, cur) => Math.max(acc, cur), 0);
    const maxY = lines.map((line) => +line.split(',')[1]).reduce((acc, cur) => Math.max(acc, cur), 0);

    const gridder = new Array(maxY + 1);
    for (let i = 0; i < maxY + 1; i++) {
        gridder[i] = new Array(maxX + 1);
        for (let j = 0; j < maxX + 1; j++) {
            gridder[i][j] = { v: 0 };
        }
    }
    lines.map(line => line.split(',').map((s) => +s)).forEach(([x, y]) => { gridder[y][x].v += 1 });
    return gridder;
}

function foldY(dots: Dot[][], foldon: number): Dot[][] {
    const upper: Dot[][] = dots.slice(0, foldon).reverse();
    const folder: Dot[][] = dots.slice(foldon + 1);
    folder.forEach((foldline, idx) => {
        const mergewith = upper[idx];
        if (mergewith) mergewith.forEach((m, i) => { m.v += foldline[i].v });
    })
    return upper.reverse();
}

function foldX(dots: Dot[][], foldon: number): Dot[][] {
    const left: Dot[][] = dots.map((line) => line.slice(0, foldon));
    const folder: Dot[][] = dots.map((line) => line.slice(foldon + 1).reverse());
    folder.forEach((foldline, idx) => {
        const mergewith = left[idx];
        if (mergewith) mergewith.forEach((m, i) => { m.v += foldline[i].v });
    });
    return left;
}

type Instruction = { isX: boolean, value: number }

function runInstructions(grid: Dot[][], instructions: Instruction[]) {
    return instructions.reduce((acc, instr) => instr.isX ? foldX(acc, instr.value) : foldY(acc, instr.value), grid);
}

function beautyPrint(dots: Dot[][]): void {
    console.log(dots.map((r) => r.map((dot) => dot.v > 0 ? '🎅' : '🎄').join('')).join('\n'));
}

export function day13(): void {
    const inp: string[] = read();
    const grid = makeDotGrid(inp.slice(0, inp.indexOf('')));
    const instructions: Instruction[] = readInstructions(inp);

    // 1
    const result1 = runInstructions(grid, instructions.slice(0, 1));
    console.log('Assignment 1', result1.flat().filter((f) => f.v > 0).length);

    // 2
    const result2 = runInstructions(grid, instructions);
    beautyPrint(result2);
    console.log('Assignment 2', result2.flat().filter((f) => f.v > 0).length);
}