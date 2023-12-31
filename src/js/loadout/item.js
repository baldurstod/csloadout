export class Item {
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

		this.#flexibleLoadoutSlot = json.flexible_loadout_slot;
		this.#imageInventory = json.image_inventory;
		this.#modelPlayer = json.model_player;
	}

	isCustomPlayer() {
		return this.#flexibleLoadoutSlot == 'customplayer';
	}
}
