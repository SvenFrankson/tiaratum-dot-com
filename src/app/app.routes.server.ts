import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface ProjectsFile {
	projects: Array<{
		id: string;
	}>;
}

function getProjectIds(): string[] {
	const projectsPath = join(process.cwd(), 'public', 'assets', 'projects.json');
	const fileContent = readFileSync(projectsPath, 'utf-8');
	const data = JSON.parse(fileContent) as ProjectsFile;

	return data.projects.map((project) => project.id);
}

export const serverRoutes: ServerRoute[] = [
	{
		path: 'project/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			return getProjectIds().map((id) => ({ id }));
		},
	},
	{
		path: '**',
		renderMode: RenderMode.Prerender,
	},
];
