import { Graphics } from 'harmony-3d';
import { createElement } from 'harmony-ui';

import { Controller } from '../controller';

import '../../css/viewer.css';

export class Viewer {
	#html;
	#htmlCanvas;

	#renderer;
	constructor() {
		this.#initHTML();
		this.#initRenderer();
	}

	#initHTML() {
		this.#html = createElement('div', {
			class: 'viewer',
			childs: [
				this.#htmlCanvas = createElement('canvas'),
			],
		})
		return this.#html;
	}

	#initRenderer() {
		this.#renderer = Graphics.initCanvas({
			canvas: this.#htmlCanvas,
			alpha: true,
			autoResize: true,
			preserveDrawingBuffer: true,
			premultipliedAlpha: false
		});
	}

	get html() {
		return this.#html;
	}
}
