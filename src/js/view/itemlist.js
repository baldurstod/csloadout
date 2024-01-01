import { createElement, hide, show } from 'harmony-ui';

import '../../css/itemlist.css';
import { Controller } from '../controller';
import { Loadout } from '../loadout/loadout';
import { CS2_ECON_URL } from '../constants';

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

		Controller.addEventListener('displaycharacters', () => this.#showCharacterList());
		Controller.addEventListener('displayweapons', () => this.#show(this.#htmlWeaponList));
		//Controller.addEventListener('toggleoptions', () => toggle(this.#htmlElement));
		Controller.addEventListener('closeitemlist', () => this.#hide());


		return this.#htmlElement;
	}

	#show(element) {
		hide(this.#htmlCharacterList);
		hide(this.#htmlWeaponList);
		show(this.#htmlElement);
		show(element);
	}

	async #showCharacterList() {
		this.#show(this.#htmlCharacterList);
		const customPlayers = await Loadout.getCustomPlayers();
		console.log(customPlayers);

		for (const customPlayer of customPlayers) {
			console.log(customPlayer);
			createElement('img', {
				src: new URL(customPlayer.imageInventory + '.png', CS2_ECON_URL),
				//src: customPlayer.imageInventory,
				parent: this.#htmlCharacterList,
			})
		}

	}

	#hide() {
		hide(this.#htmlElement);
	}

	get htmlElement() {
		return this.#htmlElement ?? this.#initHTML();
	}
}
