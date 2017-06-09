import {NoMoreLivesError} from "./errors";

export default class Lives {
    constructor(private lives: number) {
        if (lives < 1) {
            throw new Error('Lives count must be greater than 0');
        }
    }

    get value(): number {
        return this.lives;
    }

    decrease() {
        if (this.lives === 0) {
            throw new NoMoreLivesError();
        }

        this.lives--;
    }

    increase() {
        this.lives++;
    }

    hasAnyLeft(): boolean {
        return this.lives > 0;
    }

    toString(): string {
        return this.lives.toString();
    }
}
