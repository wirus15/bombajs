export default class Points {
    private value = 0;

    public get() {
        return this.value;
    }

    public add(points: number) {
        this.value += points;
    }

    public reset() {
        this.value = 0;
    }
}