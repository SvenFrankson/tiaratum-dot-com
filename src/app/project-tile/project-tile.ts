import { Component, input } from '@angular/core';
import { Project, ProjectModel } from '../models/project';
import { NgClass, NgIf, NgStyle, UpperCasePipe } from '@angular/common';
import { GlobalService } from '../globals-service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-project-tile',
	imports: [
		NgClass,
		NgStyle,
		UpperCasePipe
	],
	templateUrl: './project-tile.html',
	styleUrls: ['./project-tile.scss', '../project.scss'],
})
export class ProjectTile {

	project = input.required<ProjectModel>();

	constructor(private router: Router) {
	
	}

	onClick() {
		const lang = this.getLang();
		this.router.navigateByUrl(`${lang}/project/${this.project().id}`);
	}

	getLang(): string {
		let splitUrl = this.router.url.split('/');
		if (splitUrl.length >= 1 && (splitUrl[1] === 'fr')) {
			return 'fr';
		}
		return 'en';
	}
}
