import { WuXingJudger } from "./WuXingJudger";
/**
 * 计算喜用神
 */
export class GladUseGod {
    private static relationship: { [key: string]: { same: string[]; diff: string[] } } = {
        [WuXingJudger.JIN]: {
            same: [WuXingJudger.JIN, WuXingJudger.TU],
            diff: [WuXingJudger.MU, WuXingJudger.SHUI, WuXingJudger.HUO],
        },
        [WuXingJudger.MU]: {
            same: [WuXingJudger.MU, WuXingJudger.SHUI],
            diff: [WuXingJudger.JIN, WuXingJudger.HUO, WuXingJudger.TU],
        },
        [WuXingJudger.SHUI]: {
            same: [WuXingJudger.SHUI, WuXingJudger.JIN],
            diff: [WuXingJudger.MU, WuXingJudger.HUO, WuXingJudger.TU],
        },
        [WuXingJudger.HUO]: {
            same: [WuXingJudger.HUO, WuXingJudger.MU],
            diff: [WuXingJudger.JIN, WuXingJudger.SHUI, WuXingJudger.TU],
        },
        [WuXingJudger.TU]: {
            same: [WuXingJudger.TU, WuXingJudger.HUO],
            diff: [WuXingJudger.JIN, WuXingJudger.MU, WuXingJudger.SHUI],
        },
    };

    public static getSameKind(dayGan: string): string[] {
        const wuXing = WuXingJudger.getProperty(dayGan);
        if (wuXing === false) {
            throw new Error(`Invalid dayGan: ${dayGan}`);
        }
        return this.relationship[wuXing].same;
    }

    public static getDiffKind(dayGan: string): string[] {
        const wuXing = WuXingJudger.getProperty(dayGan);
        if (wuXing === false) {
            throw new Error(`Invalid dayGan: ${dayGan}`);
        }
        return this.relationship[wuXing].diff;
    }

    public static getGladUseGod(baZi: string): string[] {
        const judger = new WuXingJudger(baZi);
        const strengthResults = judger.getStrengthResult();
        const sameKindArray = this.getSameKind(judger.getDayGan());
        const diffKindArray = this.getDiffKind(judger.getDayGan());
        let sameStrength = 0;

        for (const value of sameKindArray) {
            sameStrength += parseFloat(strengthResults[value]);
        }

        let diffStrength = 0;
        for (const value of diffKindArray) {
            diffStrength += parseFloat(strengthResults[value]);
        }

        if (sameStrength > diffStrength) {
            return diffKindArray;
        } else if (sameStrength < diffStrength) {
            return sameKindArray;
        } else {
            return [...sameKindArray, ...diffKindArray];
        }
    }

    public static getGladUseGodDetails(baZi: string) {
        const judger = new WuXingJudger(baZi);
        const strengthResults = judger.getStrengthResult();
        const sameKindArray = this.getSameKind(judger.getDayGan());
        const diffKindArray = this.getDiffKind(judger.getDayGan());
        let sameStrength = 0;

        for (const value of sameKindArray) {
            sameStrength += parseFloat(strengthResults[value]);
        }

        let diffStrength = 0;
        for (const value of diffKindArray) {
            diffStrength += parseFloat(strengthResults[value]);
        }

        return {
            same: sameKindArray,
            diff: diffKindArray,
            strength_same: sameStrength.toFixed(3),
            strength_diff: diffStrength.toFixed(3),
            strength_all: strengthResults,
            glad_use_god: this.getGladUseGod(baZi),
        };
    }
}