export default class Level {
    public static readonly MAX = 16;

    public readonly onChange: Phaser.Signal;
    private level = 1;

    constructor() {
        this.onChange = new Phaser.Signal();
    }

    public get() {
        return this.level;
    }

    public next() {
        if (this.level < Level.MAX) {
            this.changeTo(this.level + 1);
        }
    }

    public reset() {
        this.changeTo(1);
        this.onChange.dispatch(this);
    }

    private changeTo(value: number) {
        this.level = value;
        this.onChange.dispatch(this);
    }
}
