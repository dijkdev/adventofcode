interface Move {
    forward: (units: number) => void
    dive: (units: number) => void
    surface: (units: number) => void
}

interface Position {
    current: () => number;
}

export class Engine implements Move, Position {
    constructor(private horizontal = 0, private depth = 0, private aim = 0) { }

    forward(units: number): void {
        this.horizontal += units;
        this.depth += (this.aim * units);
    }

    dive(units: number): void {
        this.aim += units;
    }

    surface(units: number): void {
        this.aim -= units;
    }

    current() {
        return this.horizontal * this.depth;
    }
}

export class SimpleEngine implements Move, Position {
    constructor(private horizontal = 0, private depth = 0) { }

    forward(units: number) {
        this.horizontal += units;
    }

    dive(units: number) {
        this.depth += units;
    }

    surface(units: number) {
        const newDepth = this.depth - units;
        this.depth = newDepth > 0 ? newDepth : 0;
    }

    current() {
        return this.horizontal * this.depth;
    }
}