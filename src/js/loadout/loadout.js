import { customFetch } from 'harmony-3d';
import { CS2_REPOSITORY, ITEM_GAME_PATH } from '../constants';
import { Controller } from '../controller';

class LoadoutClass {
	#json;

	async init(lang = 'english') {
		const response = await customFetch(new URL(`${ITEM_GAME_PATH}items_${lang}.json`, CS2_REPOSITORY));

		if (!response || !response.ok) {
			return;
		}

		const json = await response.json();
		if (json) {
			this.#json = json;
			this.#loadItems();
			Controller.dispatchEvent(new CustomEvent('itemsloaded'));
		}
	}

	#loadItems() {

	}
};

export const Loadout = new LoadoutClass();
