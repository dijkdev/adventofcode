import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type Octo = { id: string, level: number, ads: Octo[] };

function getAdjecents(octoField: Octo[][], v: number, h: number): Octo[] {
    const adjecents = [];
    if (v > 0) {
        adjecents.push(octoField[v - 1][h]);
        if (h > 0) adjecents.push(octoField[v - 1][h - 1]);
        if (h + 1 < octoField[v].length) adjecents.push(octoField[v - 1][h + 1]);
    }
    if (h > 0) adjecents.push(octoField[v][h - 1]);
    if (h + 1 < octoField[v].length) adjecents.push(octoField[v][h + 1]);
    if (v + 1 < octoField.length) {
        adjecents.push(octoField[v + 1][h]);
        if (h > 0) adjecents.push(octoField[v + 1][h - 1]);
        if (h + 1 < octoField[v].length) adjecents.push(octoField[v + 1][h + 1]);
    }
    return adjecents;
}

function makeGrid(inp: string[]): Octo[][] {
    const octoField: Octo[][] = inp.map((column, vIdx) => [...column].map((row, hIdx) => ({ id: `${vIdx}${hIdx}`, level: +row, ads: [] })));
    octoField.forEach((column, vIdx) => column.forEach((row, hIdx) => {
        row.ads = getAdjecents(octoField, vIdx, hIdx);
    }))
    return octoField;
}

function octostep(octoField: Octo[][], flashedOctos: string[] = []) {
    const flashing = octoField.flat().filter((octo) => octo.level > 9);
    if (flashing.length > 0) {
        const newFlashers = flashing.filter((flash) => !flashedOctos.some((f) => f === flash.id));
        newFlashers.forEach((octo) => {
            flashedOctos.push(octo.id);
            octo.ads.forEach((ad) => ad.level += 1);
        });
        if (newFlashers.length > 0) octostep(octoField, flashedOctos);
        else flashing.forEach((octo) => octo.level = 0);
    }
    return flashedOctos.length;
}

export function day11(): void {
    const inp: string[] = read();

    // 1
    const grid = makeGrid(inp);
    const total = [...Array(100).keys()].reduce((acc) => {
        grid.flat().forEach((octo) => octo.level++);
        return acc + octostep(grid);
    }, 0);
    console.log('Assignment 1', total);

    // 2
    const extraOctoGrid = makeGrid(inp);
    let octocount = 0;
    while (!(octostep(extraOctoGrid) === 100)) {
        extraOctoGrid.flat().forEach((octo) => octo.level++);
        octocount++;
    }
    console.log('Assignment 2', octocount);
}