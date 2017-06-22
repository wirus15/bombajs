export default class Engine extends Phaser.Plugin {
    private emitter: Phaser.Particles.Arcade.Emitter;
    private ship: Phaser.Sprite;

    constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
        super(game, parent);

        this.emitter = this.game.add.emitter(0, 0, 100);
        this.emitter.makeParticles('engine');
        this.emitter.minParticleSpeed.set(-20, 300);
        this.emitter.maxParticleSpeed.set(20, 500);
        this.emitter.minParticleScale = 0.5;
        this.emitter.maxParticleScale = 2;
        this.emitter.width = 10;
        this.emitter.setAlpha(1, 0, 500);
        this.emitter.start(false, 300, 20);
    }

    init(ship: Phaser.Sprite) {
        this.ship = ship;
        this.game.world.swap(ship, this.emitter);
    }

    update() {
        if (!this.ship) {
            return;
        }

        this.emitter.visible = this.ship.visible;
        this.emitter.x = this.ship.x;
        this.emitter.y = this.ship.y + 30;
    }
}