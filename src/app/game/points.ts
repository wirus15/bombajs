export default class Points {
    private value = 0;

    get(): number {
        return this.value;
    }

    add(points: number) {
        this.value += points;
    }

    reset() {
        this.value = 0;
    }

    toString(): string {
        return this.value.toString();
    }
}
