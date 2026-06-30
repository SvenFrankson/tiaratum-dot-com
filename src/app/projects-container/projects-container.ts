import { Component, inject, signal } from '@angular/core';
import { Project, ProjectModel } from '../models/project';
import { ProjectService } from '../project-service';
import { ProjectTile } from '../project-tile/project-tile';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-projects-container',
	imports: [
		ProjectTile
	],
	templateUrl: './projects-container.html',
	styleUrls: ['./projects-container.scss'],
})
export class ProjectsContainer {
	private readonly title = inject(Title);
	projects = signal<ProjectModel[]>([]);

	constructor(private projectService: ProjectService) {
			
	}
		
	async ngOnInit() {
		this.title.setTitle('Sven // Tiaratum Games');
		
		let projects = await this.projectService.getProjects();
		projects.sort(
			(a, b) => {
				return b.getRank() - a.getRank();
			}
		);
		this.projects.set(projects);
	}
}
