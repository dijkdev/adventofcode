import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type EasyCave = { from: string, to: string }

function findall(caves: EasyCave[], newcave: string = 'start', memory: string = '|start|') {
    if (newcave === 'end') return memory;
    else {
        return caves
            .filter((cave) => newcave === cave.from)
            .filter((cave) => {
                if (cave.to[0] === cave.to[0].toUpperCase()) return true;
                return !memory.includes(`|${cave.to}|`);
            })
            .flatMap((next) => findall(caves, next.to, `${memory}${next.to}|`));
    }
}

function findallmore(caves: EasyCave[], newcave: string = 'start', memory: string = '|start|') {
    if (newcave === 'end') return memory;
    else {
        return caves
            .filter((cave) => newcave === cave.from)
            .filter((cave) => {
                if (cave.to[0] === cave.to[0].toUpperCase()) return true;
                const uniqs = [...new Set(memory.split('|'))].slice(1).filter((c) => c[0] !== c[0].toUpperCase());
                const uniqs2 = memory.split('|').slice(1, -1).filter((c) => c[0] !== c[0].toUpperCase());
                if (uniqs.length === uniqs2.length) return cave.to !== 'start';
                return !memory.includes(`|${cave.to}|`);
            })
            .flatMap((next) => findallmore(caves, next.to, `${memory}${next.to}|`));
    }
}

export function day12(): void {
    const inp: string[] = read();
    const caves = inp.map((i) => i.split('-')).flatMap((i) => [{ from: i[0], to: i[1] }, { from: i[1], to: i[0] }]);
    // 1
    console.log('Assignment 1', findall(caves).length);

    // 2
    console.log('Assignment 2', findallmore(caves).length);
}