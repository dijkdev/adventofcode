import { Engine, SimpleEngine } from "./engine";

export class Submarine {
    private engine: Engine = new Engine();

    move(type: string, units: number): void {
        switch (type) {
            case 'forward':
                this.engine.forward(units);
                break;
            case 'down':
                this.engine.dive(units);
                break;
            case 'up':
                this.engine.surface(units);
                break;
        }
    }

    localize(): number {
        return this.engine.current();
    }
}

export class SimpleSubmarine {
    private engine: SimpleEngine = new SimpleEngine();

    move(type: string, units: number): void {
        switch (type) {
            case 'forward':
                this.engine.forward(units);
                break;
            case 'down':
                this.engine.dive(units);
                break;
            case 'up':
                this.engine.surface(units);
                break;
        }
    }

    localize(): number {
        return this.engine.current();;
    }
}