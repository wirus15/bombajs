export default class Timer {
    private timerValue: number = 0;
    private timeoutSignal: Phaser.Signal;

    constructor(private game: Phaser.Game) {
        this.timeoutSignal = new Phaser.Signal();
        setTimeout(() => game.time.events.loop(1000, this.tick, this));
    }

    get value(): number {
        return this.timerValue;
    }

    set value(value: number) {
        if (value < 0) {
            throw new Error(`Invalid timer value: ${value}`);
        }
        this.timerValue = value;
    }

    onTimeout(callback: Function, context?: any): Phaser.SignalBinding {
        return this.timeoutSignal.add(callback, context);
    }

    toString(): string {
        return this.timerValue.toString();
    }

    private tick() {
        if (this.timerValue <= 0) {
            return;
        }


        this.timerValue--;

        if (this.timerValue === 0) {
            this.timeoutSignal.dispatch();
        }
    }
}
