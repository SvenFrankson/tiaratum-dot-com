import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-header',
	imports: [],
	templateUrl: './header.html',
	styleUrls: ['./header.scss'],
})
export class Header {

	isHomePage = false;
	isAboutPage = false;
	isContactPage = false;

	constructor(public router: Router) {
		this.router.events.subscribe(() => {
			this.isHomePage = this.router.url === '/' || this.router.url === '/home' || this.router.url === '/projects';
			this.isAboutPage = this.router.url === '/about';
			this.isContactPage = this.router.url === '/contact';
		});
	}

	ngOnInit() {
		
	}

	getLang(): string {
		let splitUrl = this.router.url.split('/');
		if (splitUrl.length >= 1 && (splitUrl[1] === 'fr')) {
			return 'fr';
		}
		else if (splitUrl.length >= 1 && (splitUrl[1] === 'en')) {
			return 'en';
		}
		return '';
	}

	en(): boolean {
		const lang = this.getLang();
		return lang === 'en' || lang === '';
	}

	fr(): boolean {
		return this.getLang() === 'fr';
	}

	onLanguageChange(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		const selectedLang = selectElement.value;
		this.changeLanguage(selectedLang);
	}

	changeLanguage(selectedLang: string) {
		const currentPath = this.router.url.split('/').slice(2).join('/');
		if (currentPath === '') {
			this.router.navigateByUrl(`/${selectedLang}`);
		}
		else {
			this.router.navigateByUrl(`/${selectedLang}/${currentPath}`);
		}
	}
}
