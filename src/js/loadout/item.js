export class Item {
	#name;
	#flexibleLoadoutSlot;
	#imageInventory;
	#modelPlayer;
	constructor(json) {
		this.fromJSON(json);
	}

	fromJSON(json) {
		if (!json) {
			return;
		}

		this.#name = json.name;
		this.#flexibleLoadoutSlot = json.flexible_loadout_slot;
		this.#imageInventory = json.image_inventory;
		this.#modelPlayer = json.model_player;
	}

	isCustomPlayer() {
		return this.#flexibleLoadoutSlot == 'customplayer';
	}

	get name() {
		return this.#name;
	}

	get imageInventory() {
		return this.#imageInventory;
	}
}
