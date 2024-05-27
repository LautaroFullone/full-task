export class ResponseEntity<T> {
    
    private data: T;
    private title: string;
    private message: string;
    private status: number;

    constructor() { }

    setData(data: T): this {
        this.data = data;
        return this;
    }

    setTitle(title: string): this {
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
        response.data = this.data;
        response.title = this.title;
        response.message = this.message;
        response.status = this.status;
        return response;
    }
}
