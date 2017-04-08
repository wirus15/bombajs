export default class Level {
    public readonly onChange: Phaser.Signal;
    private level = 1;

    constructor(private max: number) {
        this.onChange = new Phaser.Signal();
    }

    public get() {
        return this.level;
    }

    public next() {
        if (this.level < this.max) {
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
