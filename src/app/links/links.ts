import { Component, input, signal } from '@angular/core';
import { ProjectModel } from '../models/project';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
	selector: 'app-links',
	imports: [
		UpperCasePipe,
		NgClass
	],
	templateUrl: './links.html',
	styleUrl: './links.scss',
})
export class Links {

	project = input<ProjectModel>();
}
