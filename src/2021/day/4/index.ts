import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

const GRIDSIZE = 5;
const OFFSET = 2;

function readGrid(lines: string[], grids) {
    const current = lines.slice(0, GRIDSIZE).map((c) => c.split(' ').filter(Boolean));
    grids.push(current);
    if (lines.length > GRIDSIZE) {
        readGrid(lines.slice(GRIDSIZE + 1), grids)
    }
}

type Entry = { value: number, marked: boolean };

class BingoCard {
    private grid: Entry[][];
    id: number;
    score: number = 0;
    done: boolean = false;

    constructor(input: string[][], id: number = 0) {
        this.id = id;
        this.grid = input.map((row) => row.map((column) => ({ value: +column, marked: false })))
    }

    draw(value: string): boolean {
        const found = this.grid.flat().find((v) => v.value === +value);
        if (found) {
            found.marked = true;
        }
        if (this.hasWon()) {
            this.score = this.sum() * +value;
            this.done = true;
            return true;
        }
        return false;
    }

    private sum() {
        return this.grid.flat().filter((v) => !v.marked).reduce((sum, v) => sum + v.value, 0);
    }

    private hasWon(): boolean {
        const row: Entry[] = this.grid.find((row) => row.every((r) => r.marked));
        if (row) {
            return true;
        }
        let column: Entry[];
        for (let i = 0; i < this.grid.length; i++) {
            const current = this.grid.map((row) => row[i]);
            if (current.every((r) => r.marked)) {
                column = current;
                break;
            }
        }
        if (column) {
            return true;
        }
        return false;
    }

}

export function day4(): void {
    const inp = read();
    const collectedGridInputs = []
    readGrid(inp.slice(OFFSET), collectedGridInputs);
    let grids = collectedGridInputs.map((f, idx) => new BingoCard(f, idx + 1));

    // 1
    console.log('Assignment 1');
    inp[0].split(',').some((d) => {
        const winner = grids.find((g) => g.draw(d));
        if (winner) {
            console.log('first winner:', winner.id, 'score: ', winner.score);
            return true;
        }
    });
    // 2
    console.log('Assignment 2');
    inp[0].split(',').some((d) => {
        const winners = grids.filter((g) => g.draw(d));
        if (winners) {
            if (grids.length > 1) {
                grids = grids.filter((g) => !g.done);
            } else if (grids.length === 1 && winners.length === 1) {
                console.log('last winner:', winners[0].id, 'score: ', winners[0].score);
                return true;
            }
        }
    });
}