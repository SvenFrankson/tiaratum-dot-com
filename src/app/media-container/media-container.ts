import { Component, input, signal } from '@angular/core';
import { MediaModel } from '../models/media';

@Component({
	selector: 'app-media-container',
	imports: [],
	templateUrl: './media-container.html',
	styleUrl: './media-container.scss',
})

export class MediaContainer {

	medias = input.required<MediaModel[]>();
	currentMediaIndex = 0;
	activeMedia = signal<MediaModel | null>(null);

	ngOnInit() {
		this._updateActiveMedia();
	}

	incrementMediaIndex() {
		this.currentMediaIndex = (this.currentMediaIndex + 1) % this.medias().length;
		this._updateActiveMedia();
	}

	decrementMediaIndex() {
		this.currentMediaIndex = (this.currentMediaIndex - 1 + this.medias().length) % this.medias().length;
		this._updateActiveMedia();
	}

	private _updateActiveMedia() {
		if (this.medias().length === 0) {
			this.activeMedia.set(null);
			return;
		}
		if (this.currentMediaIndex < this.medias().length) {
			this.activeMedia.set(this.medias()[this.currentMediaIndex]);
		} else {
			this.activeMedia.set(null);
		}
	}
}
