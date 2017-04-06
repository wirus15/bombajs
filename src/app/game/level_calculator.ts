import Points from "./points";
export default class LevelCalculator {
    private static points = {
        1: 0,
        2: 50,
        3: 120,
        4: 200,
        5: 300,
        6: 440,
        7: 600,
        8: 760,
        9: 920,
        10: 1050,
        11: 1200,
        12: 1400,
        13: 1650,
        14: 1950,
        15: 2250,
        16: 2500
        // 1: 0,
        // 2: 500,
        // 3: 1200,
        // 4: 2000,
        // 5: 3000,
        // 6: 4400,
        // 7: 6000,
        // 8: 7600,
        // 9: 9200,
        // 10: 10500,
        // 11: 12000,
        // 12: 14000,
        // 13: 16500,
        // 14: 19500,
        // 15: 22500,
        // 16: 25000
    };

    static calculateLevel(points: Points) {
        let level = 1;

        while (LevelCalculator.points.hasOwnProperty(level) && LevelCalculator.points[level] < points.get()) {
            level++;
        }

        return level;
    }
}
