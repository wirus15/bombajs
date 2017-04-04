import Points from "./points";
export default class LevelCalculator {
    private static points = {
        1: 0,
        2: 500,
        3: 1200,
        4: 2000,
        5: 3000,
        6: 4400,
        7: 6000,
        8: 7600,
        9: 9200,
        10: 10500,
        11: 12000,
        12: 14000,
        13: 16500,
        14: 19500,
        15: 22500,
        16: 25000
    };

    static calculateLevel(points: Points) {
        let level = 1;

        while (LevelCalculator.points.hasOwnProperty(level) && LevelCalculator.points[level] < points.get()) {
            level++;
        }

        return level;
    }
}