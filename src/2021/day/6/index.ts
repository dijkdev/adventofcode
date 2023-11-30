import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split(',');
}

type Fish = number;
const MAX_DAYS_1 = 80;

function makeFish(fish: Fish[], day: number = 0) {
    if (day < MAX_DAYS_1) {
        let makeNewFishes = 0;
        const newFish = fish.map((f) => {
            if (f > 0) return f - 1;
            else {
                makeNewFishes++;
                return 6;
            }
        }).concat(Array(makeNewFishes).fill(8));
        return makeFish(newFish, day + 1);
    } else {
        console.log('Finally, after ', `${day}`.padStart(3), ' day(s): ', `${fish.length}`.padStart(5), ' fish');
    }
}

// remaining days of fish-life and multiplier
type SuperFish = { d: number, m: number };
const MAX_DAYS_2 = 256;

function makeMoreFish(fish: SuperFish[], day: number = 0) {
    if (day < MAX_DAYS_2) {
        let makeNewFishes = 0;
        fish.forEach((f) => {
            if (f.d > 0) return f.d -= 1;
            else {
                makeNewFishes += f.m;
                return f.d = 6;
            }
        })
        if (makeNewFishes > 0) fish.push({ d: 8, m: makeNewFishes });
        return makeMoreFish(fish, day + 1);
    } else {
        console.log('Finally, after ', `${day}`.padStart(3), ' day(s): ', fish.reduce((acc, f) => acc + f.m, 0), ' fish', `${fish.length}`.padStart(5), 'entries');
    }
}

export function day6(): void {
    const inp = read().map((i) => +i);

    // 1
    console.log('Assignment 1');
    console.time('ass1');
    makeFish(inp);
    console.timeEnd('ass1')
    console.log(`The script uses approximately ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`);
    // 2
    // TRY WITH MULTIPLIER for each entry in list (instead of adding every value)
    console.log('Assignment 2');
    console.time('ass2');
    makeMoreFish(inp.map((i) => ({ d: i, m: 1 })));
    console.timeEnd('ass2')
    console.log(`The script uses approximately ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`);
}