import { GlobalService } from "../globals-service";

export type MediaType = "image" | "video";

export interface Media {
    name?: string;
    url?: string;
    altText?: string;
    description?: string;
}

export class MediaModel implements Media {

    name?: string;
    url?: string;
    altText?: string;
    description?: string;

    constructor(media: Media, private globalsService: GlobalService) {
        this.name = media.name;
        this.url = media.url;
        this.altText = media.altText;
        this.description = media.description;
    }
}