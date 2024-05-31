export class ResponseEntity<T> {
    
    private records: T;
    private title: string;
    private message: string;
    private status: number;

    constructor() { }

    setRecords(records: T): this {
        this.records = records;
        return this;
    }

    setTitle(title: any): this {
        this.title = title;
        return this;
    }

    setMessage(message: string): this {
        this.message = message;
        return this;
    }

    setStatus(status: number): this {
        this.status = status;
        return this;
    }

    build(): ResponseEntity<T> {
        const response = new ResponseEntity<T>();
        response.records = this.records;
        response.title = this.title;
        response.message = this.message;
        response.status = this.status;
        return response;
    }
}
