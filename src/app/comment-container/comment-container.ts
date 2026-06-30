import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	input,
	signal,
} from '@angular/core';
import { CommentModel } from '../models/comment';

@Component({
	selector: 'app-comment-container',
	imports: [],
	templateUrl: './comment-container.html',
	styleUrls: ['./comment-container.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CommentContainer implements OnInit, OnDestroy {
	private static readonly AUTO_ROTATE_DELAY_SECONDS = 10;

	comments = input.required<CommentModel[]>();
	currentCommentIndex = 0;
	activeComment = signal<CommentModel | null>(null);
	countdownSeconds = signal(CommentContainer.AUTO_ROTATE_DELAY_SECONDS);
	private _countdownIntervalId: ReturnType<typeof setInterval> | null = null;

	ngOnInit() {
		this._updateActiveComment();
		this._startAutoRotateCountdown();
	}

	ngOnDestroy() {
		this._clearAutoRotateCountdown();
	}

	incrementCommentIndex() {
		if (this.comments().length === 0) {
			return;
		}
		this.currentCommentIndex = (this.currentCommentIndex + 1) % this.comments().length;
		this._updateActiveComment();
		this._resetCountdown();
	}

	decrementCommentIndex() {
		if (this.comments().length === 0) {
			return;
		}
		this.currentCommentIndex = (this.currentCommentIndex - 1 + this.comments().length) % this.comments().length;
		this._updateActiveComment();
		this._resetCountdown();
	}

	private _startAutoRotateCountdown() {
		this._clearAutoRotateCountdown();
		this._countdownIntervalId = setInterval(() => {
			if (this.comments().length <= 1) {
				this._resetCountdown();
				return;
			}

			const nextCount = this.countdownSeconds() - 1;
			if (nextCount <= 0) {
				this.incrementCommentIndex();
				return;
			}

			this.countdownSeconds.set(nextCount);
		}, 1000);
	}

	private _clearAutoRotateCountdown() {
		if (this._countdownIntervalId) {
			clearInterval(this._countdownIntervalId);
			this._countdownIntervalId = null;
		}
	}

	private _resetCountdown() {
		this.countdownSeconds.set(CommentContainer.AUTO_ROTATE_DELAY_SECONDS);
	}

	private _updateActiveComment() {
		if (this.comments().length === 0) {
			this.activeComment.set(null);
			return;
		}
		if (this.currentCommentIndex >= this.comments().length) {
			this.currentCommentIndex = 0;
		}
		this.activeComment.set(this.comments()[this.currentCommentIndex]);
	}
}
