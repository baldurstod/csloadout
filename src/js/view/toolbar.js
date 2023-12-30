import { createElement } from 'harmony-ui';
import { Controller } from '../controller';

import '../../css/toolbar.css';
import { settingsSVG } from 'harmony-svg';

export class Toolbar {
	#htmlElement;
	constructor() {
	}

	#initHTML() {
		this.#htmlElement = createElement('div', {
			class: 'toolbar',
			innerText: 'this is the toolbar',
			childs: [
				createElement('div', {
					class: 'button',
					innerText: 'new file',
					events: {
						click: () => Controller.dispatchEvent(new CustomEvent('createnewfile')),
					},
				}),
				createElement('div', {
					class: 'toolbar-buttons',
					childs: [
						createElement('div', {
							class: 'toolbar-button',
							innerHTML: settingsSVG,
							events: {
								click: () => Controller.dispatchEvent(new CustomEvent('toggleoptions')),
							},
						}),
					]
				}),

			],
		})
		return this.#htmlElement;

	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
