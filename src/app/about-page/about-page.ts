import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-about-page',
	imports: [],
	templateUrl: './about-page.html',
	styleUrls: ['./about-page.scss'],
})
export class AboutPage {
	
	private readonly title = inject(Title);

	ngOnInit() {
		this.title.setTitle('About | Sven // Tiaratum Games');
	}
}
