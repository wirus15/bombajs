import Level from "./level";
import Enemy from "./enemy";

interface EnemyFactoryInterface {
    create(level: Level): Enemy;
}

export default EnemyFactoryInterface;
