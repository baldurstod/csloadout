import { Repositories, Repository, SceneExplorer } from 'harmony-3d';
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
	#html;
	constructor() {
		this.#initListeners();
		this.#initHTML();
		this.#iniRepositories();
	}

	#initListeners() {
	}

	#initHTML() {
		this.#html = createElement('div', {
			className: 'application',
			parent: document.body,
			childs: [
				this.#appToolbar.html,
				createElement('div', {
					className: 'maincontent',
					childs: [
						createElement('div', {
							className: 'maincontent-sceneexplorer',
							child: SceneExplorer.htmlElement,
						}),
						this.#appViewer.html,
					]
				}),
				this.#appStatusbar.html,
			],
		});
	}

	#iniRepositories() {
		Repositories.addRepository(new Repository('cs2', CS2_REPOSITORY));
	}
}
new Application();
