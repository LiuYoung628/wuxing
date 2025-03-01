import { TianGanEntity } from './TianGanEntity';
import { DiZhiEntity } from './DiZhiEntity';
/**
 * 根据八字推算五行
 */
export class WuXingJudger {
    private yearGan: string = '';
    private yearZhi: string = '';

    private monthGan: string = '';
    private monthZhi: string = '';

    private dayGan: string = '';
    private dayZhi: string = '';

    private hourGan: string = '';
    private hourZhi: string = '';

    static readonly JIN: string = '金';
    static readonly MU: string = '木';
    static readonly SHUI: string = '水';
    static readonly HUO: string = '火';
    static readonly TU: string = '土';

    constructor(baZi: string) {
        this.init(baZi);
    }

    private init(baZi: string): void {
        if (baZi.length !== 8) {
            throw new Error('参数有误，参数个数为：' + baZi.length);
        }

        this.yearGan = baZi.charAt(0);
        this.yearZhi = baZi.charAt(1);

        this.monthGan = baZi.charAt(2);
        this.monthZhi = baZi.charAt(3);

        this.dayGan = baZi.charAt(4);
        this.dayZhi = baZi.charAt(5);

        this.hourGan = baZi.charAt(6);
        this.hourZhi = baZi.charAt(7);
    }

    static isProperty(name: string, expectedProperty: string): boolean {
        let property = TianGanEntity.getPropertyByTianGan(name);
        if (property) {
            return property === expectedProperty;
        } else {
            property = DiZhiEntity.getPropertyByDiZhi(name);
            if (property) {
                return property === expectedProperty;
            } else {
                return false;
            }
        }
    }

    static getProperty(name: string): string | false {
        let property = TianGanEntity.getPropertyByTianGan(name);
        if (property) {
            return property;
        } else {
            property = DiZhiEntity.getPropertyByDiZhi(name);
            if (property) {
                return property;
            } else {
                return false;
            }
        }
    }

    getStrengthByWuXing(wuXing: string): string {
        let strength: number = 0;
        //天干
        const ganArray: string[] = [this.yearGan, this.monthGan, this.dayGan, this.hourGan];
        for (const gan of ganArray) {
            if (WuXingJudger.isProperty(gan, wuXing)) {
                // strength += TianGanEntity.getStrengthByTianGanAndMonth(gan, this.monthZhi);
                const strengthValue = TianGanEntity.getStrengthByTianGanAndMonth(gan, this.monthZhi);
                if (typeof strengthValue === 'number') {
                    strength += strengthValue;
                }
            }
        }
        //地支
        const zhiArray: string[] = [this.yearZhi, this.monthZhi, this.dayZhi, this.hourZhi];
        for (const zhi of zhiArray) {
            const cangArray = DiZhiEntity.getStrengthByDiZhiAndMonth(zhi, this.monthZhi);
            for (const [key, value] of Object.entries(cangArray)) {
                if (WuXingJudger.isProperty(key, wuXing)) {
                    strength += value;
                }
            }
        }

        return strength.toFixed(3);
    }

    getStrengthResult(): Record<string, string> {
        return {
            [WuXingJudger.JIN]: this.getStrengthByWuXing(WuXingJudger.JIN),
            [WuXingJudger.MU]: this.getStrengthByWuXing(WuXingJudger.MU),
            [WuXingJudger.SHUI]: this.getStrengthByWuXing(WuXingJudger.SHUI),
            [WuXingJudger.HUO]: this.getStrengthByWuXing(WuXingJudger.HUO),
            [WuXingJudger.TU]: this.getStrengthByWuXing(WuXingJudger.TU),
        };
    }

    getDayGan(): string {
        return this.dayGan;
    }
}