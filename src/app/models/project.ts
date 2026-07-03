import { Router } from "@angular/router";
import { GlobalService } from "../globals-service";
import { Comment, CommentModel } from "./comment";
import { Credit, CreditModel } from "./credit";
import { Media, MediaModel } from "./media";

export type ProjectStatus = "game" | "game-desktop" | "demo" | "demo-desktop" | "code" | "broken" | "hidden";

export var SortedTags = [
    "arcade",
    "puzzle",
    "physic",
    "simulation",
    "construction",

    "network",
    "voxels",

    "ludum dare",
    "openstreetmap",
    "hackathon",

    "babylon.js",
    "npm",
    "unity",
    "cardboard",

    "webgl",
    "javascript",
    "vr",
    "c#",
    "typescript",
    "php",
];
export function GetTagIndex(tag: string): number {
	return SortedTags.indexOf(tag);
}

export interface Project {
    id: string;
	score?: number;
    title: string;
    lastUpdate?: number;
    description?: string[] | { [key: string]: string[] };
	credits?: Credit[];
	comments?: Comment[];
    tags: string[];
	tiaratumGames?: boolean;
    status: ProjectStatus;
    imageUrl?: string;
	miniatureIndex?: number;
	cardIndex?: number;
	medias?: Media[];
    playUrl?: string;
    npmUrl?: string;
    sourceUrl?: string;
	extraUrls?: {
		label: string,
		url: string,
		targetName?: string
	}[];
}

export class ProjectModel {

    id: string;
	score: number = 0;
    title: string;
    lastUpdate?: number;
    description?: string[] | { [key: string]: string[] };
	credits: CreditModel[];
	comments: CommentModel[];
    tags: string[];
	tiaratumGames?: boolean;
    status: ProjectStatus;
	public get imageUrl(): string {
		if (this.medias && this.medias.length > 0) {
			return this.medias[0].url || "";
		}
		return "";
	}
	miniatureIndex: number = 0;
	public get miniatureUrl(): string {
		if (this.medias && this.medias.length > 0) {
			return this.medias[this.miniatureIndex].url || "";
		}
		return "";
	}
	cardIndex: number = 0;
	public get cardUrl(): string {
		if (this.medias && this.medias.length > 0) {
			return this.medias[this.cardIndex].url || "";
		}
		return "";
	}
	medias: MediaModel[] = [];
    playUrl?: string;
	npmUrl?: string;
    sourceUrl?: string;
	extraUrls?: {
		label: string,
		url: string,
		targetName?: string
	}[];

    constructor(project: Project, private globalsService: GlobalService, private router: Router) {
        this.id = project.id;
        this.title = project.title;
        this.lastUpdate = project.lastUpdate;
        this.description = project.description;
		this.comments = project.comments?.map(comment => new CommentModel(comment, this.globalsService)) || [];
        this.tags = project.tags;
		this.tags.sort((a, b) => GetTagIndex(a) - GetTagIndex(b));
		this.tiaratumGames = project.tiaratumGames;
        this.status = project.status;
		this.cardIndex = project.cardIndex || 0;
		this.miniatureIndex = project.miniatureIndex || 0;
        this.medias = project.medias?.map(media => new MediaModel(media, this.globalsService)) || [];
        this.credits = project.credits?.map(credit => new CreditModel(credit, this.globalsService)) || [];
        this.playUrl = project.playUrl;
		this.npmUrl = project.npmUrl;
        this.sourceUrl = project.sourceUrl;
		this.extraUrls = project.extraUrls;
        this.score = project.score || 0;
    }

	statusName(): string {
		if (this.status === 'game') {
			return this.fr() ? 'jeu' : 'game';
		}
		if (this.status === 'game-desktop') {
			return this.fr() ? 'jeu' : 'game';
		}
		else if (this.status === 'demo') {
			return this.fr() ? 'démo' : 'demo';
		}
		else if (this.status === 'demo-desktop') {
			return this.fr() ? 'démo' : 'demo';
		}
		else if (this.status === 'code') {
			return this.fr() ? 'code' : 'code only';
		}
		else if (this.status === 'broken') {
			return this.fr() ? 'cassé :\'(' : 'broken :\'(';
		}
		return '';
	}

	icon(): string {
		if (this.status === 'game' || this.status === 'game-desktop') {
			return 'bi bi-controller';
		}
		else if (this.status === 'demo' || this.status === 'demo-desktop') {
			return 'bi bi-lightbulb';
		}
		else if (this.status === 'code') {
			return 'bi bi-code-slash';
		}
		else if (this.status === 'broken') {
			return 'bi bi-heartbreak-fill';
		}
		return 'bi bi-question';
	}

	getDescription(): string[] {
		if (this.description) {
			if (Array.isArray(this.description)) {
				return this.description;
			}
			else {
				let lang = this.getLang();
				if (this.description[lang]) {
					return this.description[lang];
				}
				else {
					return [];
				}
			}
		}
		return [];
	}

    isDisabled(): boolean {
		return (this.status === 'game-desktop' || this.status === 'demo-desktop') && this.globalsService.isMobile();
	}

	onPlayClick(event: Event) {
		if (this.isDisabled()) {
			event.preventDefault();
		}
		else {
			let a = document.createElement('a');
			a.href = this.playUrl!;
			a.target = '_blank';
			a.rel = 'noopener noreferrer';
			a.click();
		}
	}

	playButtonName(): string {
		if (this.status === 'game' || this.status === 'game-desktop') {
			return this.fr() ? 'Jouer' :'Play';
		}
		else if (this.status === 'demo' || this.status === 'demo-desktop') {
			return this.fr() ? 'Jouer' :'Play';
		}
		return '';
	}

	playTargetName(): string {
		if (this.isDisabled()) {
			return this.fr() ? "(ordi uniquement)" : "(desktop only)";
		}
		if (this.playUrl?.indexOf('poki.com') !== -1) {
			return 'poki.com';
		}
		if (this.playUrl?.indexOf('wavedash.com') !== -1) {
			return 'wavedash.com';
		}
		if (this.playUrl?.indexOf('itch.io') !== -1) {
			return 'itch.io';
		}
		return this.fr() ? 'nouvel onglet' : 'new tab';
	}

	urlTargetName(): string {
		if (this.sourceUrl?.indexOf('github.com') !== -1) {
			return 'github.com';
		}
		return '';
	}

	tagText(tag: string): string {
		return tag;
		if (tag === 'typescript') {
			return '';
		}
		if (tag === 'javascript') {
			return '';
		}
		if (tag === 'php') {
			return '';
		}
	}

	tagClass(tag: string): string {
		return '';
		if (tag === 'typescript') {
			return 'bi bi-typescript';
		}
		if (tag === 'javascript') {
			return 'bi bi-javascript';
		}
		if (tag === 'php') {
			return 'bi bi-filetype-php';
		}
	}

	getRank(): number {
		let dateRankString = this.lastUpdate ? this.lastUpdate.toFixed(0) : "0000"
		let scoreRankString = this.score.toFixed(0).padStart(3, '0');
		let notBrokenRankString = this.status != 'broken' ? "1" : "0";
		let tiaratumGamesRankString = this.tiaratumGames ? "1" : "0";
		let rankString = `${tiaratumGamesRankString}${notBrokenRankString}${scoreRankString}${dateRankString}`;
		return parseInt(rankString, 10);
	}

	getLang(): string {
		let splitUrl = this.router.url.split('/');
		if (splitUrl.length >= 1 && (splitUrl[1] === 'fr')) {
			return 'fr';
		}
		return 'en';
	}

	en(): boolean {
		return this.getLang() === 'en';
	}

	fr(): boolean {
		return this.getLang() === 'fr';
	}
}