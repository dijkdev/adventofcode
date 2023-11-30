import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

type Entry = { v: number };
type Point = { x: number, y: number };
type Line = { s: Point, e: Point };

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

function readLineInput(lines: string[]): Line[] {
    return lines.map((line) => {
        const cur = line.split(' -> ').map((entry) => ({ x: +entry.split(',')[0], y: +entry.split(',')[1] }));
        cur.sort((a, b) => a.x == b.x ? a.y - b.y : a.x - b.x);
        return { s: cur[0], e: cur[1] };
    });
}

class Diagram {
    private grid: Entry[][];

    constructor(lines: Line[]) {
        const maxX = lines.map((line) => Math.max(line.s.x, line.e.x)).reduce((acc, cur) => Math.max(acc, cur), 0);
        const maxY = lines.map((line) => Math.max(line.s.y, line.e.y)).reduce((acc, cur) => Math.max(acc, cur), 0);

        const preparedList = new Array(maxY + 1);
        for (let i = 0; i < maxY + 1; i++) {
            preparedList[i] = new Array(maxX + 1);
            for (let j = 0; j < maxX + 1; j++) {
                preparedList[i][j] = { v: 0 };
            }
        }
        this.grid = preparedList;

        lines.forEach((l) => this.add(l));
    }

    private add(line: Line) {
        if (line.s.x === line.e.x) {
            this.grid.slice(line.s.y, line.e.y + 1).map((row) => row[line.s.x]).forEach((v) => { v.v += 1; });
        } else if (line.s.y === line.e.y) {
            const find = this.grid.at(line.s.y);
            find.slice(line.s.x, line.e.x + 1).forEach((v) => { v.v += 1; });
        } else {
            for (let i = line.s.x, j = line.s.y; i < line.e.x + 1; i++) {
                this.grid[j][i].v += 1;
                if (line.s.y > line.e.y) j--;
                else j++;
            }
        }
    }

    count(): number {
        return this.grid.flat().filter((v) => v.v >= 2).length;
    }
}

export function day5(): void {
    const inp = read();
    const lines = readLineInput(inp);

    // 1
    const diagram1 = new Diagram(lines.filter((line) => line.s.x === line.e.x || line.s.y === line.e.y));
    console.log('Assignment 1', diagram1.count());
    // 2
    const diagram2 = new Diagram(lines);
    console.log('Assignment 2', diagram2.count());
}