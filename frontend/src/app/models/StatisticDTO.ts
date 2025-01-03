export class StatisticDTO {

    developers: number[][];
    recruiters: number[][];
    students: number[][];
    clients: number[][];
    curious: number[][];
    others: number[][];

    constructor(developers: number[][], recruiters: number[][], students: number[][], clients: number[][], curious: number[][], others: number[][]) {
        this.developers = developers;
        this.recruiters = recruiters;
        this.students = students;
        this.clients = clients;
        this.curious = curious;
        this.others = others;
    }
}