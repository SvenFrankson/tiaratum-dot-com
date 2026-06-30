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
		this.router.navigateByUrl(`project/${this.project().id}`);
	}
}
