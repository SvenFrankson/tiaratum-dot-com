import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectTile } from './project-tile/project-tile';
import { Project } from './models/project';
import { ProjectService } from './project-service';
import { ProjectsContainer } from './projects-container/projects-container';
import { GlobalService } from './globals-service';
import { Header } from './header/header';

@Component({
	selector: 'app-root',
	imports: [Header, RouterOutlet, ProjectsContainer],
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('tiaratum-dot-com');

	constructor(private projectService: ProjectService, private globalsService: GlobalService) {
		
	}

	async ngOnInit() {
		
	}
}
