export class ResponseEntity<T> {
    constructor(
        public data: T,
        public title: string,
        public message: string,
        public status: number
    ) { }
}
