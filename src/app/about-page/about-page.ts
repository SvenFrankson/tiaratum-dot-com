import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
	selector: 'app-about-page',
	imports: [],
	templateUrl: './about-page.html',
	styleUrls: ['./about-page.scss'],
})
export class AboutPage {
	
	private readonly title = inject(Title);

	constructor(public router: Router) {}

	ngOnInit() {
		this.title.setTitle('About | Sven // Tiaratum Games');
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
