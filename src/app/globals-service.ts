import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class GlobalService {

	isMobile() {
		if (typeof navigator === 'undefined') {
			return false;
		}
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}
