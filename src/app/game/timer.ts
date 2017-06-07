export default class Timer {
    private _value: number = 0;
    private timeoutSignal: Phaser.Signal;

    constructor(private game: Phaser.Game) {
        this.timeoutSignal = new Phaser.Signal();
        game.time.events.loop(1000, this.tick, this);
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        if (value < 0) {
            throw new Error(`Invalid timer value: ${value}`);
        }
        this._value = value;
    }

    onTimeout(callback: Function, context?: any): Phaser.SignalBinding {
        return this.timeoutSignal.add(callback, context);
    }

    toString(): string {
        return this._value.toString();
    }

    private tick() {
        if (this._value <= 0) {
            return;
        }


        this._value--;

        if (this._value === 0) {
            this.timeoutSignal.dispatch();
        }
    }
}
