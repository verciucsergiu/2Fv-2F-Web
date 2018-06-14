export class HttpResponse {
    public statusCode: number;
    public rawText: string = '';

    constructor(response) {
        this.statusCode = response.status;
        this.rawText = response.responseText;
    }

    public get body(): string {
        let result = '';
        try {
            result = JSON.parse(this.rawText);
        } catch (err) {
            result = this.rawText;
        }

        return result;
    }
}