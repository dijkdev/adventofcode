import { readFileSync } from 'fs';

const FILE = __dirname + '/input.txt';

function read(): string[] {
    return readFileSync(FILE, 'utf8').split('\n');
}

type Area = { xmin: number, xmax: number, ymin: number, ymax: number }
type XY = { x: number, y: number }
type Probe = { pos: XY, velo: XY, init: XY, steps: number, apogee: number }

function readTarget(inp: string): Area {
    const get = inp.match(/x=(\d+)\.\.(\d+), y=(-?\d+)\.\.(-?\d+)/);
    return { xmin: +get[1], xmax: +get[2], ymin: +get[3], ymax: +get[4] }
}

class Trench {
    constructor(private target: Area) { }

    isHit(probe: Probe): boolean {
        return probe.pos.x >= this.target.xmin &&
            probe.pos.x <= this.target.xmax &&
            probe.pos.y >= this.target.ymin &&
            probe.pos.y <= this.target.ymax;
    }

    isBeyond(probe: Probe): boolean {
        return probe.pos.x > this.target.xmax || probe.pos.y < this.target.ymin;
    }

    step(probe: Probe): Probe {
        probe.pos.x += probe.velo.x;
        probe.pos.y += probe.velo.y;
        probe.apogee = Math.max(probe.apogee, probe.pos.y);

        if (probe.velo.x > 0) probe.velo.x -= 1
        else if (probe.velo.x < 0) probe.velo.x += 1
        else {/* probe.velo.x === 0, do nothing */ }

        probe.velo.y -= 1;
        probe.steps += 1;
        return probe;
    }

    shoot(probe: Probe) {
        if (this.isHit(probe)) { return probe; }
        if (this.isBeyond(probe)) { /* overshot, ignore */ }
        else { return this.shoot(this.step(probe)); }
    }
}

function prober(x: number, y: number) {
    return { pos: { x: 0, y: 0 }, velo: { x, y }, init: { x, y }, steps: 0, apogee: 0 };
}

function shootALot(trench: Trench, multiplier: number = 2) {
    const hits = [];
    [...Array(multiplier).keys()].forEach((yidx) => {
        [...Array(multiplier).keys()].forEach((xidx) => {
            const goUp = trench.shoot(prober(xidx, yidx));
            if (goUp) hits.push(goUp)
            if (yidx > 0) {
                const goDown = trench.shoot(prober(xidx, -yidx));
                if (goDown) hits.push(goDown)
            }
        })
    })
    return hits;
}

export function day17(): void {
    const inp: string[] = read();
    const target = readTarget(inp[0]);

    const trench = new Trench(target);
    const result = shootALot(trench, 2000);

    const maxApogee = result.reduce((acc, cur) => Math.max(acc, cur.apogee), 0);
    console.log(result.filter((r) => maxApogee === r.apogee));

    //1
    console.log('Assignment 1', maxApogee);

    // 2
    console.log('Assignment 2', result.length);
}