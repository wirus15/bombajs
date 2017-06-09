import {ConstructorInject} from "huject";
import Rock from "./rock";
import Assets from "./assets";
import PhysicsGroup from "./physics_group";

@ConstructorInject
export default class ObstacleContainer {
    private static textures = [
        Assets.rock_01,
        Assets.rock_02,
        Assets.rock_03
    ];

    public readonly rocks: Phaser.Group;

    constructor(private game: Phaser.Game) {
        this.rocks = new PhysicsGroup(game);
        this.rocks.classType = Rock;

        setTimeout(() => {
            this.game.add.existing(this.rocks);
            this.game.time.events.loop(2000, this.dispatch, this);
        }, 1000);
    }

    private dispatch() {
        const rock = this.rocks.getFirstExists(false, true);
        const x = this.game.rnd.integerInRange(0, this.game.width);
        const texture = this.game.rnd.pick(ObstacleContainer.textures);

        rock.loadTexture(texture);
        rock.reset(x, -rock.height, this.game.rnd.integerInRange(20, 60));
        rock.body.setSize(rock.width, rock.height);
        rock.body.velocity.x = this.game.rnd.integerInRange(-50, 50);
        rock.body.velocity.y = this.game.rnd.integerInRange(100, 400);
        rock.body.angularVelocity = this.game.rnd.integerInRange(-100, 100);

        return rock;
    }
}
