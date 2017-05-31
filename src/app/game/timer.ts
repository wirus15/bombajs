export default class Timer {
    private value: number = 0;
    private timeoutSinal: Phaser.Signal;

    constructor(private game: Phaser.Game) {
        this.timeoutSinal = new Phaser.Signal();
        game.time.events.loop(1000, this.tick, this);
    }

    getValue(): number {
        return this.value;
    }

    setValue(value: number) {
        this.value = value;
    }

    onTimeout(callback: Function, context?: any): Phaser.SignalBinding {
        return this.timeoutSinal.add(callback, context);
    }

    private tick() {
        if (this.value <= 0) {
            return;
        }


        this.value--;

        if (this.value === 0) {
            this.timeoutSinal.dispatch();
        }
    }
}