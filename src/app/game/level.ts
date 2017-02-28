export default class Level {
    public static readonly MAX = 16;

    private level = 1;

    public get() {
        return this.level;
    }

    public next() {
        if (this.level < Level.MAX) {
            this.level++;
        }
    }

    public reset() {
        this.level = 1;
    }
}