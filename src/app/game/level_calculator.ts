import Points from "./points";
export default class LevelCalculator {
    private static points = {
        // 1: 0,
        // 2: 50,
        // 3: 120,
        // 4: 200,
        // 5: 300,
        // 6: 440,
        // 7: 600,
        // 8: 760,
        // 9: 920,
        // 10: 1050,
        // 11: 1200,
        // 12: 1400,
        // 13: 1650,
        // 14: 1950,
        // 15: 2250,
        // 16: 2500
        1: 0,
        2: 10,
        3: 2000,
        4: 4000,
        5: 7000,
        6: 11000,
        7: 16000,
        8: 22000,
        9: 29000,
        10: 37000,
        11: 46000,
        12: 56000,
        13: 67000,
        14: 79000,
        15: 92000,
        16: 106000
    };

    static calculateLevel(points: Points): number {
        let level = 1;

        while (LevelCalculator.points.hasOwnProperty(level) && LevelCalculator.points[level] < points.get()) {
            level++;
        }

        return level;
    }
}
