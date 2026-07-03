import { Component, inject, signal } from '@angular/core';
import { ProjectModel } from '../models/project';
import { ProjectService } from '../project-service';
import { ActivatedRoute } from '@angular/router';
import { NgClass, UpperCasePipe } from '@angular/common';
import { MediaContainer } from '../media-container/media-container';
import { Meta, Title } from '@angular/platform-browser';
import { CreditContainer } from '../credit-container/credit-container';
import { CommentContainer } from '../comment-container/comment-container';
import { Links } from '../links/links';

@Component({
	selector: 'app-project-page',
	imports: [
		UpperCasePipe,
		NgClass,
		MediaContainer,
		CommentContainer,
		CreditContainer,
		Links
	],
	templateUrl: './project-page.html',
	styleUrls: ['./project-page.scss', '../project.scss'],
})
export class ProjectPage {
	private readonly route = inject(ActivatedRoute);
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);

	project = signal<ProjectModel | null>(null);

	ngOnInit() {
		const project = this.route.snapshot.data['project'] as ProjectModel | null;
		const projectId = this.route.snapshot.paramMap.get('id');

		if (project && projectId) {
			this.project.set(project);
			this.updateSeoTags(project, projectId);
		}
	}

	private updateSeoTags(project: ProjectModel, projectId: string): void {
		const pageTitle = `${project.title} | Sven // Tiaratum Games`;
		const description = this.getProjectDescription(project);
		const imageUrl = this.toAbsoluteUrl(project.miniatureUrl);
		const pageUrl = this.toAbsoluteUrl(`/project/${projectId}`);

		this.title.setTitle(pageTitle);
		this.meta.updateTag({ name: 'description', content: description });
		this.meta.updateTag({ property: 'og:type', content: 'website' });
		this.meta.updateTag({ property: 'og:title', content: pageTitle });
		this.meta.updateTag({ property: 'og:description', content: description });
		this.meta.updateTag({ property: 'og:url', content: pageUrl });
		this.meta.updateTag({ property: 'og:image', content: imageUrl });
		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
		this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
		this.meta.updateTag({ name: 'twitter:description', content: description });
		this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
	}

	private getProjectDescription(project: ProjectModel): string {
		let description = project.getDescription();
		if (description && description.length > 0) {
			return description[0];
		}

		return `${project.title} project by Sven // Tiaratum Games.`;
	}

	private toAbsoluteUrl(path: string): string {
		if (path.startsWith('http://') || path.startsWith('https://')) {
			return path;
		}

		const baseUrl = 'https://tiaratum.com/';
		const normalizedPath = path.startsWith('/') ? path : `/${path}`;

		return `${baseUrl}${normalizedPath}`;
	}
}
