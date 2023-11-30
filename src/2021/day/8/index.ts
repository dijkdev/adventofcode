import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type Input = { pattern: string[], output: string[] }

function parseInput(lines: string[]): Input[] {
    return lines.map((line) => {
        const current = line.split(' | ');
        return { pattern: current[0].split(' '), output: current[1].split(' ') };
    })
}

const UNIQUES = {
    1: 2,
    4: 4,
    7: 3,
    8: 7
}

const PATTERNS = {
    0: '012456',
    1: '25',
    2: '02346',
    3: '02356',
    4: '1235',
    5: '01356',
    6: '013456',
    7: '025',
    8: '0123456',
    9: '012356',
}

class Display {
    private configs: string[][] = new Array();
    private scores: number[];

    constructor(private pattern: string[]) {
        this.addOne();
        this.addSeven();
        this.addfour();
        this.addEight();
        this.scores = Array(this.configs.length).fill(0);
        pattern.forEach((p) => this.findBest(p));
    }

    addOne() {
        const found = this.pattern.find((p) => p.length === UNIQUES[1])
        if (found) {
            const o1 = Array(7).fill('');
            o1[2] = found[0];
            o1[5] = found[1];
            const o2 = Array(7).fill('');
            o2[2] = found[1];
            o2[5] = found[0];
            this.configs.push(...[o1, o2]);;
        }
    }
    addfour() {
        const found = this.pattern.find((p) => p.length === UNIQUES[4])
        if (found) {
            const lookfor = [...found].filter((f) => !this.configs[0].filter(Boolean).includes(f));
            const newCfgs = this.configs.flatMap((c) => {
                const first = [...c];
                const sec = [...c]
                first[1] = lookfor[0];
                first[3] = lookfor[1];
                sec[1] = lookfor[1];
                sec[3] = lookfor[0];
                return [first, sec];
            });
            this.configs = newCfgs;
        }
    }
    addSeven() {
        const found = this.pattern.find((p) => p.length === UNIQUES[7])
        if (found) {
            this.configs.forEach((c) => {
                c[0] = [...found].find((f) => !c.filter(Boolean).includes(f));
            })
        }
    }
    addEight() {
        const found = this.pattern.find((p) => p.length === UNIQUES[8])
        if (found) {
            const lookfor = [...found].filter((f) => !this.configs[0].filter(Boolean).includes(f));

            const newCfgs = this.configs.flatMap((c) => {
                const first = [...c];
                const sec = [...c]
                first[4] = lookfor[0];
                first[6] = lookfor[1];
                sec[4] = lookfor[1];
                sec[6] = lookfor[0];
                return [first, sec];
            });
            this.configs = newCfgs;
        }
    }

    private findBest(input: string): void {
        this.configs.forEach((cfg, idx) => {
            const b = [...input].map((i) => cfg.indexOf(i)).filter((i) => i >= 0).sort();
            const valid = Object.entries(PATTERNS).find(([_, v]) => v === b.join(''));
            if (valid) this.scores[idx] += 1;
        })
    }

    decode(codes: string[]) {
        const bestCfg = this.configs[this.scores.indexOf(Math.max(...this.scores))]
        return codes.map((code) => {
            const b = [...code].map((i) => bestCfg.indexOf(i)).sort();
            return Object.entries(PATTERNS).find(([_, v]) => v === b.join(''))[0];
        }).join('');
    }
}

export function day8(): void {
    const inp = read();
    const input = parseInput(inp);
    // 1
    const output = input.map((inp) => inp.output).flatMap((outp) => outp.filter((o) => Object.values(UNIQUES).includes(o.length)));
    console.log('Assignment 1', output.length);
    // 2
    const result = input.reduce((acc, i) => {
        const dis = new Display(i.pattern);
        const decoded = dis.decode(i.output);
        return acc + +decoded;
    }, 0);
    console.log('Assignment 2', result);
}