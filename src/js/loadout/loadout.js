import { customFetch } from 'harmony-3d';
import { CS2_REPOSITORY, ITEM_GAME_PATH } from '../constants';
import { Controller } from '../controller';
import { Item } from './item';

class LoadoutClass {
	static #instance;
	#initItemsPromise;
	#initialized = false;
	#json;
	#characters = new Set();
	#lang = 'english';
	constructor() {
		if (LoadoutClass.#instance) {
			return LoadoutClass.#instance;
		}
		LoadoutClass.#instance = this;
	}

	setLang(lang) {
		this.#lang = lang;
	}

	#init() {
		if (!this.#initItemsPromise) {

			this.#initItemsPromise = new Promise(async (resolve, reject) => {
				const response = await customFetch(new URL(`${ITEM_GAME_PATH}items_${this.#lang}.json`, CS2_REPOSITORY));

				if (!response || !response.ok) {
					resolve(null);
					return;
				}

				const json = await response.json();
				if (json) {
					this.#json = json;
					this.#loadItems();
					Controller.dispatchEvent(new CustomEvent('itemsloaded'));
				}
				resolve(true);
			});
		}
		return this.#initItemsPromise;
	}

	#loadItems() {
		const items = this.#json?.items;
		if (!items) {
			return;
		}

		this.#characters.clear();

		for (const itemId in items) {
			const itemJson = items[itemId];
			const item = new Item(itemJson);
			if (item.isCustomPlayer()) {
				this.#characters.add(item);
			}
		}
	}

	async getCustomPlayers() {
		await this.#init();

		return this.#characters;
	}
};

export const Loadout = new LoadoutClass();
