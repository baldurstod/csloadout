import { Graphics, Repositories, Repository, SceneExplorer, Source2ModelManager } from 'harmony-3d';
import { I18n } from 'harmony-browser-utils/src/i18n.js';
import { createElement } from 'harmony-ui';

import { CS2_REPOSITORY } from './constants.js';
import { Controller } from './controller.js';
import { showAboutLayer, showBugNotification } from './misc/about.js';
import { Options } from './view/options.js';
import { Statusbar } from './view/statusbar.js';
import { Toolbar } from './view/toolbar.js';
import { Viewer } from './view/viewer.js';

import '../css/application.css';
import '../css/vars.css';

import english from '../json/i18n/english.json';
import { Loadout } from './loadout/loadout.js';

class Application {
	#appOptions = new Options();
	#appStatusbar = new Statusbar();
	#appToolbar = new Toolbar();
	#appViewer = new Viewer();
	#htmlElement;
	constructor() {
		I18n.setOptions({ translations:[english] });
		I18n.start();
		this.#initListeners();
		this.#initHTML();
		this.#iniRepositories();
		this.#appViewer.initModel();
		Loadout.init();
	}

	#initListeners() {
		Controller.addEventListener('play', () => Graphics.speed = 1.0);
		Controller.addEventListener('pause', () => Graphics.speed = 0.0);
		Controller.addEventListener('showabout', () => showAboutLayer());
		Controller.addEventListener('showbug', () => showBugNotification());
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
