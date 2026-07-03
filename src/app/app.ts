import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { ProjectsContainer } from './projects-container/projects-container';
import { Header } from './header/header';

@Component({
	selector: 'app-root',
	imports: [Header, RouterOutlet, ProjectsContainer],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('tiaratum-dot-com');
	private readonly router = inject(Router);
	private readonly document = inject(DOCUMENT);
	private readonly destroyRef = inject(DestroyRef);
	private readonly platformId = inject(PLATFORM_ID);

	ngOnInit() {
		this.redirectToPreferredLocale();
		this.setDocumentLang(this.router.url);

		this.router.events
			.pipe(
				filter((event): event is NavigationEnd => event instanceof NavigationEnd),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((event) => {
				this.setDocumentLang(event.urlAfterRedirects);
			});
	}

	private redirectToPreferredLocale() {
		if (!isPlatformBrowser(this.platformId)) {
			return;
		}

		const currentUrl = `${this.document.location.pathname}${this.document.location.search}${this.document.location.hash}`;
		const localizedUrl = this.getLocalizedUrl(currentUrl);
		console.log(localizedUrl);
		if (localizedUrl) {
			void this.router.navigateByUrl(localizedUrl, { replaceUrl: true });
		}
	}

	private getLocalizedUrl(url: string): string | null {
		const [path] = url.split(/[?#]/, 1);
		const firstSegment = path.split('/')[1];

		if (firstSegment === 'fr' || firstSegment === 'en') {
			return null;
		}

		console.log("url", url);
		const locale = this.getPreferredLocale();
		if (url === '/') {
			return `/${locale}`;
		}
		return `/${locale}${url}`;
	}

	private getPreferredLocale(): 'en' | 'fr' {
		const preferredLanguages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
		return preferredLanguages.some((language) => language.toLowerCase().startsWith('fr')) ? 'fr' : 'en';
	}

	private setDocumentLang(url: string) {
		const primarySegment = url.split(/[?#]/, 1)[0].split('/')[1];
		this.document.documentElement.lang = primarySegment === 'fr' ? 'fr' : 'en';
	}
}
