import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

function isLocalLowest(point: number, adjecents: number[]) {
    if (adjecents.every((a) => a === point)) return false;
    return Math.min(point, ...adjecents) === point;
}

type LowPoint = { hor: number, ver: number, hei: number }

function getLowPoints(heightMap: number[][]) {
    const result: LowPoint[] = [];
    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[i].length; j++) {
            const adjecents = [];
            if (i > 0) adjecents.push(heightMap[i - 1][j])
            if (j > 0) adjecents.push(heightMap[i][j - 1])
            if (j + 1 < heightMap[i].length) adjecents.push(heightMap[i][j + 1])
            if (i + 1 < heightMap.length) adjecents.push(heightMap[i + 1][j])
            if (isLocalLowest(heightMap[i][j], adjecents)) result.push({ hor: j, ver: i, hei: heightMap[i][j] });
        }
    }
    return result;
}

const H_LIMIT = 9;

function findBasins(heightMap: number[][], point: LowPoint, basins: LowPoint[] = []) {
    if (point.hor > 0) {
        const left = { hor: point.hor - 1, ver: point.ver, hei: heightMap[point.ver][point.hor - 1] };
        if (left.hei > point.hei && left.hei < H_LIMIT && !basins.some((b) => JSON.stringify(b) === JSON.stringify(left))) {
            basins.push(left)
            findBasins(heightMap, left, basins)
        }
    }
    if (point.ver > 0) {
        const up = { hor: point.hor, ver: point.ver - 1, hei: heightMap[point.ver - 1][point.hor] };
        if (up.hei > point.hei && up.hei < H_LIMIT && !basins.some((b) => JSON.stringify(b) === JSON.stringify(up))) {
            basins.push(up)
            findBasins(heightMap, up, basins)
        }
    }
    if (point.ver + 1 < heightMap.length) {
        const down = { hor: point.hor, ver: point.ver + 1, hei: heightMap[point.ver + 1][point.hor] };
        if (down.hei > point.hei && down.hei < H_LIMIT && !basins.some((b) => JSON.stringify(b) === JSON.stringify(down))) {
            basins.push(down)
            findBasins(heightMap, down, basins)
        }
    }
    if (point.hor + 1 < heightMap[point.ver].length) {
        const right = { hor: point.hor + 1, ver: point.ver, hei: heightMap[point.ver][point.hor + 1] };
        if (right.hei > point.hei && right.hei < H_LIMIT && !basins.some((b) => JSON.stringify(b) === JSON.stringify(right))) {
            basins.push(right)
            findBasins(heightMap, right, basins)
        }
    }

}

export function day9(): void {
    const inp: number[][] = read().map((l) => [...l].map((i) => +i));
    const lowpoints = getLowPoints(inp);

    // 1
    console.log('Assignment 1', lowpoints.reduce((acc, c) => acc + c.hei + 1, 0));
    // 2
    const result = lowpoints.map((lowp) => {
        const basins = [lowp]
        findBasins(inp, lowp, basins);
        return [...new Set(basins)].length;
    }).sort((a, b) => b - a);
    console.log('Assignment 2', result.slice(0,3).reduce((acc, c) => acc * c));
}