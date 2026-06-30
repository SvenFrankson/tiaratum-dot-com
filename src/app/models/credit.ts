import { GlobalService } from "../globals-service";

export interface Credit {
    role?: string;
    description?: string;
    name?: string;
    website?: string;
}

export class CreditModel implements Credit {

    role?: string;
    description?: string;
    name?: string;
    website?: string;

    constructor(credit: Credit, private globalsService: GlobalService) {
        this.role = credit.role;
        this.description = credit.description;
        this.name = credit.name;
        this.website = credit.website;
    }
}