import { customFetch } from 'harmony-3d';
import { CS2_REPOSITORY, ITEM_GAME_PATH } from '../constants';
import { Controller } from '../controller';
import { Item } from './item';

class LoadoutClass {
	#json;
	#customPlayers = new Set();

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
		const items = this.#json?.items;
		if (!items) {
			return;
		}

		this.#customPlayers.clear();

		for (const itemId in items) {
			const itemJson = items[itemId];
			const item = new Item(itemJson);
			if (item.isCustomPlayer()) {
				this.#customPlayers.add(item);
			}
		}

		console.log(this.#customPlayers);

	}
};

export const Loadout = new LoadoutClass();
