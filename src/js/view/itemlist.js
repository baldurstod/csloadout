import { createElement, hide, show } from 'harmony-ui';

import '../../css/itemlist.css';
import { Controller } from '../controller';

export class ItemList {
	#htmlElement;
	#htmlCharacterList;
	#htmlWeaponList;

	#initHTML() {
		this.#htmlElement = createElement('div', {
			hidden: true,
			class: 'itemlist',
			innerText: 'this is the items',
			childs: [
				this.#htmlCharacterList = createElement('div', {
					hidden: true,
					class: 'characterlist',
					innerText: 'this is the characters',
				}),
				this.#htmlWeaponList = createElement('div', {
					hidden: true,
					class: 'weaponlist',
					innerText: 'this is the weapons',
				}),
			],
		});

		Controller.addEventListener('displaycharacters', () => this.#show(this.#htmlCharacterList));
		Controller.addEventListener('displayweapons', () => this.#show(this.#htmlWeaponList));
		//Controller.addEventListener('toggleoptions', () => toggle(this.#htmlElement));

		return this.#htmlElement;
	}

	#show(element) {
		hide(this.#htmlCharacterList);
		hide(this.#htmlWeaponList);
		show(this.#htmlElement);
		show(element);
	}

	hide() {
		hide(null);
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
