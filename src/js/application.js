import { Repositories, Repository, SceneExplorer, Source2ModelManager } from 'harmony-3d';
import { createElement } from 'harmony-ui';

import { CS2_REPOSITORY } from './constants.js';
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
	#htmlElement;
	constructor() {
		this.#initListeners();
		this.#initHTML();
		this.#iniRepositories();
		this.#appViewer.initModel();
	}

	#initListeners() {
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
						createElement('div', {
							className: 'maincontent-sceneexplorer',
							child: SceneExplorer.htmlElement,
						}),
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
