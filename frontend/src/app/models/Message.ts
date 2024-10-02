export class Message {
    from: string;
    phoneNumber: string;
    activityArea: string;
    text: string;

    constructor(from: string, phoneNumber: string, activityArea: string, text: string) {
        this.from = from;
        this.phoneNumber = phoneNumber;
        this.activityArea = activityArea;
        this.text = text;
    }
}