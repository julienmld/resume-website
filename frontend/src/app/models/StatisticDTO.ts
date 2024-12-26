export class StatisticDTO {

    numberDeveloper: number;
    numberRecruiter: number;
    numberStudent: number;
    numberClient: number;
    numberCurious: number;
    numberOther: number;
    deviceStatistics: Map<number, number[]>;

    constructor(numberDeveloper: number, numberRecruiter: number, numberStudent: number, numberClient: number, numberCurious: number, numberOther: number, numberMobile: number, numberComputer: number, deviceStatistics: Map<number, number[]>) {
        this.numberDeveloper = numberDeveloper;
        this.numberRecruiter = numberRecruiter;
        this.numberStudent = numberStudent;
        this.numberClient = numberClient;
        this.numberCurious = numberCurious;
        this.numberOther = numberOther;
        this.deviceStatistics = deviceStatistics;
    }
}