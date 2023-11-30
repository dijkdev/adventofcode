import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type Pos = { id: string, v: number, risk: number };

function makeCaveGrid(lines: string[]): Pos[][] {
    return lines.map((line, vIdx) => [...line].map((column, hIdx) => ({ id: `${vIdx},${hIdx}`, v: +column, risk: +column })));
}

function makeRiskFromLeftUp(grid: Pos[][]) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const adjecents = [];
            if (i > 0) adjecents.push(grid[i - 1][j]);
            if (j > 0) adjecents.push(grid[i][j - 1]);
            let cost: number;
            if (adjecents.length === 0) cost = 0;
            else if (adjecents.length === 1) cost = adjecents[0].risk;
            else cost = Math.min(...adjecents.map((ad) => ad.risk));
            grid[i][j].risk = cost + grid[i][j].v;
        }
    }
    return grid;
}

function makeRiskFromRightBottom(grid: Pos[][]) {
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[i].length - 1; j >= 0; j--) {
            const adjecents = [];
            if (j + 1 < grid[i].length) adjecents.push(grid[i][j + 1]);
            if (i + 1 < grid.length) adjecents.push(grid[i + 1][j]);
            grid[i][j].risk = grid[i][j].v + (adjecents.length > 0 ? Math.min(...adjecents.map((ad) => ad.risk)) : 0);
        }
    }
    return grid;
}


function pretty(grid: Pos[][], field: string = 'v') {
    if (field === 'v') console.log(grid.map((r) => r.map((pos: Pos) => pos[field]).join('')).join('\n'));
    else if (field === 'risk') console.log(grid.map((r) => r.map((pos: Pos) => `${pos[field]}`.padStart(3)).join('|')).join('\n'));
    else if (field === 'all') console.log(grid.map((r) => r.map((pos: Pos) => `${pos.v}:${pos.risk}`.padStart(5)).join('|')).join('\n'));
}

function gridMultiplier(grid: Pos[][], times: number = 4) {
    const originalHeight = grid.length;

    [...Array(times).keys()].forEach((vIdx) => {
        const startAt = vIdx * originalHeight;
        grid.slice(startAt, startAt + originalHeight)
            .map((row) => row.map((c) => ({ ...c, v: c.v === 9 ? 1 : c.v + 1 })))
            .forEach((c) => { grid.push(c); });
    })

    const originalWidth = grid[0].length;
    for (let i = 0; i < grid.length; i++) {
        [...Array(times).keys()].forEach((nr) => {
            const startAt = nr * originalWidth;
            grid[i].push(...grid[i].slice(startAt, startAt + originalWidth).map((c) => ({ ...c, v: c.v === 9 ? 1 : c.v + 1 })));
        })
    }
    console.log(originalHeight, grid.length);
    console.log(originalWidth, grid[0].length);
    return grid;
}



export function day15(): void {
    const inp: string[] = read();

    const grid = makeCaveGrid(inp);

    const multiGrid = gridMultiplier(grid);
    multiGrid[0][0].v = 0;
    multiGrid[0][0].risk = 0;
    const riskGrid = makeRiskFromLeftUp(multiGrid);
    pretty(multiGrid.slice(0, 15).map((r) => r.slice(0, 15)), 'all');
    pretty(multiGrid.slice(-15).map((r) => r.slice(-15)), 'all');
    // pretty(riskGrid, 'risk');

    // const grid2 = makeCaveGrid(inp);
    // const multiGrid2 = gridMultiplier(grid2);
    // multiGrid2.at(-1).at(-1).v = 0;
    // const riskGrid2 = makeRiskFromRightBottom(multiGrid2);
    // console.log('------')
    // pretty(riskGrid2, 'risk');

    //1
    console.log('Assignment 1');
    console.log('from   0,0  ', riskGrid.at(0).at(0), riskGrid.at(-1).at(-1))
    // console.log('from max,max', riskGrid2.at(0).at(0), riskGrid2.at(-1).at(-1), riskGrid2.at(0).at(0).risk - riskGrid2.at(-1).at(-1).v)

    // 402 too high
    // 400 too high

    // 398 correct
    // 395 too low
    // 2
    // console.log('Assignment 2');
    // 2824 too high
    // 2822 too high
    // 2819 too high
    // 2818 wrong
    // 2816 wrong
    // 2815 wrong
    // 2810 wrong
}