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
}
