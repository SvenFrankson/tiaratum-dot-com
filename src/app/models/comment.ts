import { GlobalService } from "../globals-service";

export interface Comment {
    text?: string;
    author?: string;
}

export class CommentModel implements Comment {

    text?: string;
    author?: string;

    constructor(comment: Comment, private globalsService: GlobalService) {
        this.text = comment.text;
        this.author = comment.author;
    }
}