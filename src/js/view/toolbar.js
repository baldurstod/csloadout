import { createElement, hide, show } from 'harmony-ui';
import { Controller } from '../controller';

import '../../css/toolbar.css';
import { manufacturingSVG, moreHorizSVG, pauseSVG, playSVG, settingsSVG } from 'harmony-svg';



function createButton(svg, eventName, i18n) {
	return createElement('div', {
		class: 'toolbar-button',
		'i18n-title': i18n,
		innerHTML: svg,
		events: {
			click: () => Controller.dispatchEvent(new CustomEvent(eventName)),
		},
	});
}

export class Toolbar {
	#htmlElement;
	#htmlPlay;
	#htmlPause;
	constructor() {
		this.#initListeners();
	}

	#initListeners() {
		Controller.addEventListener('play', () => {
			hide(this.#htmlPlay);
			show(this.#htmlPause);

		});
		Controller.addEventListener('pause', () => {
			show(this.#htmlPlay);
			hide(this.#htmlPause);
		});
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'toolbar',
			childs: [
				createElement('div', {
					class: 'toolbar-items',
					innerText: '<<<<<<<<<items>>>>>>>>',
				}),
				createElement('div', {
					class: 'toolbar-buttons',
					childs: [
						this.#htmlPlay = createButton(playSVG, 'play'),
						this.#htmlPause = createButton(pauseSVG, 'pause'),
						createButton(settingsSVG, 'toggleoptions'),
						createButton(manufacturingSVG, 'toggleadvancedoptions'),
						createButton(moreHorizSVG, 'showabout'),
					]
				}),
			],
		});

		hide(this.#htmlPause);
		return this.#htmlElement;
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
