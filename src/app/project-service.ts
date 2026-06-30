import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectModel } from './models/project';
import { GlobalService } from './globals-service';
import { firstValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(
		private globalsService: GlobalService,
		private http: HttpClient
	) {}

	async getProjects(): Promise<ProjectModel[]> {
		const data = await this.readProjectsFromHttp();
		const projects = data.projects.map((project: Project) => new ProjectModel(project, this.globalsService));
		const tags = new Set<string>();
		for (const project of projects) {
			for (const tag of project.tags) {
				tags.add(tag);
			}
		}
		console.log(Array.from(tags.values()));
		return projects;
	}

	async getProjectById(id: string): Promise<ProjectModel | undefined> {
		let projects = await this.getProjects();
		return projects.find((project) => project.id.toString() === id);
	}

	private async readProjectsFromHttp(): Promise<{ projects: Project[] }> {
		return firstValueFrom(this.http.get<{ projects: Project[] }>('/assets/projects.json'));
	}
}
