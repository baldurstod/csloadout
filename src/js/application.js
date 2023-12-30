import { createElement } from 'harmony-ui';

import { Controller } from './controller.js';
import { Statusbar } from './view/statusbar.js';
import { Toolbar } from './view/toolbar.js';
import { Viewer } from './view/viewer.js';

import '../css/application.css';
import '../css/vars.css';

class Application {
	#appStatusbar = new Statusbar();
	#appToolbar = new Toolbar();
	#appViewer = new Viewer();
	#files = new Set();
	#html;
	constructor() {
		this.#initListeners();
		this.#initHTML();
	}

	#initListeners() {
		Controller.addEventListener('createnewfile', event => this.#createNewFile());
	}


	#initHTML() {
		this.#html = createElement('div', {
			parent: document.body,
			childs: [
				this.#appToolbar.html,
				this.#appViewer.html,
				this.#appStatusbar.html,
			],
		});
	}

	#createNewFile() {
		console.log('executing #createNewFile');
	}
}
new Application();
