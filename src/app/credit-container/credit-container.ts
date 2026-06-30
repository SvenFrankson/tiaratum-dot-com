import { Component, input, signal } from '@angular/core';
import { CreditModel } from '../models/credit';
import { UpperCasePipe } from '@angular/common';

@Component({
	selector: 'app-credit-container',
	imports: [
		UpperCasePipe
	],
	templateUrl: './credit-container.html',
	styleUrls: ['./credit-container.scss'],
})

export class CreditContainer {

	credits = input.required<CreditModel[]>();
}
