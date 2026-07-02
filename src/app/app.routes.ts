import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { ProjectsContainer } from './projects-container/projects-container';
import { ProjectPage } from './project-page/project-page';
import { AboutPage } from './about-page/about-page';
import { ProjectModel } from './models/project';
import { ProjectService } from './project-service';

const projectResolver: ResolveFn<ProjectModel | null> = async (route) => {
    const projectService = inject(ProjectService);
    const projectId = route.paramMap.get('id');

    if (!projectId) {
        return null;
    }

    return (await projectService.getProjectById(projectId)) ?? null;
};

export const routes: Routes = [
    { path: '', component: ProjectsContainer },
    { path: 'projects', component: ProjectsContainer },
    { path: 'project/:id', component: ProjectPage, resolve: { project: projectResolver } },
    { path: 'about', component: AboutPage },
];

routes.push(
    { path: 'fr', component: ProjectsContainer },
    { path: 'fr/projects', component: ProjectsContainer },
    { path: 'fr/project/:id', component: ProjectPage, resolve: { project: projectResolver } },
    { path: 'fr/about', component: AboutPage },
);

routes.push(
    { path: 'en', component: ProjectsContainer },
    { path: 'en/projects', component: ProjectsContainer },
    { path: 'en/project/:id', component: ProjectPage, resolve: { project: projectResolver } },
    { path: 'en/about', component: AboutPage },
);