export default class Level {
    public readonly onChange: Phaser.Signal;
    private level = 1;

    constructor(private max: number) {
        this.onChange = new Phaser.Signal();
    }

    get(): number {
        return this.level;
    }

    next() {
        if (this.level < this.max) {
            this.changeTo(this.level + 1);
        }
    }

    reset() {
        this.changeTo(1);
        this.onChange.dispatch(this);
    }

    toString(): string {
        return this.level.toString();
    }

    private changeTo(value: number) {
        this.level = value;
        this.onChange.dispatch(this);
    }
}
