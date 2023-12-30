import { Graphics, Repositories, Repository, SceneExplorer, Source2ModelManager } from 'harmony-3d';
import { I18n } from 'harmony-browser-utils/src/i18n.js';
import { createElement } from 'harmony-ui';

import { CS2_REPOSITORY } from './constants.js';
import { Controller } from './controller.js';
import { Options } from './view/options.js';
import { Statusbar } from './view/statusbar.js';
import { Toolbar } from './view/toolbar.js';
import { Viewer } from './view/viewer.js';

import '../css/application.css';
import '../css/vars.css';

class Application {
	#appOptions = new Options();
	#appStatusbar = new Statusbar();
	#appToolbar = new Toolbar();
	#appViewer = new Viewer();
	#htmlElement;
	constructor() {
		I18n.start();
		this.#initListeners();
		this.#initHTML();
		this.#iniRepositories();
		this.#appViewer.initModel();
	}

	#initListeners() {
		Controller.addEventListener('play', () => Graphics.speed = 1.0);
		Controller.addEventListener('pause', () => Graphics.speed = 0.0);
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			className: 'application',
			parent: document.body,
			childs: [
				this.#appToolbar.htmlElement,
				createElement('div', {
					className: 'maincontent',
					childs: [
						this.#appOptions.htmlElement,
						this.#appViewer.htmlElement,
					]
				}),
				this.#appStatusbar.htmlElement,
			],
		});
	}

	#iniRepositories() {
		Repositories.addRepository(new Repository('cs2', CS2_REPOSITORY));
		Source2ModelManager.loadManifest('cs2');
	}
}
new Application();
